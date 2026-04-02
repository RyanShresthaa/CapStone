import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar, FaHeart, FaShare, FaBookmark, FaEye, FaArrowLeft, FaSearch } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { trekAPI } from '../services/api';
import { TREK_LOCATION_PHOTOS as P } from '../data/trekLocationPhotos';
import './SearchResults.css';

function mapSearchTrek(t) {
  const tag = t.tags?.[0];
  const category =
    typeof tag === 'string'
      ? tag.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'trek'
      : 'trek';
  const priceStr = typeof t.price === 'string' ? t.price : `$${t.price ?? 999}`;
  return {
    id: t.id,
    name: t.name,
    location: t.location || (t.region ? `${t.region}, Nepal` : 'Nepal'),
    image: t.image || t.images?.[0],
    rating: t.rating ?? 4.5,
    reviews: (t.reviews?.length || 0) + 40,
    price: priceStr,
    duration: t.duration || '—',
    difficulty: t.difficulty || 'Moderate',
    elevation: t.altitude != null ? `${t.altitude}m` : '—',
    description: t.description || '',
    category,
    views: 500,
    bookings: 40,
  };
}

const SEARCH_RESULTS_FALLBACK = [    {
      id: 1,
      name: "Everest Base Camp",
      location: "Khumbu, Nepal",
      image: P.everestBaseCamp,      rating: 4.9,
      reviews: 156,
      price: "$1,850",
      duration: "14 days",
      difficulty: "Challenging",
      elevation: "5,364m",
      description: "Trek to the base of the world's highest peak, experiencing Sherpa culture and breathtaking Himalayan views.",
      category: "high-altitude",
      views: 1247,
      bookings: 89
    },
    {
      id: 2,
      name: "Annapurna Circuit",
      location: "Annapurna, Nepal",
      image: P.thorongLa,      rating: 4.8,
      reviews: 89,
      price: "$1,450",
      duration: "12 days",
      difficulty: "Moderate",
      elevation: "5,416m",
      description: "Circumnavigate the Annapurna massif through diverse landscapes from subtropical valleys to high alpine passes.",
      category: "circuit",
      views: 892,
      bookings: 67
    },
    {
      id: 3,
      name: "Langtang Valley",
      location: "Langtang, Nepal",
      image: P.langtangValley,      rating: 4.7,
      reviews: 124,
      price: "$950",
      duration: "10 days",
      difficulty: "Easy",
      elevation: "4,984m",
      description: "Explore the beautiful Langtang Valley, known for its stunning glaciers and traditional Tamang villages.",
      category: "valley",
      views: 567,
      bookings: 45
    },
    {
      id: 4,
      name: "Manaslu Circuit",
      location: "Manaslu, Nepal",
      image: P.manasluFromTimang,      rating: 4.6,
      reviews: 78,
      price: "$1,650",
      duration: "16 days",
      difficulty: "Challenging",
      elevation: "5,106m",
      description: "Experience the remote Manaslu region with its pristine landscapes and authentic Nepali culture.",
      category: "circuit",
      views: 445,
      bookings: 34
    },
    {
      id: 5,
      name: "Poon Hill Trek",
      location: "Annapurna, Nepal",
      image: P.poonHill,      rating: 4.5,
      reviews: 203,
      price: "$650",
      duration: "5 days",
      difficulty: "Easy",
      elevation: "3,210m",
      description: "Short and sweet trek to Poon Hill offering spectacular sunrise views of the Annapurna range.",
      category: "viewpoint",
      views: 1234,
      bookings: 156
    },
    {
      id: 6,
      name: "Upper Mustang",
      location: "Mustang, Nepal",
      image: P.loManthang,      rating: 4.4,
      reviews: 67,
      price: "$2,200",
      duration: "18 days",
      difficulty: "Moderate",
      elevation: "4,200m",
      description: "Explore the ancient kingdom of Mustang, a hidden gem in the rain shadow of the Himalayas.",
      category: "cultural",
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
      description: "Ridge-line trek with dramatic views of Machhapuchhre and the Annapurna range.",
      category: "ridge",
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
      description: "Long, remote trek in eastern Nepal toward the third-highest mountain on Earth.",
      category: "remote",
      views: 280,
      bookings: 18
    }
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTreks, setFilteredTreks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [likedTreks, setLikedTreks] = useState(new Set());
  const [bookmarkedTreks, setBookmarkedTreks] = useState(new Set());

  const performSearch = useCallback(async (query) => {
    setIsLoading(true);
    const q = query.trim();
    try {
      const { data } = await trekAPI.searchTreks({ query: q || undefined });
      if (Array.isArray(data) && data.length) {
        setFilteredTreks(data.map(mapSearchTrek));
        setIsLoading(false);
        return;
      }
    } catch {
      /* use local fallback */
    }
    setTimeout(() => {
      if (!q) {
        setFilteredTreks(SEARCH_RESULTS_FALLBACK);
      } else {
        const results = SEARCH_RESULTS_FALLBACK.filter(
          (trek) =>
            trek.name.toLowerCase().includes(q.toLowerCase()) ||
            trek.location.toLowerCase().includes(q.toLowerCase()) ||
            trek.description.toLowerCase().includes(q.toLowerCase()) ||
            trek.category.toLowerCase().includes(q.toLowerCase())
        );
        setFilteredTreks(results);
      }
      setIsLoading(false);
    }, 400);
  }, []);
  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    performSearch(query);
  }, [searchParams, performSearch]);
  const handleTrekLike = (trekId) => {
    setLikedTreks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(trekId)) {
        newSet.delete(trekId);
        toast.success('Removed from favorites');
      } else {
        newSet.add(trekId);
        toast.success('Added to favorites');
      }
      return newSet;
    });
  };

  const handleTrekBookmark = (trekId) => {
    setBookmarkedTreks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(trekId)) {
        newSet.delete(trekId);
        toast.success('Removed from bookmarks');
      } else {
        newSet.add(trekId);
        toast.success('Added to bookmarks');
      }
      return newSet;
    });
  };

  const handleTrekShare = (trek) => {
    if (navigator.share) {
      navigator.share({
        title: trek.name,
        text: `Check out this amazing trek: ${trek.name} in ${trek.location}`,
        url: `${window.location.origin}/treks/${trek.id}`
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/treks/${trek.id}`);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleTrekClick = (trek) => {
    navigate(`/treks/${trek.id}`);
  };

  const getSortedTreks = () => {
    const filtered = filteredTreks.filter(trek => 
      filterCategory === 'all' || trek.category === filterCategory
    );

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'rating': return b.rating - a.rating;
        case 'price-low': return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
        case 'price-high': return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
        case 'duration': return parseInt(a.duration) - parseInt(b.duration);
        case 'popularity': return b.views - a.views;
        default: return 0; // relevance - keep original order
      }
    });
  };

  const sortedTreks = getSortedTreks();

  return (
    <div className="search-results-container">
      {/* Header */}
      <div className="search-header">
        <button className="back-btn" onClick={() => navigate('/home')}>
          <FaArrowLeft />
          Back to Home
        </button>
        <div className="search-info">
          <h1>Search Results</h1>
          <p>
            {searchQuery ? `Found ${sortedTreks.length} results for "${searchQuery}"` : `Showing all ${sortedTreks.length} treks`}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <div className="search-input-group">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search treks, destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && performSearch(e.target.value)}
          />
          <button 
            className="search-btn"
            onClick={() => performSearch(searchQuery)}
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="search-filters">
        <div className="filter-group">
          <label>Category:</label>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="high-altitude">High Altitude</option>
            <option value="circuit">Circuit</option>
            <option value="valley">Valley</option>
            <option value="viewpoint">Viewpoint</option>
            <option value="cultural">Cultural</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="relevance">Relevance</option>
            <option value="rating">Rating</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="duration">Duration</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="search-results">
        {isLoading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Searching for amazing treks...</p>
          </div>
        ) : sortedTreks.length === 0 ? (
          <div className="no-results">
            <FaSearch className="no-results-icon" />
            <h3>No treks found</h3>
            <p>Try adjusting your search terms or filters</p>
            <button onClick={() => setSearchQuery('')} className="clear-filters-btn">
              Show all treks
            </button>
          </div>
        ) : (
          <div className="treks-grid">
            {sortedTreks.map((trek) => (
              <div key={trek.id} className="trek-card" onClick={() => handleTrekClick(trek)}>
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
                        title="Like"
                      >
                        <FaHeart />
                      </button>
                      <button
                        className={`action-btn bookmark-btn ${bookmarkedTreks.has(trek.id) ? 'bookmarked' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTrekBookmark(trek.id);
                        }}
                        title="Bookmark"
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
                  </div>
                </div>
                <div className="trek-content">
                  <div className="trek-header">
                    <h3 className="trek-name">{trek.name}</h3>
                    <div className="trek-rating">
                      <FaStar className="star-icon" />
                      <span className="rating-value">{trek.rating}</span>
                      <span className="rating-count">({trek.reviews})</span>
                    </div>
                  </div>
                  <div className="trek-location">
                    <FaMapMarkerAlt className="location-icon" />
                    <span>{trek.location}</span>
                  </div>
                  <p className="trek-description">{trek.description}</p>
                  <div className="trek-details">
                    <div className="trek-detail">
                      <span className="detail-label">Duration:</span>
                      <span className="detail-value">{trek.duration}</span>
                    </div>
                    <div className="trek-detail">
                      <span className="detail-label">Difficulty:</span>
                      <span className={`detail-value difficulty ${trek.difficulty.toLowerCase()}`}>
                        {trek.difficulty}
                      </span>
                    </div>
                    <div className="trek-detail">
                      <span className="detail-label">Elevation:</span>
                      <span className="detail-value">{trek.elevation}</span>
                    </div>
                  </div>
                  <div className="trek-footer">
                    <div className="trek-price">
                      <span className="price-amount">{trek.price}</span>
                      <span className="price-per">per person</span>
                    </div>
                    <button className="explore-btn">
                      Explore Trek
                      <FaEye />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults; 