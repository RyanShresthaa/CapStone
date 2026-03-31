import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaSearch, FaStar, FaHeart, FaShare, FaMapMarkedAlt, FaUserTie, FaGlobe, FaSearchLocation, FaMountain, FaArrowRight, FaPlay, FaPause, FaChevronLeft, FaChevronRight, FaBookmark, FaEye, FaThermometerHalf, FaUserGraduate, FaShieldAlt, FaHandshake, FaRoute } from "react-icons/fa";
=======
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaSearch, FaStar, FaHeart, FaShare, FaCloudSun, FaHiking, FaCompass, FaGlobeAsia, FaMapMarkedAlt, FaUserTie, FaGlobe, FaSearchLocation, FaMountain, FaArrowRight, FaPlay, FaPause, FaChevronLeft, FaChevronRight, FaBookmark, FaEye, FaThermometerHalf, FaUserGraduate, FaShieldAlt, FaHandshake, FaRoute } from "react-icons/fa";
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
import { useAuth } from "./contexts/AuthContext";
import WeatherComponent from "./components/WeatherComponent";
import TestimonialsSection from "./components/TestimonialsSection";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
<<<<<<< HEAD
import { trekAPI } from "./services/api";
import { TREK_LOCATION_PHOTOS as P } from "./data/trekLocationPhotos";

const NEW_TAGLINE = "Trek Beyond Ordinary. Discover, Connect, and Explore Nepal's Wonders.";

function mapApiTrekToHome(t) {
  const priceStr = typeof t.price === "string" ? t.price : `$${t.price ?? 999}`;
  const tag = t.tags?.[0];
  const category =
    typeof tag === "string"
      ? tag.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "trek"
      : "trek";
  return {
    id: t.id,
    name: t.name,
    location: t.location || (t.region ? `${t.region}, Nepal` : "Nepal"),
    image: t.image || t.images?.[0],
    rating: t.rating ?? 4.5,
    reviews: Array.isArray(t.reviews) ? t.reviews.length + 12 : 20,
    price: priceStr,
    duration: t.duration || "—",
    difficulty: t.difficulty || "Moderate",
    elevation: t.altitude != null ? `${t.altitude}m` : "—",
    description: t.description || "",
    highlights: t.highlights || [],
    bestTime: t.bestSeason || "Spring/Autumn",
    temperature: "—",
    category,
    featured: !!t.featured,
    views: 400,
    bookings: 28,
  };
}

