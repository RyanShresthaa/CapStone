import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMountain, FaClock, FaDollarSign, FaStar, FaMapMarkerAlt, FaThermometerHalf, FaUsers, FaLeaf, FaHeart, FaEye } from 'react-icons/fa';
import toast from 'react-hot-toast';
import './TrekRecommender.css';

const TrekRecommender = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    experience: '',
    budget: '',
    timeAvailable: '',
    preferredRegion: '',
    groupSize: '',
    season: ''
  });

  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('trekWishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [showWishlist, setShowWishlist] = useState(false);

  // Comprehensive trek database with real data
  const trekDatabase = [
    {
      id: 1,
      name: "Everest Base Camp Trek",
      region: "Khumbu",
      difficulty: "Challenging",
      duration: "14 days",
      altitude: 5364,
      budget: "High",
      minExperience: "Moderate",
      description: "The iconic trek to the base of the world's highest peak",
      highlights: ["Kala Patthar viewpoint", "Namche Bazaar", "Tengboche Monastery"],
      sustainabilityScore: 8,
      bestSeason: "Spring/Autumn",
      groupSize: "2-12 people",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500",
      weatherLocation: "Everest Base Camp",
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
        { name: "Sarah Johnson", rating: 5, text: "Absolutely life-changing! The views of Everest were breathtaking. Our guide was incredibly knowledgeable about the local culture." },
        { name: "Michael Chen", rating: 4, text: "Challenging but rewarding. The altitude was tough but the Sherpa hospitality made it all worthwhile." },
        { name: "Emma Rodriguez", rating: 5, text: "Perfect organization, stunning scenery, and unforgettable memories. Highly recommend!" }
      ],
      accommodation: [
        { type: "Tea Houses", description: "Basic but comfortable lodges with shared rooms", price: "$15-25/night" },
        { type: "Luxury Lodges", description: "Premium accommodation with private rooms and hot showers", price: "$80-150/night" }
      ]
    },
    {
      id: 2,
      name: "Annapurna Circuit Trek",
      region: "Annapurna",
      difficulty: "Moderate",
      duration: "18 days",
      altitude: 5416,
      budget: "Medium",
      minExperience: "Beginner",
      description: "A classic trek around the Annapurna massif",
      highlights: ["Thorong La Pass", "Manang Valley", "Muktinath Temple"],
      sustainabilityScore: 7,
      bestSeason: "Spring/Autumn",
      groupSize: "2-15 people",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
      weatherLocation: "Annapurna",
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
        { name: "David Thompson", rating: 5, text: "The diversity of landscapes was incredible - from subtropical forests to high alpine desert!" },
        { name: "Lisa Wang", rating: 4, text: "Great trek for first-timers. The tea houses were comfortable and the food was delicious." },
        { name: "James Wilson", rating: 5, text: "Thorong La Pass was challenging but the views were absolutely worth it!" }
      ],
      accommodation: [
        { type: "Tea Houses", description: "Well-established lodges with good facilities", price: "$10-20/night" },
        { type: "Guest Houses", description: "Comfortable accommodation with attached bathrooms", price: "$25-40/night" }
      ]
    },
    {
      id: 3,
      name: "Langtang Valley Trek",
      region: "Langtang",
      difficulty: "Easy",
      duration: "8 days",
      altitude: 3870,
      budget: "Low",
      minExperience: "Beginner",
      description: "A beautiful valley trek close to Kathmandu",
      highlights: ["Langtang Village", "Kyanjin Gompa", "Local cheese factory"],
      sustainabilityScore: 9,
      bestSeason: "Spring/Autumn/Winter",
      groupSize: "2-10 people",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
      weatherLocation: "Langtang",
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
        { name: "Maria Garcia", rating: 5, text: "Perfect for beginners! The Tamang culture was fascinating and the valley was beautiful." },
        { name: "Alex Kim", rating: 4, text: "Great introduction to trekking in Nepal. The cheese factory was a unique highlight!" },
        { name: "Sophie Brown", rating: 5, text: "Less crowded than other treks, authentic local experience, highly recommend!" }
      ],
      accommodation: [
        { type: "Tea Houses", description: "Simple but clean lodges with basic amenities", price: "$8-15/night" },
        { type: "Local Guest Houses", description: "Family-run accommodation with home-cooked meals", price: "$12-20/night" }
      ]
    },
    {
      id: 4,
      name: "Manaslu Circuit Trek",
      region: "Manaslu",
      difficulty: "Challenging",
      duration: "16 days",
      altitude: 5160,
      budget: "High",
      minExperience: "Moderate",
      description: "A remote and less crowded alternative to Annapurna",
      highlights: ["Larkya La Pass", "Manaslu Base Camp", "Traditional villages"],
      sustainabilityScore: 8,
      bestSeason: "Spring/Autumn",
      groupSize: "2-8 people",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
      weatherLocation: "Manaslu",
      itinerary: [
        "Day 1: Kathmandu (1,400m) - Arrival & Preparation\n   • Arrive in Kathmandu, hotel check-in\n   • Trek briefing and gear check\n   • Overnight: Kathmandu hotel",
        "Day 2: Kathmandu → Soti Khola (700m)\n   • Drive to Soti Khola (8-9 hours)\n   • Scenic journey through Gorkha\n   • Overnight: Soti Khola tea house",
        "Day 3: Soti Khola → Machha Khola (930m)\n   • Trek along Budhi Gandaki River\n   • Cross suspension bridges (6-7 hours)\n   • Overnight: Machha Khola tea house",
        "Day 4: Machha Khola → Jagat (1,340m)\n   • Trek through terraced fields\n   • Enter Manaslu Conservation Area (6-7 hours)\n   • Overnight: Jagat tea house",
        "Day 5: Jagat → Deng (1,804m)\n   • Ascend through pine forests\n   • Views of Shringi Himal (6-7 hours)\n   • Overnight: Deng tea house",
        "Day 6: Deng → Namrung (2,630m)\n   • Trek through rhododendron forests\n   • Pass traditional villages (6-7 hours)\n   • Overnight: Namrung tea house",
        "Day 7: Namrung → Samagaon (3,530m)\n   • Trek to Manaslu Base Camp area\n   • Views of Manaslu (6-7 hours)\n   • Overnight: Samagaon tea house",
        "Day 8: Samagaon - Acclimatization Day\n   • Optional hike to Manaslu Base Camp\n   • Visit local monastery\n   • Overnight: Samagaon tea house",
        "Day 9: Samagaon → Samdo (3,860m)\n   • Short trek to Samdo\n   • Views of Tibetan border (4-5 hours)\n   • Overnight: Samdo tea house",
        "Day 10: Samdo → Dharamsala (4,460m)\n   • Trek to Larkya La base\n   • Prepare for pass crossing (4-5 hours)\n   • Overnight: Dharamsala tea house",
        "Day 11: Dharamsala → Larkya La (5,160m) → Bimthang (3,720m)\n   • Early start to cross Larkya La Pass\n   • Long descent to Bimthang (8-10 hours)\n   • Overnight: Bimthang tea house",
        "Day 12: Bimthang → Tilije (2,300m)\n   • Descend through alpine meadows\n   • Cross Dudh Khola (6-7 hours)\n   • Overnight: Tilije tea house",
        "Day 13: Tilije → Dharapani (1,860m)\n   • Trek through Marsyangdi Valley\n   • Join Annapurna Circuit (5-6 hours)\n   • Overnight: Dharapani tea house",
        "Day 14: Dharapani → Jagat (1,300m)\n   • Descend through villages\n   • Views of Annapurna II (6-7 hours)\n   • Overnight: Jagat tea house",
        "Day 15: Jagat → Besisahar (760m)\n   • Final day of trekking\n   • Descend to Besisahar (6-7 hours)\n   • Overnight: Besisahar tea house",
        "Day 16: Besisahar → Kathmandu\n   • Drive back to Kathmandu\n   • Transfer to hotel, rest day\n   • Overnight: Kathmandu hotel"
      ],
      reviews: [
        { name: "Robert Anderson", rating: 5, text: "Remote and pristine! Much less crowded than other popular treks." },
        { name: "Yuki Tanaka", rating: 4, text: "Challenging but the solitude and untouched beauty made it special." },
        { name: "Claire Dubois", rating: 5, text: "Authentic experience with traditional villages and stunning mountain views!" }
      ],
      accommodation: [
        { type: "Tea Houses", description: "Basic lodges with limited facilities", price: "$15-25/night" },
        { type: "Camping", description: "Full camping service with tents and meals", price: "$60-100/night" }
      ]
    },
    {
      id: 5,
      name: "Poon Hill Trek",
      region: "Annapurna",
      difficulty: "Easy",
      duration: "5 days",
      altitude: 3210,
      budget: "Low",
      minExperience: "Beginner",
      description: "Perfect for beginners with stunning mountain views",
      highlights: ["Poon Hill sunrise", "Ghandruk village", "Rhododendron forests"],
      sustainabilityScore: 6,
      bestSeason: "All year",
      groupSize: "2-15 people",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
      weatherLocation: "Pokhara",
      itinerary: [
        "Day 1: Kathmandu → Pokhara (820m) - Arrival & Preparation\n   • Drive or fly to Pokhara\n   • Trek briefing and gear check\n   • Overnight: Pokhara hotel",
        "Day 2: Pokhara → Nayapul → Ulleri (1,960m)\n   • Drive to Nayapul (1.5 hours)\n   • Trek to Ulleri via Tikhedhunga (5-6 hours)\n   • Overnight: Ulleri tea house",
        "Day 3: Ulleri → Ghorepani (2,750m)\n   • Trek through rhododendron forests\n   • Ascend to Ghorepani (5-6 hours)\n   • Overnight: Ghorepani tea house",
        "Day 4: Ghorepani → Poon Hill (3,210m) → Tadapani (2,630m)\n   • Early morning Poon Hill sunrise\n   • Panoramic views of Annapurna range\n   • Trek to Tadapani (6-7 hours)\n   • Overnight: Tadapani tea house",
        "Day 5: Tadapani → Ghandruk (1,940m)\n   • Descend to Ghandruk village\n   • Explore traditional Gurung village (4-5 hours)\n   • Overnight: Ghandruk tea house",
        "Day 6: Ghandruk → Nayapul → Pokhara\n   • Descend to Nayapul (4-5 hours)\n   • Drive back to Pokhara\n   • Overnight: Pokhara hotel"
      ],
      reviews: [
        { name: "Tom Miller", rating: 5, text: "Perfect first trek! The sunrise from Poon Hill was magical." },
        { name: "Anna Kowalski", rating: 4, text: "Great for families and beginners. Beautiful rhododendron forests in spring." },
        { name: "Carlos Mendez", rating: 5, text: "Short but spectacular! The Annapurna views were incredible." }
      ],
      accommodation: [
        { type: "Tea Houses", description: "Comfortable lodges with good facilities", price: "$10-20/night" },
        { type: "Mountain Lodges", description: "Well-maintained accommodation with hot showers", price: "$20-35/night" }
      ]
    },
    {
      id: 6,
      name: "Upper Mustang Trek",
      region: "Mustang",
      difficulty: "Moderate",
      duration: "12 days",
      altitude: 3810,
      budget: "High",
      minExperience: "Moderate",
      description: "Explore the ancient kingdom of Lo",
      highlights: ["Lo Manthang", "Tibetan culture", "Desert landscapes"],
      sustainabilityScore: 7,
      bestSeason: "Spring/Autumn",
      groupSize: "2-10 people",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
      weatherLocation: "Mustang",
      itinerary: [
        "Day 1: Kathmandu (1,400m) - Arrival & Preparation\n   • Arrive in Kathmandu, hotel check-in\n   • Trek briefing and gear check\n   • Overnight: Kathmandu hotel",
        "Day 2: Kathmandu → Pokhara → Jomsom (2,720m)\n   • Fly to Pokhara, then to Jomsom\n   • Acclimatization in Jomsom\n   • Overnight: Jomsom tea house",
        "Day 3: Jomsom → Kagbeni (2,810m)\n   • Trek along Kali Gandaki River\n   • Enter Upper Mustang region (4-5 hours)\n   • Overnight: Kagbeni tea house",
        "Day 4: Kagbeni → Chele (3,050m)\n   • Cross suspension bridge\n   • Trek through desert landscape (6-7 hours)\n   • Overnight: Chele tea house",
        "Day 5: Chele → Syangboche (3,475m)\n   • Pass through traditional villages\n   • Views of Nilgiri peaks (6-7 hours)\n   • Overnight: Syangboche tea house",
        "Day 6: Syangboche → Ghami (3,520m)\n   • Trek through ancient trade route\n   • Visit Ghami monastery (6-7 hours)\n   • Overnight: Ghami tea house",
        "Day 7: Ghami → Charang (3,560m)\n   • Trek through Lo La Pass\n   • Explore Charang village (5-6 hours)\n   • Overnight: Charang tea house",
        "Day 8: Charang → Lo Manthang (3,810m)\n   • Enter the walled city of Lo Manthang\n   • Visit ancient monasteries (4-5 hours)\n   • Overnight: Lo Manthang tea house",
        "Day 9: Lo Manthang - Exploration Day\n   • Visit Chosar Cave monasteries\n   • Explore the forbidden kingdom\n   • Overnight: Lo Manthang tea house",
        "Day 10: Lo Manthang → Ghami (3,520m)\n   • Return journey begins\n   • Trek back to Ghami (6-7 hours)\n   • Overnight: Ghami tea house",
        "Day 11: Ghami → Chele (3,050m)\n   • Continue descent\n   • Return through villages (6-7 hours)\n   • Overnight: Chele tea house",
        "Day 12: Chele → Jomsom (2,720m)\n   • Final day of trekking\n   • Return to Jomsom (6-7 hours)\n   • Overnight: Jomsom tea house",
        "Day 13: Jomsom → Pokhara → Kathmandu\n   • Fly to Pokhara, then to Kathmandu\n   • Transfer to hotel, rest day\n   • Overnight: Kathmandu hotel"
      ],
      reviews: [
        { name: "Hans Mueller", rating: 5, text: "Like stepping back in time! The Tibetan culture was fascinating." },
        { name: "Isabella Silva", rating: 4, text: "Unique desert landscapes and ancient monasteries. Very special experience." },
        { name: "Pierre Laurent", rating: 5, text: "The forbidden kingdom lived up to its name. Absolutely magical!" }
      ],
      accommodation: [
        { type: "Tea Houses", description: "Basic lodges with limited facilities", price: "$20-35/night" },
        { type: "Local Guest Houses", description: "Simple accommodation in traditional homes", price: "$25-40/night" }
      ]
    },
    {
      id: 7,
      name: "Mardi Himal Trek",
      region: "Annapurna",
      difficulty: "Easy",
      duration: "7 days",
      altitude: 4500,
      budget: "Low",
      minExperience: "Beginner",
      description: "A hidden gem with spectacular Annapurna views",
      highlights: ["Mardi Himal Base Camp", "Forest Camp", "High Camp"],
      sustainabilityScore: 8,
      bestSeason: "Spring/Autumn",
      groupSize: "2-8 people",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
      weatherLocation: "Pokhara",
      itinerary: [
        "Day 1: Kathmandu → Pokhara (820m) - Arrival & Preparation\n   • Drive or fly to Pokhara\n   • Trek briefing and gear check\n   • Overnight: Pokhara hotel",
        "Day 2: Pokhara → Kande → Forest Camp (2,600m)\n   • Drive to Kande (1 hour)\n   • Trek through rhododendron forests (5-6 hours)\n   • Overnight: Forest Camp tea house",
        "Day 3: Forest Camp → Low Camp (3,150m)\n   • Ascend through alpine meadows\n   • Views of Machapuchare (5-6 hours)\n   • Overnight: Low Camp tea house",
        "Day 4: Low Camp → High Camp (3,580m)\n   • Trek above tree line\n   • Panoramic mountain views (4-5 hours)\n   • Overnight: High Camp tea house",
        "Day 5: High Camp → Mardi Himal Base Camp (4,500m)\n   • Early start to base camp\n   • Close views of Mardi Himal (6-7 hours)\n   • Overnight: High Camp tea house",
        "Day 6: High Camp → Siding (1,750m)\n   • Long descent to Siding\n   • Return through forests (6-7 hours)\n   • Overnight: Siding tea house",
        "Day 7: Siding → Pokhara\n   • Short trek to road head\n   • Drive back to Pokhara\n   • Overnight: Pokhara hotel"
      ],
      reviews: [
        { name: "Nina Patel", rating: 5, text: "Hidden gem! Much quieter than other Annapurna treks." },
        { name: "Lucas Johnson", rating: 4, text: "Great views of Machapuchare and Annapurna. Perfect for beginners." },
        { name: "Zara Ahmed", rating: 5, text: "Beautiful forest trails and stunning mountain vistas!" }
      ],
      accommodation: [
        { type: "Tea Houses", description: "Simple lodges with basic amenities", price: "$8-15/night" },
        { type: "Mountain Lodges", description: "Comfortable accommodation with good food", price: "$15-25/night" }
      ]
    },
    {
      id: 8,
      name: "Kanchenjunga Base Camp Trek",
      region: "Kanchenjunga",
      difficulty: "Challenging",
      duration: "20 days",
      altitude: 5143,
      budget: "High",
      minExperience: "Experienced",
      description: "Remote trek to the world's third highest peak",
      highlights: ["Kanchenjunga Base Camp", "Remote villages", "Alpine meadows"],
      sustainabilityScore: 9,
      bestSeason: "Spring/Autumn",
      groupSize: "2-6 people",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
      weatherLocation: "Taplejung",
      itinerary: [
        "Day 1: Kathmandu (1,400m) - Arrival & Preparation\n   • Arrive in Kathmandu, hotel check-in\n   • Trek briefing and gear check\n   • Overnight: Kathmandu hotel",
        "Day 2: Kathmandu → Taplejung (1,440m)\n   • Drive to Taplejung (12-14 hours)\n   • Scenic journey through eastern Nepal\n   • Overnight: Taplejung tea house",
        "Day 3: Taplejung → Chirwa (1,270m)\n   • Begin trekking\n   • Trek through terraced fields (6-7 hours)\n   • Overnight: Chirwa tea house",
        "Day 4: Chirwa → Sekathum (1,665m)\n   • Trek along Tamur River\n   • Cross suspension bridges (6-7 hours)\n   • Overnight: Sekathum tea house",
        "Day 5: Sekathum → Amjilosa (2,308m)\n   • Ascend through rhododendron forests\n   • Views of Kanchenjunga (6-7 hours)\n   • Overnight: Amjilosa tea house",
        "Day 6: Amjilosa → Gyabla (2,730m)\n   • Trek through alpine meadows\n   • Pass through traditional villages (6-7 hours)\n   • Overnight: Gyabla tea house",
        "Day 7: Gyabla → Ghunsa (3,595m)\n   • Enter Kanchenjunga Conservation Area\n   • Views of Jannu Himal (6-7 hours)\n   • Overnight: Ghunsa tea house",
        "Day 8: Ghunsa - Acclimatization Day\n   • Optional hike to nearby viewpoints\n   • Rest and acclimatization\n   • Overnight: Ghunsa tea house",
        "Day 9: Ghunsa → Kambachen (4,050m)\n   • Trek through glacial moraine\n   • Views of Kanchenjunga North (6-7 hours)\n   • Overnight: Kambachen tea house",
        "Day 10: Kambachen → Lhonak (4,780m)\n   • Trek to high alpine region\n   • Spectacular mountain views (6-7 hours)\n   • Overnight: Lhonak tea house",
        "Day 11: Lhonak → Kanchenjunga Base Camp (5,143m)\n   • Trek to base camp\n   • Close views of Kanchenjunga (4-5 hours)\n   • Overnight: Base Camp camping",
        "Day 12: Kanchenjunga Base Camp - Exploration Day\n   • Explore base camp area\n   • Optional side trips\n   • Overnight: Base Camp camping",
        "Day 13: Kanchenjunga Base Camp → Lhonak (4,780m)\n   • Begin return journey\n   • Descend to Lhonak (4-5 hours)\n   • Overnight: Lhonak tea house",
        "Day 14: Lhonak → Kambachen (4,050m)\n   • Continue descent\n   • Return through moraine (6-7 hours)\n   • Overnight: Kambachen tea house",
        "Day 15: Kambachen → Ghunsa (3,595m)\n   • Descend to Ghunsa\n   • Return to tree line (6-7 hours)\n   • Overnight: Ghunsa tea house",
        "Day 16: Ghunsa → Gyabla (2,730m)\n   • Continue descent\n   • Return through villages (6-7 hours)\n   • Overnight: Gyabla tea house",
        "Day 17: Gyabla → Amjilosa (2,308m)\n   • Descend through forests\n   • Return to lower elevations (6-7 hours)\n   • Overnight: Amjilosa tea house",
        "Day 18: Amjilosa → Sekathum (1,665m)\n   • Continue descent\n   • Return along Tamur River (6-7 hours)\n   • Overnight: Sekathum tea house",
        "Day 19: Sekathum → Chirwa (1,270m)\n   • Final day of trekking\n   • Return to Chirwa (6-7 hours)\n   • Overnight: Chirwa tea house",
        "Day 20: Chirwa → Taplejung → Kathmandu\n   • Drive back to Kathmandu\n   • Transfer to hotel, rest day\n   • Overnight: Kathmandu hotel"
      ],
      reviews: [
        { name: "Mark Stevens", rating: 5, text: "The most remote and pristine trek I've ever done. Absolutely incredible!" },
        { name: "Elena Popov", rating: 5, text: "Challenging but the solitude and untouched beauty were worth every step." },
        { name: "Rajesh Kumar", rating: 4, text: "Authentic experience with local communities. The mountain views were spectacular!" }
      ],
      accommodation: [
        { type: "Camping", description: "Full camping service with all equipment", price: "$80-120/night" },
        { type: "Tea Houses", description: "Basic lodges in remote villages", price: "$15-25/night" }
      ]
    }
  ];

  const experienceLevels = [
    { value: 'Beginner', label: 'Beginner (First time trekker)' },
    { value: 'Moderate', label: 'Moderate (Some trekking experience)' },
    { value: 'Experienced', label: 'Experienced (Regular trekker)' }
  ];

  const budgetRanges = [
    { value: 'Low', label: 'Low ($500-1000)', range: '500-1000' },
    { value: 'Medium', label: 'Medium ($1000-2000)', range: '1000-2000' },
    { value: 'High', label: 'High ($2000+)', range: '2000+' }
  ];

  const timeOptions = [
    { value: '1-5 days', label: '1-5 days' },
    { value: '6-10 days', label: '6-10 days' },
    { value: '11-15 days', label: '11-15 days' },
    { value: '16+ days', label: '16+ days' }
  ];

  const regions = [
    { value: 'Any', label: 'Any Region' },
    { value: 'Khumbu', label: 'Khumbu (Everest Region)' },
    { value: 'Annapurna', label: 'Annapurna Region' },
    { value: 'Langtang', label: 'Langtang Region' },
    { value: 'Manaslu', label: 'Manaslu Region' },
    { value: 'Mustang', label: 'Mustang Region' }
  ];

  const seasons = [
    { value: 'Spring', label: 'Spring (Mar-May)' },
    { value: 'Summer', label: 'Summer (Jun-Aug)' },
    { value: 'Autumn', label: 'Autumn (Sep-Nov)' },
    { value: 'Winter', label: 'Winter (Dec-Feb)' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTrekScore = (trek, preferences) => {
    let score = 0;
    
    // Experience match (35% weight) - More nuanced matching
    if (preferences.experience === trek.minExperience) {
      score += 35;
    } else if (preferences.experience === 'Experienced') {
      if (trek.minExperience === 'Moderate') score += 30;
      else if (trek.minExperience === 'Beginner') score += 25;
      else score += 20;
    } else if (preferences.experience === 'Moderate') {
      if (trek.minExperience === 'Beginner') score += 30;
      else if (trek.minExperience === 'Experienced') score += 25;
      else score += 20;
    } else { // Beginner
      if (trek.minExperience === 'Beginner') score += 35;
      else if (trek.minExperience === 'Moderate') score += 20;
      else score += 10; // Experienced treks are not suitable for beginners
    }

    // Budget match (25% weight) - More precise matching
    if (preferences.budget === trek.budget) {
      score += 25;
    } else if (preferences.budget === 'High') {
      if (trek.budget === 'Medium') score += 20;
      else if (trek.budget === 'Low') score += 15;
      else score += 25; // High budget matches high budget
    } else if (preferences.budget === 'Medium') {
      if (trek.budget === 'Low') score += 20;
      else if (trek.budget === 'High') score += 15;
      else score += 25; // Medium budget matches medium budget
    } else { // Low budget
      if (trek.budget === 'Low') score += 25;
      else if (trek.budget === 'Medium') score += 15;
      else score += 5; // High budget treks are not suitable for low budget
    }

    // Time match (20% weight) - More flexible matching
    const trekDays = parseInt(trek.duration);
    const preferredDays = preferences.timeAvailable.split('-')[1] || preferences.timeAvailable.split('-')[0];
    const maxPreferredDays = parseInt(preferredDays);
    
    if (trekDays <= maxPreferredDays) {
      score += 20;
    } else if (trekDays <= maxPreferredDays + 3) {
      score += 15; // Slightly over but still manageable
    } else if (trekDays <= maxPreferredDays + 7) {
      score += 10; // Over but possible with time adjustment
    } else {
      score += 5; // Too long for available time
    }

    // Region preference (15% weight) - Stronger regional preference
    if (preferences.preferredRegion === 'Any') {
      score += 15;
    } else if (preferences.preferredRegion === trek.region) {
      score += 15;
    } else {
      score += 5; // Different region but still possible
    }

    // Season match (5% weight)
    if (preferences.season && trek.bestSeason.includes(preferences.season)) {
      score += 5;
    } else if (preferences.season && trek.bestSeason === 'All year') {
      score += 5;
    } else {
      score += 2; // Not ideal season but still possible
    }

    return score;
  };

  const getRecommendations = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const scoredTreks = trekDatabase.map(trek => ({
        ...trek,
        score: calculateTrekScore(trek, formData)
      }));

      // Filter out low-scoring treks and ensure diversity
      const filteredTreks = scoredTreks
        .filter(trek => trek.score >= 25) // Lower threshold for more options
        .sort((a, b) => b.score - a.score);

      // Ensure diversity by selecting different regions and difficulties
      const diverseRecommendations = [];
      const selectedRegions = new Set();
      const selectedDifficulties = new Set();

      // First, add the highest scoring trek
      if (filteredTreks.length > 0) {
        diverseRecommendations.push(filteredTreks[0]);
        selectedRegions.add(filteredTreks[0].region);
        selectedDifficulties.add(filteredTreks[0].difficulty);
      }

      // Add diverse options
      for (let i = 1; i < filteredTreks.length && diverseRecommendations.length < 3; i++) {
        const trek = filteredTreks[i];
        
        // Prefer treks from different regions and difficulties
        const isDifferentRegion = !selectedRegions.has(trek.region);
        const isDifferentDifficulty = !selectedDifficulties.has(trek.difficulty);
        
        if (isDifferentRegion || isDifferentDifficulty) {
          diverseRecommendations.push(trek);
          selectedRegions.add(trek.region);
          selectedDifficulties.add(trek.difficulty);
        }
      }

      // If we don't have 3 diverse options, add more from the top scores
      for (let i = 1; i < filteredTreks.length && diverseRecommendations.length < 3; i++) {
        const trek = filteredTreks[i];
        if (!diverseRecommendations.find(r => r.id === trek.id)) {
          diverseRecommendations.push(trek);
        }
      }

      setRecommendations(diverseRecommendations);
      setShowResults(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getRecommendations();
  };

  const resetForm = () => {
    setFormData({
      experience: '',
      budget: '',
      timeAvailable: '',
      preferredRegion: '',
      groupSize: '',
      season: ''
    });
    setShowResults(false);
    setRecommendations([]);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#10b981';
      case 'Moderate': return '#f59e0b';
      case 'Challenging': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getBudgetColor = (budget) => {
    switch (budget) {
      case 'Low': return '#10b981';
      case 'Medium': return '#f59e0b';
      case 'High': return '#ef4444';
      default: return '#6b7280';
    }
  };

  // Save wishlist to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('trekWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handleViewDetails = (trek) => {
    // Navigate to trek detail page
    navigate(`/treks/${trek.id}`, { 
      state: { 
        trek: trek,
        fromRecommender: true 
      } 
    });
  };

  const handleAddToWishlist = (trek) => {
    const isInWishlist = wishlist.some(item => item.id === trek.id);
    
    if (isInWishlist) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter(item => item.id !== trek.id);
      setWishlist(updatedWishlist);
      toast.success(`${trek.name} removed from wishlist!`);
    } else {
      // Add to wishlist
      const updatedWishlist = [...wishlist, { ...trek, addedAt: new Date().toISOString() }];
      setWishlist(updatedWishlist);
      toast.success(`${trek.name} added to wishlist!`);
    }
  };

  const isInWishlist = (trekId) => {
    return wishlist.some(item => item.id === trekId);
  };

  return (
    <div className="trek-recommender">
      <div className="recommender-container">
                 {/* Header */}
         <div className="recommender-header">
           <div className="header-content">
             <h1 className="header-title">
               <FaMountain className="header-icon" />
               Trek Recommender
             </h1>
             <p className="header-subtitle">
               Get personalized trek recommendations based on your experience, budget, and preferences
             </p>
                           {wishlist.length > 0 && (
                <div className="wishlist-counter" onClick={() => setShowWishlist(!showWishlist)}>
                  <FaHeart />
                  <span>{wishlist.length} trek{wishlist.length !== 1 ? 's' : ''} in wishlist</span>
                  <span className="wishlist-toggle">View Wishlist</span>
                </div>
              )}
           </div>
         </div>

        {showWishlist ? (
          /* Wishlist View */
          <div className="wishlist-container">
            <div className="wishlist-header">
              <h2>Your Trek Wishlist</h2>
              <p>Your saved treks for future reference</p>
              <button onClick={() => setShowWishlist(false)} className="btn-secondary">
                Back to Recommender
              </button>
            </div>
            
            <div className="wishlist-grid">
              {wishlist.map((trek) => (
                <div key={trek.id} className="trek-card wishlist-card">
                  <div className="trek-card-header">
                    <div className="trek-image">
                      <img src={trek.image} alt={trek.name} />
                      <div className="wishlist-badge">
                        <FaHeart />
                      </div>
                    </div>
                    <div className="trek-badges">
                      <span 
                        className="badge difficulty"
                        style={{ backgroundColor: getDifficultyColor(trek.difficulty) }}
                      >
                        {trek.difficulty}
                      </span>
                      <span 
                        className="badge budget"
                        style={{ backgroundColor: getBudgetColor(trek.budget) }}
                      >
                        {trek.budget}
                      </span>
                    </div>
                  </div>

                  <div className="trek-card-content">
                    <h3 className="trek-name">{trek.name}</h3>
                    <p className="trek-description">{trek.description}</p>
                    
                    <div className="trek-details">
                      <div className="detail-item">
                        <FaMapMarkerAlt />
                        <span>{trek.region}</span>
                      </div>
                      <div className="detail-item">
                        <FaClock />
                        <span>{trek.duration}</span>
                      </div>
                      <div className="detail-item">
                        <FaMountain />
                        <span>{trek.altitude}m</span>
                      </div>
                      <div className="detail-item">
                        <FaUsers />
                        <span>{trek.groupSize}</span>
                      </div>
                    </div>

                    <div className="trek-actions">
                      <button 
                        className="btn-primary"
                        onClick={() => handleViewDetails(trek)}
                      >
                        <FaEye style={{ marginRight: '0.5rem' }} />
                        View Details
                      </button>
                      <button 
                        className="btn-outline in-wishlist"
                        onClick={() => handleAddToWishlist(trek)}
                      >
                        <FaHeart style={{ marginRight: '0.5rem' }} />
                        Remove from Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : !showResults ? (
          /* Recommendation Form */
          <div className="recommender-form-container">
            <form onSubmit={handleSubmit} className="recommender-form">
              <div className="form-grid">
                {/* Experience Level */}
                <div className="form-group">
                  <label className="form-label">
                    <FaStar className="label-icon" />
                    Trekking Experience
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select your experience level</option>
                    {experienceLevels.map(level => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget */}
                <div className="form-group">
                  <label className="form-label">
                    <FaDollarSign className="label-icon" />
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select your budget</option>
                    {budgetRanges.map(budget => (
                      <option key={budget.value} value={budget.value}>
                        {budget.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Time Available */}
                <div className="form-group">
                  <label className="form-label">
                    <FaClock className="label-icon" />
                    Time Available
                  </label>
                  <select
                    name="timeAvailable"
                    value={formData.timeAvailable}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select available time</option>
                    {timeOptions.map(time => (
                      <option key={time.value} value={time.value}>
                        {time.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Region */}
                <div className="form-group">
                  <label className="form-label">
                    <FaMapMarkerAlt className="label-icon" />
                    Preferred Region
                  </label>
                  <select
                    name="preferredRegion"
                    value={formData.preferredRegion}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Select preferred region (optional)</option>
                    {regions.map(region => (
                      <option key={region.value} value={region.value}>
                        {region.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Group Size */}
                <div className="form-group">
                  <label className="form-label">
                    <FaUsers className="label-icon" />
                    Group Size
                  </label>
                  <select
                    name="groupSize"
                    value={formData.groupSize}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Select group size (optional)</option>
                    <option value="Solo">Solo (1 person)</option>
                    <option value="Small">Small (2-4 people)</option>
                    <option value="Medium">Medium (5-8 people)</option>
                    <option value="Large">Large (9+ people)</option>
                  </select>
                </div>

                {/* Season */}
                <div className="form-group">
                  <label className="form-label">
                    <FaThermometerHalf className="label-icon" />
                    Preferred Season
                  </label>
                  <select
                    name="season"
                    value={formData.season}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Select preferred season (optional)</option>
                    {seasons.map(season => (
                      <option key={season.value} value={season.value}>
                        {season.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Finding Treks...' : 'Get Recommendations'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Results Section */
          <div className="recommendations-container">
            <div className="results-header">
              <h2>Your Personalized Trek Recommendations</h2>
              <p>Based on your preferences, here are the best treks for you:</p>
              <button onClick={resetForm} className="btn-secondary">
                Start Over
              </button>
            </div>

            <div className="recommendations-grid">
              {recommendations.map((trek, index) => (
                <div key={trek.id} className="trek-card">
                  <div className="trek-card-header">
                    <div className="trek-image">
                      <img src={trek.image} alt={trek.name} />
                      <div className="trek-score">
                        <span>{trek.score}%</span>
                        <small>Match</small>
                      </div>
                    </div>
                    <div className="trek-badges">
                      <span 
                        className="badge difficulty"
                        style={{ backgroundColor: getDifficultyColor(trek.difficulty) }}
                      >
                        {trek.difficulty}
                      </span>
                      <span 
                        className="badge budget"
                        style={{ backgroundColor: getBudgetColor(trek.budget) }}
                      >
                        {trek.budget}
                      </span>
                    </div>
                  </div>

                  <div className="trek-card-content">
                    <h3 className="trek-name">{trek.name}</h3>
                    <p className="trek-description">{trek.description}</p>
                    
                    <div className="trek-details">
                      <div className="detail-item">
                        <FaMapMarkerAlt />
                        <span>{trek.region}</span>
                      </div>
                      <div className="detail-item">
                        <FaClock />
                        <span>{trek.duration}</span>
                      </div>
                      <div className="detail-item">
                        <FaMountain />
                        <span>{trek.altitude}m</span>
                      </div>
                      <div className="detail-item">
                        <FaUsers />
                        <span>{trek.groupSize}</span>
                      </div>
                    </div>

                    <div className="trek-highlights">
                      <h4>Highlights:</h4>
                      <ul>
                        {trek.highlights.map((highlight, idx) => (
                          <li key={idx}>{highlight}</li>
                        ))}
                      </ul>
                    </div>

                                         <div className="trek-sustainability">
                       <FaLeaf />
                       <span>Sustainability Score: {trek.sustainabilityScore}/10</span>
                     </div>

                     <div className="trek-accommodation">
                       <h4>Accommodation Options:</h4>
                       <div className="accommodation-options">
                         {trek.accommodation.map((option, idx) => (
                           <div key={idx} className="accommodation-option">
                             <div className="accommodation-type">{option.type}</div>
                             <div className="accommodation-description">{option.description}</div>
                             <div className="accommodation-price">{option.price}</div>
                           </div>
                         ))}
                       </div>
                     </div>

                                         <div className="trek-actions">
                       <button 
                         className="btn-primary"
                         onClick={() => handleViewDetails(trek)}
                       >
                         <FaEye style={{ marginRight: '0.5rem' }} />
                         View Details
                       </button>
                       <button 
                         className={`btn-outline ${isInWishlist(trek.id) ? 'in-wishlist' : ''}`}
                         onClick={() => handleAddToWishlist(trek)}
                       >
                         <FaHeart style={{ marginRight: '0.5rem' }} />
                         {isInWishlist(trek.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                       </button>
                     </div>
                  </div>
                </div>
              ))}
            </div>

            {recommendations.length === 0 && (
              <div className="no-recommendations">
                <h3>No Perfect Matches Found</h3>
                <p>Try adjusting your preferences to find more trek options.</p>
                <button onClick={resetForm} className="btn-primary">
                  Adjust Preferences
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrekRecommender; 