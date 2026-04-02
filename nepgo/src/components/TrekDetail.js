import React, { useState, useEffect } from 'react';import { useParams, useLocation, useNavigate } from 'react-router-dom';
import MapComponent from './MapComponent';
import WeatherComponent from './WeatherComponent';
import { FaMapMarkerAlt, FaStar, FaRegCalendarAlt, FaHiking, FaRegListAlt, FaRegCheckCircle, FaChevronLeft, FaChevronRight, FaArrowLeft, FaHeart } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { trekAPI } from '../services/api';
import { TREK_LOCATION_PHOTOS as P } from '../data/trekLocationPhotos';

function normalizeApiTrek(data) {
  if (!data) return null;
  return {
    id: data.id,
    name: data.name,
    location: data.location || (data.region ? `${data.region}, Nepal` : 'Nepal'),
    description: data.description,
    rating: data.rating ?? 4.5,
    images: data.images?.length ? data.images : data.image ? [data.image] : [],
    region: data.region,
    map: data.map || { lat: 27.9881, lng: 86.925 },
    weatherLocation: data.weatherLocation || data.name,
    highlights: data.highlights || [],
    itinerary: data.itinerary || [],
    reviews: (data.reviews || []).map((r) => ({
      name: r.name,
      rating: r.rating ?? 5,
      text: r.text || '',
    })),
    accommodation: data.accommodation || [],
  };
}    description: 'The classic trek to the foot of the world’s highest mountain. Experience Sherpa culture, stunning Himalayan views, and the thrill of reaching Everest Base Camp.',
    rating: 4.9,
    region: 'everest',
    map: { lat: 27.9881, lng: 86.9250 },
    weatherLocation: 'Everest Base Camp',
    highlights: [
      'Reach the base of Mount Everest',
      'Panoramic Himalayan views',
      'Sherpa culture & monasteries',
      'Sagarmatha National Park'
    ],
    itinerary: [
      "Day 1: Kathmandu (1,400m) - Arrival & Preparation\n   • Arrive in Kathmandu, hotel check-in\n   • Trek briefing and gear check\n   • Overnight: Kathmandu hotel",
      "Day 2: Kathmandu → Lukla (2,860m) → Phakding (2,610m)\n   • Early morning flight to Lukla (30 min)\n   • Trek to Phakding (3-4 hours)\n   • Overnight: Phakding tea house",
      "Day 3: Phakding → Namche Bazaar (3,440m)\n   • Cross suspension bridges over Dudh Koshi\n   • Steep climb to Namche (6-7 hours)\n   • Overnight: Namche Bazaar tea house",
      "Day 4: Namche Bazaar - Acclimatization Day\n   • Optional hike to Everest View Hotel\n   • Visit Sherpa Museum and local market\n   • Overnight: Namche Bazaar tea house",
      "Day 5: Namche → Tengboche (3,860m)\n   • Trek through rhododendron forests\n   • Visit Tengboche Monastery (5-6 hours)\n   • Overnight: Tengboche tea house",
      "Day 6: Tengboche → Dingboche (4,410m)\n   • Cross Imja Khola bridge\n   • Ascend to Dingboche (5-6 hours)\n   • Overnight: Dingboche tea house",
      "Day 7: Dingboche - Acclimatization Day\n   • Optional hike to Nangkartshang Peak\n   • Rest and acclimatization\n   • Overnight: Dingboche tea house",
      "Day 8: Dingboche → Lobuche (4,940m)\n   • Trek through Khumbu Glacier moraine\n   • Pass memorial chortens (5-6 hours)\n   • Overnight: Lobuche tea house",
      "Day 9: Lobuche → Gorak Shep (5,170m) → EBC (5,364m)\n   • Trek to Gorak Shep (3 hours)\n   • Afternoon visit to Everest Base Camp\n   • Overnight: Gorak Shep tea house",
      "Day 10: Gorak Shep → Kala Patthar (5,545m) → Pheriche (4,280m)\n   • Early morning climb to Kala Patthar\n   • Panoramic views of Everest\n   • Descend to Pheriche (7-8 hours)\n   • Overnight: Pheriche tea house",
      "Day 11: Pheriche → Namche Bazaar (3,440m)\n   • Descend through Tengboche\n   • Return to Namche (6-7 hours)\n   • Overnight: Namche Bazaar tea house",
      "Day 12: Namche → Phakding (2,610m)\n   • Descend to Phakding (4-5 hours)\n   • Overnight: Phakding tea house",
      "Day 13: Phakding → Lukla (2,860m)\n   • Final day of trekking (3-4 hours)\n   • Celebrate completion\n   • Overnight: Lukla tea house",
      "Day 14: Lukla → Kathmandu\n   • Morning flight to Kathmandu\n   • Transfer to hotel, rest day\n   • Overnight: Kathmandu hotel"
    ],
    reviews: [
      { name: 'Sarah Johnson', rating: 5, text: 'Absolutely life-changing! The views of Everest were breathtaking. Our guide was incredibly knowledgeable about the local culture.' },
      { name: 'Michael Chen', rating: 4, text: 'Challenging but rewarding. The altitude was tough but the Sherpa hospitality made it all worthwhile.' },
      { name: 'Emma Rodriguez', rating: 5, text: 'Perfect organization, stunning scenery, and unforgettable memories. Highly recommend!' }
    ],
    accommodation: [
      { type: "Tea Houses", description: "Basic but comfortable lodges with shared rooms", price: "$15-25/night" },
      { type: "Luxury Lodges", description: "Premium accommodation with private rooms and hot showers", price: "$80-150/night" }
    ]
  },
  {
    id: 2,
    name: 'Annapurna Circuit Trek',
    location: 'Annapurna, Nepal',
    images: [P.thorongLa, P.annapurnaSouth, P.machhapuchhre],    description: 'A classic trek around the Annapurna massif',
    rating: 4.8,
    region: 'Annapurna',
    map: { lat: 28.5983, lng: 83.9311 },
    weatherLocation: 'Annapurna',
    highlights: [
      'Thorong La Pass',
      'Manang Valley',
      'Muktinath Temple'
    ],
    itinerary: [
      "Day 1: Kathmandu (1,400m) - Arrival & Preparation\n   • Arrive in Kathmandu, hotel check-in\n   • Trek briefing and gear check\n   • Overnight: Kathmandu hotel",
      "Day 2: Kathmandu → Besisahar (760m) → Bhulbhule (840m)\n   • Drive to Besisahar (6-7 hours)\n   • Short trek to Bhulbhule (1 hour)\n   • Overnight: Bhulbhule tea house",
      "Day 3: Bhulbhule → Jagat (1,300m)\n   • Trek along Marsyangdi River\n   • Pass through rice terraces (6-7 hours)\n   • Overnight: Jagat tea house",
      "Day 4: Jagat → Dharapani (1,860m)\n   • Cross suspension bridges\n   • Enter Manang district (6-7 hours)\n   • Overnight: Dharapani tea house",
      "Day 5: Dharapani → Chame (2,670m)\n   • Trek through pine forests\n   • First views of Annapurna II (6-7 hours)\n   • Overnight: Chame tea house",
      "Day 6: Chame → Pisang (3,200m)\n   • Ascend through apple orchards\n   • Views of Paungda Danda (5-6 hours)\n   • Overnight: Pisang tea house",
      "Day 7: Pisang → Manang (3,540m)\n   • Trek through Upper Pisang\n   • Visit Barge Monastery (4-5 hours)\n   • Overnight: Manang tea house",
      "Day 8: Manang - Acclimatization Day\n   • Optional hike to Gangapurna Lake\n   • Visit local monastery and museum\n   • Overnight: Manang tea house",
      "Day 9: Manang → Yak Kharka (4,018m)\n   • Ascend to alpine meadows\n   • Views of Annapurna III (4-5 hours)\n   • Overnight: Yak Kharka tea house",
      "Day 10: Yak Kharka → Thorong Phedi (4,450m)\n   • Short trek to base of Thorong La\n   • Rest and prepare for pass (3-4 hours)\n   • Overnight: Thorong Phedi tea house",
      "Day 11: Thorong Phedi → Thorong La (5,416m) → Muktinath (3,760m)\n   • Early start to cross Thorong La Pass\n   • Long descent to Muktinath (8-10 hours)\n   • Overnight: Muktinath tea house",
      "Day 12: Muktinath → Jomsom (2,720m)\n   • Visit Muktinath Temple\n   • Descend to Kali Gandaki Valley (5-6 hours)\n   • Overnight: Jomsom tea house",
      "Day 13: Jomsom → Marpha (2,670m)\n   • Trek through apple orchards\n   • Visit Marpha village (3-4 hours)\n   • Overnight: Marpha tea house",
      "Day 14: Marpha → Kalopani (2,530m)\n   • Trek through Thakali villages\n   • Views of Dhaulagiri (6-7 hours)\n   • Overnight: Kalopani tea house",
      "Day 15: Kalopani → Tatopani (1,190m)\n   • Descend to hot springs\n   • Relax in natural hot baths (6-7 hours)\n   • Overnight: Tatopani tea house",
      "Day 16: Tatopani → Ghorepani (2,750m)\n   • Steep climb through rhododendron forests\n   • Ascend to Ghorepani (7-8 hours)\n   • Overnight: Ghorepani tea house",
      "Day 17: Ghorepani → Poon Hill (3,210m) → Tadapani (2,630m)\n   • Early morning Poon Hill sunrise\n   • Trek to Tadapani (6-7 hours)\n   • Overnight: Tadapani tea house",
      "Day 18: Tadapani → Nayapul → Pokhara\n   • Descend to Nayapul (4-5 hours)\n   • Drive to Pokhara (1 hour)\n   • Overnight: Pokhara hotel"
    ],
    reviews: [
      { name: 'David Thompson', rating: 5, text: 'The diversity of landscapes was incredible - from subtropical forests to high alpine desert!' },
      { name: 'Lisa Wang', rating: 4, text: 'Great trek for first-timers. The tea houses were comfortable and the food was delicious.' },
      { name: 'James Wilson', rating: 5, text: 'Thorong La Pass was challenging but the views were absolutely worth it!' }
    ],
    accommodation: [
      { type: "Tea Houses", description: "Well-established lodges with good facilities", price: "$10-20/night" },
      { type: "Guest Houses", description: "Comfortable accommodation with attached bathrooms", price: "$25-40/night" }
    ]
  },
  {
    id: 3,
    name: 'Langtang Valley Trek',
    location: 'Langtang, Nepal',
    images: [P.langtangValley, P.kyanjinGompa, P.langtangValley],    description: 'A beautiful valley trek close to Kathmandu',
    rating: 4.7,
    region: 'Langtang',
    map: { lat: 28.2116, lng: 85.5567 },
    weatherLocation: 'Langtang',
    highlights: [
      'Langtang Village',
      'Kyanjin Gompa',
      'Local cheese factory'
    ],
    itinerary: [
      "Day 1: Kathmandu (1,400m) - Arrival & Preparation\n   • Arrive in Kathmandu, hotel check-in\n   • Trek briefing and gear check\n   • Overnight: Kathmandu hotel",
      "Day 2: Kathmandu → Syabrubesi (1,460m)\n   • Drive to Syabrubesi (7-8 hours)\n   • Scenic mountain road journey\n   • Overnight: Syabrubesi tea house",
      "Day 3: Syabrubesi → Lama Hotel (2,380m)\n   • Cross Langtang Khola bridge\n   • Trek through subtropical forests (6-7 hours)\n   • Overnight: Lama Hotel tea house",
      "Day 4: Lama Hotel → Langtang Village (3,430m)\n   • Trek through rhododendron forests\n   • Pass landslide area (6-7 hours)\n   • Overnight: Langtang Village tea house",
      "Day 5: Langtang Village → Kyanjin Gompa (3,870m)\n   • Short trek to Kyanjin Gompa\n   • Visit local cheese factory (3-4 hours)\n   • Overnight: Kyanjin Gompa tea house",
      "Day 6: Kyanjin Gompa - Exploration Day\n   • Optional hike to Kyanjin Ri (4,773m)\n   • Visit monastery and cheese factory\n   • Overnight: Kyanjin Gompa tea house",
      "Day 7: Kyanjin Gompa → Lama Hotel (2,380m)\n   • Descend to Lama Hotel\n   • Return through Langtang Valley (6-7 hours)\n   • Overnight: Lama Hotel tea house",
      "Day 8: Lama Hotel → Syabrubesi (1,460m)\n   • Final day of trekking\n   • Descend to Syabrubesi (6-7 hours)\n   • Overnight: Syabrubesi tea house",
      "Day 9: Syabrubesi → Kathmandu\n   • Drive back to Kathmandu\n   • Transfer to hotel, rest day\n   • Overnight: Kathmandu hotel"
    ],
    reviews: [
      { name: 'Maria Garcia', rating: 5, text: 'Perfect for beginners! The Tamang culture was fascinating and the valley was beautiful.' },
      { name: 'Alex Kim', rating: 4, text: 'Great introduction to trekking in Nepal. The cheese factory was a unique highlight!' },
      { name: 'Sophie Brown', rating: 5, text: 'Less crowded than other treks, authentic local experience, highly recommend!' }
    ],
    accommodation: [
      { type: "Tea Houses", description: "Simple but clean lodges with basic amenities", price: "$8-15/night" },
      { type: "Local Guest Houses", description: "Family-run accommodation with home-cooked meals", price: "$12-20/night" }
    ]
  },
  {
    id: 4,
    name: 'Manaslu Circuit',
    location: 'Manaslu, Nepal',
    images: [P.manasluFromTimang, P.larkePassManaslu, P.manasluFromTimang],    description: 'A remote and challenging circuit trek around the world’s eighth highest mountain, Manaslu.',
    rating: 4.6,
    region: 'manaslu',
    map: { lat: 28.5495, lng: 84.5612 },
    weatherLocation: 'Manaslu',
    highlights: [
      'Remote trekking experience',
      'Challenging terrain',
      'World’s eighth highest mountain',
      'Manaslu Conservation Area'
    ],
    itinerary: [
      'Day 1: Drive from Kathmandu to Besisahar',
      'Day 2: Besisahar to Beni',
      'Day 3: Beni to Chame',
      'Day 4: Chame to Pisang',
      'Day 5: Pisang to Manang',
      'Day 6: Manang to Thorong Phedi',
      'Day 7: Thorong Phedi to Muktinath',
      'Day 8: Muktinath to Jomsom',
      'Day 9: Jomsom to Kagbeni',
      'Day 10: Kagbeni to Beni',
      'Day 11: Beni to Besisahar',
      'Day 12: Drive back to Kathmandu'
    ],
    reviews: [
      { name: 'John D.', text: 'The Manaslu Circuit was one of the most challenging treks I have ever done. The views were incredible!' },
      { name: 'Emma F.', text: 'Well-organized, supportive guides, and a great community of trekkers. Highly recommend this trek!' }
    ]
  },
];