const HomePage = () => {
  const { user } = useAuth();
=======

const NEW_HERO_IMAGE = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80";
const NEW_TAGLINE = "Trek Beyond Ordinary. Discover, Connect, and Explore Nepal's Wonders.";

const HomePage = () => {
  const { user } = useAuth();
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2");
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [likedTreks, setLikedTreks] = useState(new Set());
  const [bookmarkedTreks, setBookmarkedTreks] = useState(new Set());
  const [hoveredTrek, setHoveredTrek] = useState(null);
  const [showTrekModal, setShowTrekModal] = useState(false);
  const [selectedTrek, setSelectedTrek] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Hero background images for slideshow
  const heroImages = [
<<<<<<< HEAD
    P.mountEverest,
    P.everestBaseCamp,
    P.thorongLa,
    P.langtangValley
  ];

  // Fallback catalog when API is offline; replaced by Mongo-backed treks when available
  const STATIC_TREKS_FALLBACK = [
=======
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1464013778555-8e723c2f01f8?auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1500&q=80"
  ];

  // Enhanced featured treks with more details
  const featuredTreks = [
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
    {
      id: 1,
      name: "Everest Base Camp",
      location: "Khumbu, Nepal",
<<<<<<< HEAD
      image: P.everestBaseCamp,
=======
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80",
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
      rating: 4.9,
      reviews: 156,
      price: "$1,850",
      duration: "14 days",
      difficulty: "Challenging",
      elevation: "5,364m",
      description: "Trek to the base of the world's highest peak, experiencing Sherpa culture and breathtaking Himalayan views.",
      highlights: ["Kala Patthar viewpoint", "Namche Bazaar", "Tengboche Monastery", "Khumbu Glacier"],
      bestTime: "March-May, September-November",
      temperature: "-15°C to 15°C",
      category: "high-altitude",
      featured: true,
      views: 1247,
      bookings: 89
    },
    {
      id: 2,
      name: "Annapurna Circuit",
      location: "Annapurna, Nepal",
<<<<<<< HEAD
      image: P.thorongLa,
=======
      image: "https://images.unsplash.com/photo-1464013778555-8e723c2f01f8?auto=format&fit=crop&w=600&q=80",
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
      rating: 4.8,
      reviews: 89,
      price: "$1,450",
      duration: "12 days",
      difficulty: "Moderate",
      elevation: "5,416m",
      description: "Circumnavigate the Annapurna massif through diverse landscapes from subtropical valleys to high alpine passes.",
      highlights: ["Thorong La Pass", "Manang Valley", "Muktinath Temple", "Jomsom"],
      bestTime: "March-May, September-November",
      temperature: "-10°C to 25°C",
      category: "circuit",
      featured: true,
      views: 892,
      bookings: 67
    },
    {
      id: 3,
      name: "Langtang Valley",
      location: "Langtang, Nepal",
<<<<<<< HEAD
      image: P.langtangValley,
=======
      image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
      rating: 4.7,
      reviews: 124,
      price: "$950",
      duration: "10 days",
      difficulty: "Easy",
      elevation: "4,984m",
      description: "Explore the beautiful Langtang Valley, known for its stunning glaciers and traditional Tamang villages.",
      highlights: ["Langtang Lirung", "Kyanjin Gompa", "Tamang Heritage", "Langtang Glacier"],
      bestTime: "March-May, September-November",
      temperature: "-5°C to 20°C",
      category: "valley",
      featured: false,
      views: 567,
      bookings: 34
    },
    {
      id: 4,
      name: "Manaslu Circuit",
      location: "Manaslu, Nepal",
<<<<<<< HEAD
      image: P.manasluFromTimang,
=======
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
      rating: 4.6,
      reviews: 67,
      price: "$1,650",
      duration: "16 days",
      difficulty: "Challenging",
      elevation: "5,106m",
      description: "Trek around the eighth highest peak in the world, experiencing remote villages and pristine landscapes.",
      highlights: ["Larkya La Pass", "Manaslu Base Camp", "Sama Gaon", "Buddhist Monasteries"],
      bestTime: "March-May, September-November",
      temperature: "-12°C to 18°C",
      category: "circuit",
      featured: false,
      views: 445,
      bookings: 23
<<<<<<< HEAD
    },
    {
      id: 5,
      name: "Poon Hill Trek",
      location: "Annapurna, Nepal",
      image: P.poonHill,
      rating: 4.5,
      reviews: 203,
      price: "$650",
      duration: "5 days",
      difficulty: "Easy",
      elevation: "3,210m",
      description: "Short trek with a classic sunrise view over the Annapurna range.",
      highlights: ["Poon Hill sunrise", "Ghorepani", "Ghandruk"],
      bestTime: "Year-round",
      temperature: "5°C to 20°C",
      category: "viewpoint",
      featured: false,
      views: 800,
      bookings: 120
    },
    {
      id: 6,
      name: "Upper Mustang",
      location: "Mustang, Nepal",
      image: P.loManthang,
      rating: 4.4,
      reviews: 67,
      price: "$2,200",
      duration: "12 days",
      difficulty: "Moderate",
      elevation: "3,810m",
      description: "The ancient kingdom of Lo with Tibetan culture and high-desert scenery.",
      highlights: ["Lo Manthang", "Monasteries", "Restricted area"],
      bestTime: "Spring/Autumn",
      temperature: "-5°C to 25°C",
      category: "cultural",
      featured: false,
      views: 334,
      bookings: 23
    },
    {
      id: 7,
      name: "Mardi Himal Trek",
      location: "Annapurna, Nepal",
      image: P.machhapuchhre,
      rating: 4.7,
      reviews: 98,
      price: "$750",
      duration: "7 days",
      difficulty: "Easy",
      elevation: "4,500m",
      description: "A quieter ridge trek with close views of Machhapuchhre and the Annapurnas.",
      highlights: ["Mardi Himal", "Forest Camp", "High Camp"],
      bestTime: "Spring/Autumn",
      temperature: "0°C to 20°C",
      category: "ridge",
      featured: false,
      views: 412,
      bookings: 56
    },
    {
      id: 8,
      name: "Kanchenjunga Base Camp Trek",
      location: "Kanchenjunga, Nepal",
      image: P.kangchenjunga,
      rating: 4.8,
      reviews: 45,
      price: "$2,800",
      duration: "20 days",
      difficulty: "Challenging",
      elevation: "5,143m",
      description: "Remote eastern Nepal trek toward the world's third-highest peak.",
      highlights: ["Pang Pema", "Ghunsa", "Conservation area"],
      bestTime: "Spring/Autumn",
      temperature: "-15°C to 15°C",
      category: "remote",
      featured: false,
      views: 280,
      bookings: 18
    }
  ];

  const [trekCatalog, setTrekCatalog] = useState(STATIC_TREKS_FALLBACK);
  useEffect(() => {
    let cancelled = false;
    trekAPI
      .getAllTreks()
      .then(({ data }) => {
        if (cancelled || !Array.isArray(data) || !data.length) return;
        setTrekCatalog(data.map(mapApiTrekToHome));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

=======
    }
  ];

>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
  const quickActions = [
    { 
      icon: FaMapMarkedAlt, 
      label: "Plan a Trek", 
      color: "#22c55e", 
      to: "/trip-planning",
      description: "Create your perfect trek itinerary",
      count: "2.5k+ plans"
    },
    { 
      icon: FaUserTie, 
      label: "Find Guides", 
      color: "#2563eb", 
      to: "/community",
      description: "Connect with expert local guides",
      count: "150+ guides"
    },
    { 
      icon: FaGlobe, 
      label: "Explore Regions", 
      color: "#f59e0b", 
      to: "/features",
      description: "Discover Nepal's trekking regions",
      count: "8 regions"
    },
    { 
      icon: FaSearchLocation, 
      label: "Search", 
      color: "#ef4444", 
      to: "/search",
      description: "Find your perfect trek",
      count: "50+ routes"
    }
  ];

  // Auto-play slideshow effect
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, heroImages.length]);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Geolocation effect
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        () => setUserLocation({ lat: 27.7172, lng: 85.3240 })
      );
    } else {
      setUserLocation({ lat: 27.7172, lng: 85.3240 });
    }
  }, []);

  // Interactive functions
  const handleTrekLike = (trekId) => {
    if (!user) {
      toast.error('Please log in to like treks');
      return;
    }
    
    setLikedTreks(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(trekId)) {
        newLiked.delete(trekId);
        toast.success('Trek unliked');
      } else {
        newLiked.add(trekId);
        toast.success('Trek liked!');
      }
      return newLiked;
    });
  };

  const handleTrekBookmark = (trekId) => {
    if (!user) {
      toast.error('Please log in to bookmark treks');
      return;
    }
    
    setBookmarkedTreks(prev => {
      const newBookmarked = new Set(prev);
      if (newBookmarked.has(trekId)) {
        newBookmarked.delete(trekId);
        toast.success('Trek removed from bookmarks');
      } else {
        newBookmarked.add(trekId);
        toast.success('Trek bookmarked!');
      }
      return newBookmarked;
    });
  };

  const handleTrekClick = (trek) => {
    setSelectedTrek(trek);
    setShowTrekModal(true);
  };

  const handleTrekShare = (trek) => {
    if (navigator.share) {
      navigator.share({
        title: trek.name,
        text: `Check out this amazing trek: ${trek.name} - ${trek.description}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${trek.name} - ${trek.description}\n\nView more at: ${window.location.href}`);
      toast.success('Trek link copied to clipboard!');
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsLoading(true);
      // Simulate search
      setTimeout(() => {
        setIsLoading(false);
        toast.success(`Searching for: ${searchQuery}`);
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      }, 1000);
    }
  };

  const handleQuickActionClick = (action) => {
    toast.success(`Navigating to ${action.label}...`);
    navigate(action.to);
  };

  const handleImageChange = (direction) => {
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    }
  };

  const handlePlayPause = () => {
    setIsAutoPlaying(!isAutoPlaying);
    toast.success(isAutoPlaying ? 'Slideshow paused' : 'Slideshow resumed');
  };

  const handleLearnMore = (feature) => {
    switch (feature) {
      case 'guides':
        toast.success('Navigating to guides section...');
        navigate('/community');
        break;
      case 'booking':
        toast.success('Navigating to booking information...');
        navigate('/trip-planning');
        break;
      case 'groups':
        toast.success('Navigating to group information...');
        navigate('/features');
        break;
      case 'experiences':
        toast.success('Navigating to authentic experiences...');
        navigate('/features');
        break;
      default:
        toast.success('Navigating to learn more...');
        navigate('/features');
    }
  };

