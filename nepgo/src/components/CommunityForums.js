import React, { useState, useEffect } from 'react';
import { FaComments, FaReply, FaThumbsUp, FaSearch, FaPlus, FaMapMarkerAlt, FaCalendarAlt, FaEye, FaTimes, FaFilter, FaSort, FaBookmark, FaShare, FaUser, FaStar, FaClock, FaUsers, FaChartLine } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { communityAPI } from '../services/api';
import './CommunityForums.css';

function mapApiPostToUi(p) {
  return {
    id: p.id,
    title: p.title,
    content: p.content,
    category: p.category || 'general-discussion',
    author: p.author,
    authorAvatar: p.authorAvatar || '👤',
    authorLevel: 'Member',
    date: p.date,
    replies: p.replies ?? (p.comments?.length || 0),
    likes: p.likes ?? 0,
    views: p.views ?? 0,
    tags: p.tags?.length ? p.tags : ['Community'],
    isPinned: false,
    isFeatured: false,
    isVerified: true,
    difficulty: 'Various',
    duration: '—',
    rating: 4.5,
  };
}

function commentsFromApi(postId, rawComments) {
  return (rawComments || []).map((c) => ({
    id: c.id,
    text: c.content,
    author: c.author,
    authorAvatar: '👤',
    date: c.createdAt ? new Date(c.createdAt).toISOString().slice(0, 10) : '',
  }));
}

const FALLBACK_FORUM_POSTS = [
  {
    id: 1,
    title: 'Everest Base Camp Trek - March 2025 Experience',
    content:
      'Just completed my EBC trek and wanted to share some insights about the March conditions. The weather was surprisingly stable with clear skies most days. The trail was busy but manageable. Key highlights: amazing views from Kala Patthar, great tea house at Gorak Shep, and the sense of achievement at base camp was indescribable. Would highly recommend going in March!',
    author: 'MountainExplorer',
    authorAvatar: '🧗‍♂️',
    authorLevel: 'Expert',
    category: 'trip-reports',
    date: '2025-01-08',
    replies: 12,
    likes: 24,
    views: 156,
    tags: ['EBC', 'March', 'Weather', 'Experience'],
    isPinned: false,
    isFeatured: false,
    isVerified: true,
    difficulty: 'Challenging',
    duration: '14 days',
    rating: 4.8,
  },
  {
    id: 2,
    title: 'Best Sleeping Bag for High Altitude Trekking?',
    content:
      "Looking for recommendations for a sleeping bag that can handle -20°C temperatures. I'm planning a winter trek to Annapurna Base Camp and need something reliable. Budget is around $300-500. Currently considering the North Face Inferno and Mountain Hardwear Phantom. Any experiences with these or other recommendations?",
    author: 'GearSeeker',
    authorAvatar: '🎒',
    authorLevel: 'Intermediate',
    category: 'gear-advice',
    date: '2025-01-07',
    replies: 8,
    likes: 15,
    views: 89,
    tags: ['Gear', 'Sleeping Bag', 'Cold Weather', 'ABC'],
    isPinned: false,
    isFeatured: false,
    isVerified: false,
    difficulty: 'Moderate',
    duration: '7 days',
    rating: 4.2,
  },
  {
    id: 3,
    title: 'Annapurna Circuit Route Changes 2025',
    content:
      "Has anyone noticed the recent changes to the Annapurna Circuit route? Some sections seem to have been rerouted due to road construction. I'm planning to do the circuit in April and want to make sure I have the most up-to-date information. Any recent trekkers who can share their experience?",
    author: 'RouteGuru',
    authorAvatar: '🗺️',
    authorLevel: 'Expert',
    category: 'route-planning',
    date: '2025-01-06',
    replies: 18,
    likes: 32,
    views: 234,
    tags: ['Annapurna', 'Route Changes', 'Planning', 'April'],
    isPinned: false,
    isFeatured: false,
    isVerified: true,
    difficulty: 'Challenging',
    duration: '21 days',
    rating: 4.6,
  },
  {
    id: 4,
    title: 'Weather Forecast Accuracy in the Himalayas',
    content:
      "How reliable are weather forecasts for high-altitude trekking? I've been checking multiple apps and they all show different predictions for the same dates. Share your experiences with weather forecasting tools and any tips for planning around weather conditions.",
    author: 'WeatherWatcher',
    authorAvatar: '🌤️',
    authorLevel: 'Advanced',
    category: 'weather-conditions',
    date: '2025-01-05',
    replies: 6,
    likes: 18,
    views: 123,
    tags: ['Weather', 'Forecast', 'Planning', 'Himalayas'],
    isPinned: false,
    isFeatured: false,
    isVerified: false,
    difficulty: 'Easy',
    duration: '5 days',
    rating: 4.0,
  },
  {
    id: 5,
    title: 'First Time Trekking in Nepal - Tips Welcome!',
    content:
      "Planning my first trek to Nepal next month. I'm a complete beginner and would love any advice on preparation, what to pack, and what to expect. I'm thinking of starting with a shorter trek like Poon Hill to get acclimated. Any recommendations for first-timers?",
    author: 'NewTrekker',
    authorAvatar: '🥾',
    authorLevel: 'Beginner',
    category: 'general-discussion',
    date: '2025-01-04',
    replies: 25,
    likes: 41,
    views: 298,
    tags: ['Beginner', 'First Time', 'Advice', 'Poon Hill'],
    isPinned: false,
    isFeatured: false,
    isVerified: false,
    difficulty: 'Easy',
    duration: '4 days',
    rating: 4.5,
  },
];

