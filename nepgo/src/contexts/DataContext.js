import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  // Mock data
  const [treks, setTreks] = useState([
    {
      id: 1,
      name: 'Everest Base Camp',
      location: 'Khumbu, Nepal',
      description: 'The classic trek to the foot of the world\'s highest mountain.',
      rating: 4.9,
      duration: '14 days',
      difficulty: 'Challenging',
      price: 1299,
      image: '/mountain.jpg'
    },
    {
      id: 2,
      name: 'Annapurna Circuit',
      location: 'Annapurna, Nepal',
      description: 'Circle the massive Annapurna massif and experience cultural diversity.',
      rating: 4.7,
      duration: '18 days',
      difficulty: 'Moderate',
      price: 999,
      image: '/background-mountains.jpg'
    },
    {
      id: 3,
      name: 'Langtang Valley',
      location: 'Langtang, Nepal',
      description: 'Stunning valleys and Tamang heritage just north of Kathmandu.',
      rating: 4.6,
      duration: '10 days',
      difficulty: 'Easy',
      price: 699,
      image: '/mountain.jpg'
    }
  ]);

  const [featuredTreks, setFeaturedTreks] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [userWishlist, setUserWishlist] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [forumPosts, setForumPosts] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  
  // Loading states
  const [loading, setLoading] = useState({
    treks: false,
    featured: false,
    recommendations: false,
    profile: false,
    wishlist: false,
    bookings: false,
    forum: false,
    weather: false
  });

  // Error states
  const [errors, setErrors] = useState({});

  // Load featured treks
  const loadFeaturedTreks = async () => {
    try {
      setLoading(prev => ({ ...prev, featured: true }));
      setFeaturedTreks(treks.slice(0, 3));
      setErrors(prev => ({ ...prev, featured: null }));
    } catch (error) {
      console.error('Error loading featured treks:', error);
      setErrors(prev => ({ ...prev, featured: 'Failed to load featured treks' }));
    } finally {
      setLoading(prev => ({ ...prev, featured: false }));
    }
  };

  // Load recommendations
  const loadRecommendations = async () => {
    try {
      setLoading(prev => ({ ...prev, recommendations: true }));
      setRecommendations(treks.slice(0, 2));
      setErrors(prev => ({ ...prev, recommendations: null }));
    } catch (error) {
      console.error('Error loading recommendations:', error);
      setErrors(prev => ({ ...prev, recommendations: 'Failed to load recommendations' }));
    } finally {
      setLoading(prev => ({ ...prev, recommendations: false }));
    }
  };

  // Load user profile
  const loadUserProfile = async () => {
    try {
      setLoading(prev => ({ ...prev, profile: true }));
      setUserProfile({
        firstName: 'Ryan',
        lastName: 'Shrestha',
        email: 'ryanshr02@gmail.com',
        experienceLevel: 'Moderate',
        completedTreks: 5
      });
      setErrors(prev => ({ ...prev, profile: null }));
    } catch (error) {
      console.error('Error loading user profile:', error);
      setErrors(prev => ({ ...prev, profile: 'Failed to load profile' }));
    } finally {
      setLoading(prev => ({ ...prev, profile: false }));
    }
  };

  // Load user wishlist
  const loadUserWishlist = async () => {
    try {
      setLoading(prev => ({ ...prev, wishlist: true }));
      setUserWishlist([]);
      setErrors(prev => ({ ...prev, wishlist: null }));
    } catch (error) {
      console.error('Error loading wishlist:', error);
      setErrors(prev => ({ ...prev, wishlist: 'Failed to load wishlist' }));
    } finally {
      setLoading(prev => ({ ...prev, wishlist: false }));
    }
  };

  // Load user bookings
  const loadUserBookings = async () => {
    try {
      setLoading(prev => ({ ...prev, bookings: true }));
      setUserBookings([]);
      setErrors(prev => ({ ...prev, bookings: null }));
    } catch (error) {
      console.error('Error loading bookings:', error);
      setErrors(prev => ({ ...prev, bookings: 'Failed to load bookings' }));
    } finally {
      setLoading(prev => ({ ...prev, bookings: false }));
    }
  };

  // Load forum posts
  const loadForumPosts = async () => {
    try {
      setLoading(prev => ({ ...prev, forum: true }));
      setForumPosts([]);
      setErrors(prev => ({ ...prev, forum: null }));
    } catch (error) {
      console.error('Error loading forum posts:', error);
      setErrors(prev => ({ ...prev, forum: 'Failed to load forum posts' }));
    } finally {
      setLoading(prev => ({ ...prev, forum: false }));
    }
  };

  // Get weather data
  const getWeatherData = async (location) => {
    try {
      setLoading(prev => ({ ...prev, weather: true }));
      setWeatherData(prev => ({ 
        ...prev, 
        [location]: {
          temperature: 15,
          condition: 'Sunny',
          humidity: 60
        }
      }));
      setErrors(prev => ({ ...prev, weather: null }));
    } catch (error) {
      console.error('Error loading weather:', error);
      setErrors(prev => ({ ...prev, weather: 'Failed to load weather data' }));
    } finally {
      setLoading(prev => ({ ...prev, weather: false }));
    }
  };

  // Search treks
  const searchTreks = async (searchParams) => {
    try {
      setLoading(prev => ({ ...prev, treks: true }));
      const { query } = searchParams;
      if (!query) {
        setTreks(treks);
      } else {
        const filtered = treks.filter(trek => 
          trek.name.toLowerCase().includes(query.toLowerCase()) ||
          trek.location.toLowerCase().includes(query.toLowerCase())
        );
        setTreks(filtered);
      }
      setErrors(prev => ({ ...prev, treks: null }));
    } catch (error) {
      console.error('Error searching treks:', error);
      setErrors(prev => ({ ...prev, treks: 'Failed to search treks' }));
      toast.error('Failed to search treks');
    } finally {
      setLoading(prev => ({ ...prev, treks: false }));
    }
  };

  // Add trek to wishlist
  const addToWishlist = async (trekId, plannedDate = null, notes = '') => {
    try {
      const trek = treks.find(t => t.id === trekId);
      if (trek) {
        setUserWishlist(prev => [...prev, { trekId, plannedDate, notes, trek }]);
        toast.success('Trek added to wishlist!');
        return { success: true };
      }
      return { success: false, error: 'Trek not found' };
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Failed to add to wishlist');
      return { success: false, error: error.message };
    }
  };

  // Remove trek from wishlist
  const removeFromWishlist = async (trekId) => {
    try {
      setUserWishlist(prev => prev.filter(item => item.trekId !== trekId));
      toast.success('Trek removed from wishlist');
      return { success: true };
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove from wishlist');
      return { success: false, error: error.message };
    }
  };

  // Create booking
  const createBooking = async (bookingData) => {
    try {
      const newBooking = { id: Date.now(), ...bookingData };
      setUserBookings(prev => [newBooking, ...prev]);
      toast.success('Booking created successfully!');
      return { success: true, booking: newBooking };
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Failed to create booking');
      return { success: false, error: error.message };
    }
  };

  // Cancel booking
  const cancelBooking = async (bookingId, cancellationReason) => {
    try {
      setUserBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'Cancelled', cancellationReason }
            : booking
        )
      );
      toast.success('Booking cancelled successfully');
      return { success: true };
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error('Failed to cancel booking');
      return { success: false, error: error.message };
    }
  };

  // Create forum post
  const createForumPost = async (title, content) => {
    try {
      const newPost = { 
        id: Date.now(), 
        title, 
        content, 
        author: 'Ryan Shrestha',
        createdAt: new Date().toISOString()
      };
      setForumPosts(prev => [newPost, ...prev]);
      toast.success('Post created successfully!');
      return { success: true, post: newPost };
    } catch (error) {
      console.error('Error creating forum post:', error);
      toast.error('Failed to create post');
      return { success: false, error: error.message };
    }
  };

  // Add comment to forum post
  const addComment = async (postId, content) => {
    try {
      setForumPosts(prev => 
        prev.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                comments: [...(post.comments || []), { 
                  id: Date.now(), 
                  content, 
                  author: 'Ryan Shrestha',
                  createdAt: new Date().toISOString()
                }]
              }
            : post
        )
      );
      toast.success('Comment added successfully!');
      return { success: true };
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
      return { success: false, error: error.message };
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      setUserProfile(prev => ({ ...prev, ...profileData }));
      toast.success('Profile updated successfully!');
      return { success: true };
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
      return { success: false, error: error.message };
    }
  };

  // Get trek by ID
  const getTrekById = async (id) => {
    try {
      const trek = treks.find(t => t.id === parseInt(id));
      if (trek) {
        return { success: true, trek };
      }
      return { success: false, error: 'Trek not found' };
    } catch (error) {
      console.error('Error getting trek:', error);
      return { success: false, error: error.message };
    }
  };

  // Refresh all data
  const refreshAllData = async () => {
    await Promise.all([
      loadFeaturedTreks(),
      loadRecommendations(),
      loadUserProfile(),
      loadUserWishlist(),
      loadUserBookings(),
      loadForumPosts()
    ]);
  };

  // Initialize data on mount
  useEffect(() => {
    loadFeaturedTreks();
    loadRecommendations();
    loadUserProfile();
    loadUserWishlist();
    loadUserBookings();
    loadForumPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    // Data
    treks,
    featuredTreks,
    recommendations,
    userProfile,
    userWishlist,
    userBookings,
    forumPosts,
    weatherData,
    
    // Loading states
    loading,
    
    // Error states
    errors,
    
    // Functions
    loadFeaturedTreks,
    loadRecommendations,
    loadUserProfile,
    loadUserWishlist,
    loadUserBookings,
    loadForumPosts,
    getWeatherData,
    searchTreks,
    addToWishlist,
    removeFromWishlist,
    createBooking,
    cancelBooking,
    createForumPost,
    addComment,
    updateProfile,
    getTrekById,
    refreshAllData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext; 