<<<<<<< HEAD
  const filteredTreks = trekCatalog.filter((trek) => {
=======
  const filteredTreks = featuredTreks.filter(trek => {
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
    const matchesSearch = trek.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trek.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trek.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || trek.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedTreks = [...filteredTreks].sort((a, b) => {
    switch (sortBy) {
      case 'popular': return b.rating - a.rating;
      case 'price-low': return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
      case 'price-high': return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
      case 'duration': return parseInt(a.duration) - parseInt(b.duration);
      case 'views': return b.views - a.views;
      default: return b.rating - a.rating;
    }
  });

  return (
    <div className="homepage-container">
      {/* Hero Section - Interactive */}
      <section className={`hero-section ${isScrolled ? 'scrolled' : ''}`} id="hero">
        <div className="hero-background">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentImageIndex ? 'active' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
          <div className="hero-overlay"></div>
          
          {/* Slideshow Controls */}
          <div className="slideshow-controls">
            <button 
              className="control-btn prev-btn"
              onClick={() => handleImageChange('prev')}
              title="Previous image"
            >
              <FaChevronLeft />
            </button>
            <button 
              className="control-btn play-pause-btn"
              onClick={handlePlayPause}
              title={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isAutoPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button 
              className="control-btn next-btn"
              onClick={() => handleImageChange('next')}
              title="Next image"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="slide-indicators">
            {heroImages.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
                title={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-text-container">
            <h1 className="hero-title">
              {user ? `Welcome, ${user.firstName || user.name || 'Explorer'}!` : "NepGo: Trekking Redefined"}
            </h1>
            <p className="hero-subtitle">{NEW_TAGLINE}</p>
            
            {/* Interactive Search Bar */}
            <div className="hero-search">
              <div className="search-input-group">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search treks, destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button 
                  className="search-btn"
                  onClick={handleSearch}
                  disabled={isLoading}
                >
                  {isLoading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>

            <div className="hero-cta">
              <a href="#treks" className="cta-button primary">
                Start Exploring
                <FaArrowRight />
              </a>
              <button className="cta-button secondary" onClick={() => navigate('/trip-planning')}>
                Plan Your Trek
                <FaMapMarkedAlt />
              </button>
            </div>
          </div>
          
          {/* Weather Widget */}
          {userLocation && (
            <div className="weather-widget-container">
              <WeatherComponent city="Your Location" coordinates={userLocation} isCurrentLocation={true} compact={true} />
            </div>
          )}
        </div>
      </section>

      {/* Quick Actions Section - Interactive */}
      <section className="quick-actions-section">
        <div className="quick-actions-container">
          {quickActions.map((action, idx) => (
            <div
              key={idx}
              className="quick-action-card"
              onClick={() => handleQuickActionClick(action)}
            >
              <div className="quick-action-icon" style={{ backgroundColor: action.color }}>
                <action.icon />
              </div>
              <div className="quick-action-content">
                <h3 className="quick-action-label">{action.label}</h3>
                <p className="quick-action-description">{action.description}</p>
                <span className="quick-action-count">{action.count}</span>
              </div>
              <FaArrowRight className="action-arrow" />
            </div>
          ))}
        </div>
      </section>

      {/* Featured Treks Section - Interactive */}
      <section className="featured-treks-section" id="treks">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Featured Treks</h2>
            <p className="section-subtitle">Discover our most popular trekking destinations</p>
            
            {/* Interactive Filters */}
            <div className="trek-filters">
              <div className="filter-group">
                <input
                  type="text"
                  placeholder="Search treks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="filter-search"
                />
              </div>
              
              <div className="filter-group">
                <select 
                  value={filterCategory} 
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Categories</option>
                  <option value="high-altitude">High Altitude</option>
                  <option value="circuit">Circuit</option>
                  <option value="valley">Valley</option>
                </select>
              </div>
              
              <div className="filter-group">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="duration">Duration</option>
                  <option value="views">Most Viewed</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="treks-grid">
            {sortedTreks.map((trek) => (
              <div 
                key={trek.id} 
                className={`trek-card ${trek.featured ? 'featured' : ''} ${hoveredTrek === trek.id ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredTrek(trek.id)}
                onMouseLeave={() => setHoveredTrek(null)}
                onClick={() => handleTrekClick(trek)}
              >
                <div className="trek-image">
                  <img src={trek.image} alt={trek.name} />
                  <div className="trek-overlay">
                    <div className="trek-actions">
                      <button 
                        className={`action-btn like-btn ${likedTreks.has(trek.id) ? 'liked' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTrekLike(trek.id);
                        }}
                        title={likedTreks.has(trek.id) ? 'Unlike' : 'Like'}
                      >
                        <FaHeart />
                      </button>
                      <button 
                        className={`action-btn bookmark-btn ${bookmarkedTreks.has(trek.id) ? 'bookmarked' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTrekBookmark(trek.id);
                        }}
                        title={bookmarkedTreks.has(trek.id) ? 'Remove bookmark' : 'Bookmark'}
                      >
                        <FaBookmark />
                      </button>
                      <button 
                        className="action-btn share-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTrekShare(trek);
                        }}
                        title="Share"
                      >
                        <FaShare />
                      </button>
                    </div>
                    <button className="trek-book-btn">View Details</button>
                  </div>
                  
                  {trek.featured && <div className="featured-badge">⭐ Featured</div>}
                </div>
                
                <div className="trek-content">
                  <div className="trek-header">
                    <h3 className="trek-name">{trek.name}</h3>
                    <div className="trek-rating">
                      <FaStar className="star-icon" />
                      <span>{trek.rating}</span>
                      <span className="review-count">({trek.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="trek-location">
                    <FaMapMarkerAlt className="location-icon" />
                    <span>{trek.location}</span>
                  </div>
                  
                  <p className="trek-description">{trek.description}</p>
                  
                  <div className="trek-details">
                    <div className="trek-detail">
                      <FaCalendarAlt className="detail-icon" />
                      <span>{trek.duration}</span>
                    </div>
                    <div className="trek-detail">
                      <FaUsers className="detail-icon" />
                      <span>{trek.difficulty}</span>
                    </div>
                    <div className="trek-detail">
                      <FaMountain className="detail-icon" />
                      <span>{trek.elevation}</span>
                    </div>
                    <div className="trek-detail">
                      <FaThermometerHalf className="detail-icon" />
                      <span>{trek.temperature}</span>
                    </div>
                  </div>
                  
                  <div className="trek-stats">
                    <span className="stat">
                      <FaEye />
                      {trek.views}
                    </span>
                    <span className="stat">
                      <FaUsers />
                      {trek.bookings} booked
                    </span>
                  </div>
                  
                  <div className="trek-footer">
                    <div className="trek-price">
                      <span className="price-amount">{trek.price}</span>
                      <span className="price-label">per person</span>
                    </div>
                    <button className="trek-explore-btn">
                      Explore
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {sortedTreks.length === 0 && (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No treks found</h3>
              <p>Try adjusting your search terms or filters</p>
              <button 
                className="clear-filters-btn"
                onClick={() => {
                  setSearchQuery('');
                  setFilterCategory('all');
                  setSortBy('popular');
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

<<<<<<< HEAD
      <TestimonialsSection />
=======
      {/* Testimonials Section */}
      <section className="testimonials-section" id="testimonials">
        <TestimonialsSection />
      </section>
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb

      {/* Why NepGo Section - Interactive */}
      <section className="features-section" id="features">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Why Trek with NepGo?</h2>
            <p className="section-subtitle">Experience the difference with our premium trekking services</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-container">
                <FaUserGraduate className="feature-icon" />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Expert Local Guides</h3>
                <p className="feature-description">Certified, experienced guides with deep knowledge of local culture, terrain, and safety protocols for unforgettable journeys.</p>
                <button 
                  className="feature-learn-more"
                  onClick={() => handleLearnMore('guides')}
                >
                  <span>Learn More</span>
                  <FaArrowRight className="arrow-icon" />
                </button>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-container">
                <FaShieldAlt className="feature-icon" />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Flexible Booking</h3>
                <p className="feature-description">Easy booking system with flexible dates, transparent pricing, and hassle-free cancellation policies for your peace of mind.</p>
                <button 
                  className="feature-learn-more"
                  onClick={() => handleLearnMore('booking')}
                >
                  <span>Learn More</span>
                  <FaArrowRight className="arrow-icon" />
                </button>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-container">
                <FaHandshake className="feature-icon" />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Small Groups</h3>
                <p className="feature-description">Intimate group sizes ensuring personalized attention, better connections, and authentic cultural experiences.</p>
                <button 
                  className="feature-learn-more"
                  onClick={() => handleLearnMore('groups')}
                >
                  <span>Learn More</span>
                  <FaArrowRight className="arrow-icon" />
                </button>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-container">
                <FaRoute className="feature-icon" />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Authentic Experiences</h3>
                <p className="feature-description">Immerse yourself in local culture with off-the-beaten-path adventures and genuine community connections.</p>
                <button 
                  className="feature-learn-more"
                  onClick={() => handleLearnMore('experiences')}
                >
                  <span>Learn More</span>
                  <FaArrowRight className="arrow-icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trek Detail Modal */}
      {showTrekModal && selectedTrek && (
        <div className="trek-modal-overlay" onClick={() => setShowTrekModal(false)}>
          <div className="trek-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedTrek.name}</h2>
              <button className="close-btn" onClick={() => setShowTrekModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="modal-image">
                <img src={selectedTrek.image} alt={selectedTrek.name} />
              </div>
              <div className="modal-info">
                <div className="modal-stats">
                  <div className="stat">
                    <FaStar />
                    <span>{selectedTrek.rating} ({selectedTrek.reviews} reviews)</span>
                  </div>
                  <div className="stat">
                    <FaMapMarkerAlt />
                    <span>{selectedTrek.location}</span>
                  </div>
                  <div className="stat">
                    <FaMountain />
                    <span>{selectedTrek.elevation}</span>
                  </div>
                  <div className="stat">
                    <FaCalendarAlt />
                    <span>{selectedTrek.duration}</span>
                  </div>
                </div>
                <p className="modal-description">{selectedTrek.description}</p>
                <div className="modal-highlights">
                  <h4>Highlights</h4>
                  <ul>
                    {selectedTrek.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
                <div className="modal-actions">
                  <button className="book-now-btn">Book Now - {selectedTrek.price}</button>
                  <button 
                    className="learn-more-btn"
                    onClick={() => {
                      setShowTrekModal(false);
                      toast.success('Navigating to trek details...');
                      navigate(`/trek/${selectedTrek.id}`);
                    }}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