const TABS = [
  { id: 'info', label: 'Info', icon: <FaRegListAlt /> },
  { id: 'itinerary', label: 'Itinerary', icon: <FaRegCalendarAlt /> },
  { id: 'accommodation', label: 'Accommodation', icon: <FaHiking /> },
  { id: 'reviews', label: 'Reviews', icon: <FaStar /> }
];

const TrekDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState('info');
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [apiTrek, setApiTrek] = useState(null);
  const [trekLoading, setTrekLoading] = useState(false);
  if (!trek) return <div style={{ padding: 40, textAlign: 'center' }}>Trek not found.</div>;

  // Ensure trek has required properties for display
  const trekWithDefaults = {
    ...trek,
    images: trek.images || [P.everestBaseCamp, P.mountEverest, P.thorongLa],    location: trek.location || `${trek.region}, Nepal`,
    rating: trek.rating || 4.5,
    highlights: trek.highlights || [],
    itinerary: trek.itinerary || [
      'Day 1: Arrival and preparation',
      'Day 2: Begin trek',
      'Day 3: Continue trek',
      'Day 4: Return journey'
    ],
    reviews: trek.reviews || [
      { name: 'Anonymous', text: 'Great trek experience!', rating: 4 }
    ],
    accommodation: trek.accommodation || [
      { type: 'Tea Houses', description: 'Basic accommodation available along the route', price: '$15-25/night' }
    ],
    map: trek.map || { lat: 27.9881, lng: 86.9250 },
    weatherLocation: trek.weatherLocation || trek.name
  };



  // Carousel controls
  const prevImg = () => setGalleryIdx((galleryIdx - 1 + trekWithDefaults.images.length) % trekWithDefaults.images.length);
  const nextImg = () => setGalleryIdx((galleryIdx + 1) % trekWithDefaults.images.length);

  // Wishlist functionality
  const handleAddToWishlist = () => {
    const isInWishlist = wishlist.some(item => item.id === trekWithDefaults.id);
    
    if (isInWishlist) {
      const updatedWishlist = wishlist.filter(item => item.id !== trekWithDefaults.id);
      setWishlist(updatedWishlist);
      localStorage.setItem('trekWishlist', JSON.stringify(updatedWishlist));
      toast.success(`${trekWithDefaults.name} removed from wishlist!`);
    } else {
      const updatedWishlist = [...wishlist, { ...trekWithDefaults, addedAt: new Date().toISOString() }];
      setWishlist(updatedWishlist);
      localStorage.setItem('trekWishlist', JSON.stringify(updatedWishlist));
      toast.success(`${trekWithDefaults.name} added to wishlist!`);
    }
  };

  const isInWishlist = wishlist.some(item => item.id === trekWithDefaults.id);

  const handleBack = () => {
    if (fromRecommender) {
      navigate('/trek-recommender');
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="trek-detail-page" style={{ maxWidth: 1000, margin: '0 auto', padding: '0 0 3rem 0' }}>
      {/* Back Button */}
      {fromRecommender && (
        <div style={{ padding: '1rem 2rem', marginBottom: '1rem' }}>
          <button 
            onClick={handleBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(14,165,233,0.1)',
              color: 'var(--primary)',
              border: '1px solid rgba(14,165,233,0.2)',
              borderRadius: '12px',
              padding: '0.75rem 1.5rem',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.3s ease'
            }}
          >
            <FaArrowLeft />
            Back to Recommendations
          </button>
        </div>
      )}
      
      {/* Hero Gallery */}
      <div style={{ position: 'relative', width: '100%', minHeight: 320, borderRadius: '0 0 2.5rem 2.5rem', overflow: 'hidden', marginBottom: 32, boxShadow: '0 8px 32px rgba(44,62,80,0.13)' }}>
                 <img src={trekWithDefaults.images[galleryIdx]} alt={trekWithDefaults.name} loading="lazy" decoding="async" style={{ width: '100%', height: 340, objectFit: 'cover', filter: 'brightness(0.7)', transition: 'all 0.4s cubic-bezier(.4,0,.2,1)' }} />        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)', zIndex: 1 }} />
                 {/* Carousel Controls */}
         {trekWithDefaults.images.length > 1 && (
          <>
            <button onClick={prevImg} style={{ position: 'absolute', top: '50%', left: 18, zIndex: 2, background: 'rgba(0,0,0,0.35)', border: 'none', borderRadius: '50%', color: '#fff', fontSize: 22, width: 38, height: 38, cursor: 'pointer', transform: 'translateY(-50%)' }}><FaChevronLeft /></button>
            <button onClick={nextImg} style={{ position: 'absolute', top: '50%', right: 18, zIndex: 2, background: 'rgba(0,0,0,0.35)', border: 'none', borderRadius: '50%', color: '#fff', fontSize: 22, width: 38, height: 38, cursor: 'pointer', transform: 'translateY(-50%)' }}><FaChevronRight /></button>
          </>
        )}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 2, color: '#fff', padding: '2.2rem 2rem 1.2rem 2rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
                     <h1 style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0, letterSpacing: 1 }}>{trekWithDefaults.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 18 }}>
                         <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><FaMapMarkerAlt style={{ color: 'var(--primary)' }} /> {trekWithDefaults.location}</span>
             <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fbbf24' }}><FaStar /> {trekWithDefaults.rating}</span>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
              <button 
                onClick={handleAddToWishlist}
                style={{ 
                  background: isInWishlist ? '#ef4444' : 'rgba(255,255,255,0.2)', 
                  color: isInWishlist ? '#fff' : '#fff', 
                  border: '1px solid rgba(255,255,255,0.3)', 
                  borderRadius: 12, 
                  padding: '0.7rem 1.5rem', 
                  fontWeight: 700, 
                  fontSize: 16, 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <FaHeart />
                {isInWishlist ? 'Remove' : 'Wishlist'}
              </button>
              <button style={{ background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 12, padding: '0.7rem 2rem', fontWeight: 700, fontSize: 18, boxShadow: '0 2px 8px rgba(44,62,80,0.10)', cursor: 'pointer' }}>Book Now</button>
            </div>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 18, margin: '0 1rem 2.2rem 1rem', borderBottom: '2px solid var(--border-color)' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ background: 'none', border: 'none', borderBottom: tab === t.id ? '3px solid var(--primary)' : '3px solid transparent', color: tab === t.id ? 'var(--primary)' : 'var(--text-light)', fontWeight: 700, fontSize: 18, padding: '0.7rem 1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'border 0.2s, color 0.2s' }}>{t.icon} {t.label}</button>        ))}
      </div>
      {/* Tab Content */}
      <div style={{ margin: '0 1rem', minHeight: 220 }}>
        {tab === 'info' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {/* Highlights */}
            <div style={{ background: 'var(--surface)', borderRadius: 18, boxShadow: 'var(--shadow)', padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 10, color: 'var(--primary)' }}>Highlights</h2>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 18 }}>
                                 {trekWithDefaults.highlights && trekWithDefaults.highlights.map((h, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, color: 'var(--text-main)', background: 'var(--surface-elevated)', borderRadius: 8, padding: '0.5rem 1.1rem', fontWeight: 600 }}><FaRegCheckCircle style={{ color: 'var(--primary)' }} /> {h}</li>                ))}
              </ul>
            </div>
            {/* Map & Weather */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
              <div style={{ background: 'var(--surface)', borderRadius: 16, boxShadow: 'var(--shadow)', padding: 22 }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 12 }}>Map</h2>
                                 <MapComponent 
                   center={[trekWithDefaults.map.lat, trekWithDefaults.map.lng]} 
                   markers={[{ 
                     position: [trekWithDefaults.map.lat, trekWithDefaults.map.lng], 
                     name: trekWithDefaults.name,
                     description: trekWithDefaults.description || trekWithDefaults.name,
                     difficulty: trekWithDefaults.difficulty || 'Moderate',
                     elevation: trekWithDefaults.elevation || 'Unknown',
                     bestTime: trekWithDefaults.bestTime || 'Year-round',
                     coordinates: `${trekWithDefaults.map.lat}°N, ${trekWithDefaults.map.lng}°E`,
                     checkpoints: []
                   }]} 
                 />
              </div>
              <div style={{ background: 'var(--surface)', borderRadius: 16, boxShadow: 'var(--shadow)', padding: 22 }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 12 }}>Weather</h2>
                                 <WeatherComponent location={trekWithDefaults.weatherLocation} compact={true} />
              </div>
            </div>

          </div>
        )}
        {tab === 'itinerary' && (
          <div style={{ background: 'var(--surface)', borderRadius: 18, boxShadow: 'var(--shadow)', padding: '2rem 2rem', minHeight: 220 }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 18, color: 'var(--primary)' }}>Itinerary</h2>
            <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {trekWithDefaults.itinerary && trekWithDefaults.itinerary.length > 0 ? (
                trekWithDefaults.itinerary.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 16, color: 'var(--text-main)' }}>                    <FaHiking style={{ color: 'var(--primary)', marginTop: '4px', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      {item.split('\n').map((line, lineIndex) => (
                        <div key={lineIndex} style={{ 
                          marginBottom: lineIndex === 0 ? '8px' : '4px',
                          fontWeight: lineIndex === 0 ? '600' : '400',
                          color: lineIndex === 0 ? 'var(--primary)' : 'var(--text-light)',                          fontSize: lineIndex === 0 ? '16px' : '14px'
                        }}>
                          {line}
                        </div>
                      ))}
                    </div>
                  </li>
                ))
              ) : (
                <li style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Itinerary information not available.</li>              )}
            </ol>
          </div>
        )}
                 {tab === 'accommodation' && (
           <div style={{ background: 'var(--surface)', borderRadius: 18, boxShadow: 'var(--shadow)', padding: '2rem 2rem', minHeight: 220 }}>
             <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 18, color: 'var(--primary)' }}>Accommodation Options</h2>
             {trekWithDefaults.accommodation && trekWithDefaults.accommodation.length > 0 ? (
               <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                 {trekWithDefaults.accommodation.map((option, i) => (
                   <div key={i} style={{ background: 'var(--surface-elevated)', borderRadius: 12, padding: '1.5rem', border: '1px solid var(--border-color)' }}>                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                       <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--primary)', margin: 0 }}>{option.type}</h3>
                       <span style={{ background: 'var(--primary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: 20, fontSize: 14, fontWeight: 600 }}>{option.price}</span>
                     </div>
                     <p style={{ color: 'var(--text-light)', fontSize: 15, margin: 0, lineHeight: 1.5 }}>{option.description}</p>                   </div>
                 ))}
               </div>
             ) : (
               <span style={{ color: 'var(--text-muted)' }}>Accommodation information not available.</span>             )}
           </div>
         )}
         {tab === 'reviews' && (
           <div style={{ background: 'var(--surface)', borderRadius: 18, boxShadow: 'var(--shadow)', padding: '2rem 2rem', minHeight: 220, display: 'flex', flexDirection: 'column', gap: 18 }}>
             <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 10, color: 'var(--primary)' }}>Reviews</h2>
             {trekWithDefaults.reviews && trekWithDefaults.reviews.length > 0 ? (
               trekWithDefaults.reviews.map((r, i) => (
                 <div key={i} style={{ background: 'var(--surface-elevated)', borderRadius: 10, padding: '1rem 1.2rem', color: 'var(--text-main)', fontSize: 16, fontStyle: 'italic', display: 'flex', flexDirection: 'column', gap: 4 }}>                   <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                     <span>"{r.text}"</span>
                     <div style={{ display: 'flex', gap: 2 }}>
                       {[...Array(5)].map((_, star) => (
                         <span key={star} style={{ color: star < r.rating ? '#fbbf24' : '#d1d5db' }}>★</span>
                       ))}
                     </div>
                   </div>
                   <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: 15, marginTop: 4 }}>- {r.name}</span>
                 </div>
               ))
             ) : (
               <span style={{ color: 'var(--text-muted)' }}>No reviews yet.</span>             )}
           </div>
         )}
      </div>
    </div>
  );
};

export default TrekDetail; 