const CommunityForums = () => {
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('general-discussion');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());
  const [commentForms, setCommentForms] = useState(new Set());
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);

  const categories = [
    { id: 'all', name: 'All Topics', icon: FaComments, color: '#0ea5e9', count: 0 },
    { id: 'trip-reports', name: 'Trip Reports', icon: FaMapMarkerAlt, color: '#10b981', count: 156 },
    { id: 'gear-advice', name: 'Gear & Equipment', icon: FaSearch, color: '#f59e0b', count: 89 },
    { id: 'route-planning', name: 'Route Planning', icon: FaMapMarkerAlt, color: '#8b5cf6', count: 234 },
    { id: 'weather-conditions', name: 'Weather & Conditions', icon: FaCalendarAlt, color: '#06b6d4', count: 123 },
    { id: 'general-discussion', name: 'General Discussion', icon: FaComments, color: '#ec4899', count: 298 }
  ];

  useEffect(() => {
    let cancelled = false;
    communityAPI
      .getPosts()
      .then(({ data }) => {
        if (cancelled || !Array.isArray(data)) return;
        if (data.length) {
          const mapped = data.map(mapApiPostToUi);
          setPosts(mapped);
          const nextComments = {};
          data.forEach((p) => {
            nextComments[p.id] = commentsFromApi(p.id, p.comments);
          });
          setComments(nextComments);
        } else {
          setPosts(FALLBACK_FORUM_POSTS);
        }
      })
      .catch(() => {
        if (!cancelled) setPosts(FALLBACK_FORUM_POSTS);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredAndSortedPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.date) - new Date(a.date);
        case 'popular':
          return (b.likes + b.replies) - (a.likes + a.replies);
        case 'views':
          return b.views - a.views;
        case 'replies':
          return b.replies - a.replies;
        case 'rating':
          return b.rating - a.rating;
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

  const handleNewPost = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to create a post');
      return;
    }

    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const { data } = await communityAPI.createPost(
        newPostTitle.trim(),
        newPostContent.trim(),
        newPostCategory
      );
      const ui = mapApiPostToUi(data);
      setPosts((prev) => [ui, ...prev]);
      setComments((prev) => ({ ...prev, [ui.id]: [] }));
      setNewPostTitle('');
      setNewPostContent('');
      setNewPostCategory('general-discussion');
      setShowNewPostForm(false);
      toast.success('Post created successfully!');
    } catch {
      toast.error('Could not create post. Is the server running?');
    }
  };

  const handleLike = async (postId) => {
    if (!isAuthenticated) {
      toast.error('Please log in to like posts');
      return;
    }

    try {
      const { data } = await communityAPI.likePost(postId);
      const ui = mapApiPostToUi(data);
      setPosts((prev) => prev.map((p) => (String(p.id) === String(postId) ? ui : p)));
      setLikedPosts((prev) => {
        const next = new Set(prev);
        next.add(postId);
        return next;
      });
      toast.success('Post liked!');
    } catch {
      toast.error('Could not like post');
    }
  };

  const handleBookmark = (postId) => {
    if (!isAuthenticated) {
      toast.error('Please log in to bookmark posts');
      return;
    }

    setBookmarkedPosts(prev => {
      const newBookmarkedPosts = new Set(prev);
      if (newBookmarkedPosts.has(postId)) {
        newBookmarkedPosts.delete(postId);
        toast.success('Post removed from bookmarks');
      } else {
        newBookmarkedPosts.add(postId);
        toast.success('Post bookmarked!');
      }
      return newBookmarkedPosts;
    });
  };

  const handleComment = (postId) => {
    if (!isAuthenticated) {
      toast.error('Please log in to comment');
      return;
    }

    setCommentForms(prev => {
      const newCommentForms = new Set(prev);
      if (newCommentForms.has(postId)) {
        newCommentForms.delete(postId);
      } else {
        newCommentForms.add(postId);
      }
      return newCommentForms;
    });
  };

  const handleSubmitComment = async (postId) => {
    const commentText = newComments[postId]?.trim();
    if (!commentText) return;
    if (!isAuthenticated) {
      toast.error('Please log in to comment');
      return;
    }

    try {
      const { data } = await communityAPI.addComment(postId, commentText);
      const ui = mapApiPostToUi(data);
      setPosts((prev) => prev.map((p) => (String(p.id) === String(postId) ? ui : p)));
      setComments((prev) => ({
        ...prev,
        [postId]: commentsFromApi(postId, data.comments),
      }));
      setNewComments((prev) => ({ ...prev, [postId]: '' }));
      setCommentForms((prev) => {
        const next = new Set(prev);
        next.delete(postId);
        return next;
      });
      toast.success('Comment added successfully!');
    } catch {
      toast.error('Could not add comment');
    }
  };

  const handleCommentInputChange = (postId, value) => {
    setNewComments(prev => ({
      ...prev,
      [postId]: value
    }));
  };

  const handleShare = (post) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content.substring(0, 100) + '...',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${post.title}\n\n${post.content.substring(0, 100)}...\n\nRead more at: ${window.location.href}`);
      toast.success('Post link copied to clipboard!');
    }
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowPostModal(true);
  };

  const getPostLikes = (post) => post.likes ?? 0;

  const getPostComments = (post) => {
    const baseReplies = post.replies;
    const additionalComments = comments[post.id]?.length || 0;
    return baseReplies + additionalComments;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getAuthorLevelColor = (level) => {
    switch (level) {
      case 'Expert': return '#10b981';
      case 'Advanced': return '#0ea5e9';
      case 'Intermediate': return '#f59e0b';
      case 'Beginner': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  return (
    <div className="community-forums-container">
      {/* Header Section */}
      <div className="forums-header">
        <div className="header-content">
          <div className="header-text">
            <h1>
              <FaComments className="header-icon" />
              Community Forums
            </h1>
            <p>Connect with fellow trekkers, share experiences, and get expert advice from the NepGo community</p>
            {!isAuthenticated && (
              <div className="auth-notice">
                <FaUser />
                <span>Log in to participate in discussions and create posts</span>
              </div>
            )}
          </div>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-number">1,247</span>
              <span className="stat-label">Members</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5,892</span>
              <span className="stat-label">Posts</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">23,456</span>
              <span className="stat-label">Replies</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">156</span>
              <span className="stat-label">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="forums-controls">
        <div className="controls-main">
          <div className="search-section">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search posts, topics, or tags..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              className="new-post-btn"
              onClick={() => {
                if (!isAuthenticated) {
                  toast.error('Please log in to create a post');
                  return;
                }
                setShowNewPostForm(!showNewPostForm);
              }}
            >
              <FaPlus />
              New Post
            </button>
          </div>
          
          <div className="controls-secondary">
            <button 
              className="filter-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter />
              Filters
            </button>
            <div className="sort-dropdown">
              <FaSort />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="views">Most Viewed</option>
                <option value="replies">Most Replies</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="categories">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-btn${selectedCategory === category.id ? ' active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                '--category-color': category.color
              }}
            >
              <category.icon />
              {category.name}
              {category.count > 0 && (
                <span className="category-count">{category.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="filters-panel">
            <div className="filter-group">
              <label>Time Period</label>
              <select>
                <option>All Time</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 3 Months</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Difficulty Level</label>
              <select>
                <option>All Levels</option>
                <option>Easy</option>
                <option>Moderate</option>
                <option>Challenging</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Post Type</label>
              <div className="checkbox-group">
                <label><input type="checkbox" defaultChecked /> Trip Reports</label>
                <label><input type="checkbox" defaultChecked /> Questions</label>
                <label><input type="checkbox" defaultChecked /> Discussions</label>
                <label><input type="checkbox" defaultChecked /> Gear Reviews</label>
              </div>
            </div>
            <div className="filter-group">
              <label>Sort By</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="views">Most Viewed</option>
                <option value="replies">Most Replies</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* New Post Form */}
      {showNewPostForm && (
        <div className="new-post-form">
          <div className="form-header">
            <h3>Create New Post</h3>
            <button 
              className="close-btn"
              onClick={() => setShowNewPostForm(false)}
            >
              <FaTimes />
            </button>
          </div>
          <div className="form-content">
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                placeholder="What's your post about?"
                value={newPostTitle}
                onChange={e => setNewPostTitle(e.target.value)}
                maxLength={100}
              />
              <span className="char-count">{newPostTitle.length}/100</span>
            </div>
            <div className="form-group">
              <label>Category *</label>
              <select 
                value={newPostCategory} 
                onChange={e => setNewPostCategory(e.target.value)}
              >
                {categories.filter(cat => cat.id !== 'all').map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Content *</label>
              <textarea
                placeholder="Share your thoughts, questions, or experiences..."
                value={newPostContent}
                onChange={e => setNewPostContent(e.target.value)}
                rows="6"
                maxLength={2000}
              />
              <span className="char-count">{newPostContent.length}/2000</span>
            </div>
            <div className="form-actions">
              <button className="post-btn" onClick={handleNewPost}>
                <FaPlus />
                Create Post
              </button>
              <button className="cancel-btn" onClick={() => setShowNewPostForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="forums-content">
        <div className="posts-list">
          {filteredAndSortedPosts.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No posts found</h3>
              <p>Try adjusting your search terms or filters</p>
              {searchTerm && (
                <button 
                  className="clear-search-btn"
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            filteredAndSortedPosts.map((post, idx) => (
              <div key={post.id} className={`post-card${post.isPinned ? ' pinned' : ''}${post.isFeatured ? ' featured' : ''}`}>
                <div className="badge-container">
                  {post.isPinned && <div className="pin-badge">📌 Pinned</div>}
                  {post.isFeatured && <div className="featured-badge">⭐ Featured</div>}
                  {post.isVerified && <div className="verified-badge">✓ Verified</div>}
                </div>
                
                <div className="post-header">
                  <div className="post-author">
                    <div className="author-avatar">{post.authorAvatar}</div>
                    <div className="author-info">
                      <div className="author-name-row">
                        <span className="author-name">{post.author}</span>
                        <span 
                          className="author-level"
                          style={{ color: getAuthorLevelColor(post.authorLevel) }}
                        >
                          {post.authorLevel}
                        </span>
                      </div>
                      <span className="post-date">{formatDate(post.date)}</span>
                    </div>
                  </div>
                  <div className="post-category">
                    <span 
                      className="category-badge"
                      style={{ 
                        background: categories.find(c => c.id === post.category)?.color + '20',
                        color: categories.find(c => c.id === post.category)?.color,
                        border: `1px solid ${categories.find(c => c.id === post.category)?.color}40`
                      }}
                    >
                      {categories.find(c => c.id === post.category)?.name}
                    </span>
                  </div>
                </div>

                <div className="post-content" onClick={() => handlePostClick(post)}>
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-excerpt">{post.content}</p>
                  <div className="post-tags">
                    {post.tags.map((tag, i) => (
                      <span className="tag" key={i}>#{tag}</span>
                    ))}
                  </div>
                  <div className="post-meta">
                    <span className="meta-item">
                      <FaClock />
                      {post.duration}
                    </span>
                    <span className="meta-item">
                      <FaChartLine />
                      {post.difficulty}
                    </span>
                    <span className="meta-item">
                      <FaStar />
                      {post.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="post-footer">
                  <div className="post-stats">
                    <span className="stat">
                      <FaEye />
                      {post.views}
                    </span>
                    <span className="stat">
                      <FaThumbsUp />
                      {getPostLikes(post)}
                    </span>
                    <span className="stat">
                      <FaReply />
                      {getPostComments(post)}
                    </span>
                  </div>
                  
                  <div className="post-actions">
                    <button 
                      className={`action-btn like-btn${likedPosts.has(post.id) ? ' liked' : ''}`} 
                      onClick={() => handleLike(post.id)}
                      title={likedPosts.has(post.id) ? 'Unlike' : 'Like'}
                    >
                      <FaThumbsUp />
                      Like
                    </button>
                    <button 
                      className="action-btn reply-btn" 
                      onClick={() => handleComment(post.id)}
                      title="Reply"
                    >
                      <FaReply />
                      Reply
                    </button>
                    <button 
                      className={`action-btn bookmark-btn${bookmarkedPosts.has(post.id) ? ' bookmarked' : ''}`}
                      onClick={() => handleBookmark(post.id)}
                      title={bookmarkedPosts.has(post.id) ? 'Remove from bookmarks' : 'Add to bookmarks'}
                    >
                      <FaBookmark />
                      Save
                    </button>
                    <button 
                      className="action-btn share-btn"
                      onClick={() => handleShare(post)}
                      title="Share"
                    >
                      <FaShare />
                      Share
                    </button>
                  </div>
                </div>

                {/* Comments Section */}
                {(comments[post.id]?.length > 0 || commentForms.has(post.id)) && (
                  <div className="comments-section">
                    <h4>Comments ({getPostComments(post)})</h4>
                    {comments[post.id]?.map((comment) => (
                      <div key={comment.id} className="comment-item">
                        <div className="comment-header">
                          <div className="comment-author">
                            <div className="author-avatar small">{comment.authorAvatar}</div>
                            <span className="comment-author-name">{comment.author}</span>
                            <span className="comment-date">{formatDate(comment.date)}</span>
                          </div>
                        </div>
                        <div className="comment-text">{comment.text}</div>
                      </div>
                    ))}
                    
                    {commentForms.has(post.id) && (
                      <div className="comment-form">
                        <textarea
                          placeholder="Write your comment..."
                          value={newComments[post.id] || ''}
                          onChange={(e) => handleCommentInputChange(post.id, e.target.value)}
                          rows="3"
                          maxLength={500}
                        />
                        <div className="comment-form-actions">
                          <span className="char-count">
                            {(newComments[post.id]?.length || 0)}/500
                          </span>
                          <div className="comment-buttons">
                            <button 
                              className="submit-comment-btn"
                              onClick={() => handleSubmitComment(post.id)}
                            >
                              Comment
                            </button>
                            <button 
                              className="cancel-comment-btn"
                              onClick={() => handleComment(post.id)}
                            >
                              <FaTimes />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Sidebar */}
        <div className="forums-sidebar">
          <div className="sidebar-card">
            <h3>Quick Stats</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">1,247</span>
                <span className="stat-label">Members</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5,892</span>
                <span className="stat-label">Posts</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">23,456</span>
                <span className="stat-label">Replies</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">156</span>
                <span className="stat-label">Online</span>
              </div>
            </div>
          </div>

          <div className="sidebar-card">
            <h3>Popular Topics</h3>
            <div className="popular-topics">
              <div className="topic-item">
                <span className="topic-name">Everest Base Camp</span>
                <span className="topic-count">342 posts</span>
              </div>
              <div className="topic-item">
                <span className="topic-name">Annapurna Circuit</span>
                <span className="topic-count">289 posts</span>
              </div>
              <div className="topic-item">
                <span className="topic-name">Gear & Equipment</span>
                <span className="topic-count">156 posts</span>
              </div>
              <div className="topic-item">
                <span className="topic-name">Weather Conditions</span>
                <span className="topic-count">98 posts</span>
              </div>
              <div className="topic-item">
                <span className="topic-name">First Time Trekkers</span>
                <span className="topic-count">87 posts</span>
              </div>
            </div>
          </div>

          <div className="sidebar-card">
            <h3>Recent Activity</h3>
            <div className="recent-activity">
              <div className="activity-item">
                <div className="activity-avatar">🧗‍♂️</div>
                <div className="activity-content">
                  <span className="activity-user">MountainExplorer</span>
                  <span className="activity-action">posted in Trip Reports</span>
                </div>
                <span className="activity-time">2h ago</span>
              </div>
              <div className="activity-item">
                <div className="activity-avatar">🎒</div>
                <div className="activity-content">
                  <span className="activity-user">GearSeeker</span>
                  <span className="activity-action">asked about sleeping bags</span>
                </div>
                <span className="activity-time">4h ago</span>
              </div>
              <div className="activity-item">
                <div className="activity-avatar">🗺️</div>
                <div className="activity-content">
                  <span className="activity-user">RouteGuru</span>
                  <span className="activity-action">shared route updates</span>
                </div>
                <span className="activity-time">6h ago</span>
              </div>
            </div>
          </div>

          {!isAuthenticated && (
            <div className="sidebar-card auth-card">
              <h3>Join the Community</h3>
              <p>Connect with fellow trekkers and share your experiences</p>
              <button className="join-btn">
                <FaUsers />
                Sign Up Now
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Modal */}
      {showPostModal && selectedPost && (
        <div className="post-modal-overlay" onClick={() => setShowPostModal(false)}>
          <div className="post-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedPost.title}</h2>
              <button className="close-btn" onClick={() => setShowPostModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-content">
              <div className="modal-author">
                <div className="author-avatar">{selectedPost.authorAvatar}</div>
                <div className="author-info">
                  <span className="author-name">{selectedPost.author}</span>
                  <span className="author-level">{selectedPost.authorLevel}</span>
                </div>
              </div>
              <div className="modal-post-content">
                {selectedPost.content}
              </div>
              <div className="modal-meta">
                <span>Posted {formatDate(selectedPost.date)}</span>
                <span>{selectedPost.views} views</span>
                <span>{getPostLikes(selectedPost)} likes</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityForums;
