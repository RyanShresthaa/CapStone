import React, { useState } from 'react';
import { 
  FaMapMarkerAlt, 
  FaCloudSun, 
  FaRoute, 
  FaCalendarAlt, 
  FaSearch, 
  FaMountain, 
  FaClock, 
  FaCompass, 
  FaCheckCircle,
  FaStar,
  FaInfoCircle,
  FaExclamationTriangle,
  FaArrowRight,
  FaArrowLeft,
  FaCog,
  FaBookmark,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaThermometerHalf,
  FaTimes,
  FaHotel,
  FaCar,
  FaPlane,
  FaBus,
  FaHiking,
  FaHelicopter
} from 'react-icons/fa';
import MapComponent from './MapComponent';
import WeatherComponent from './WeatherComponent';
import TrekItinerary from './TrekItinerary';
import './TripPlanning.css';

const TripPlanning = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [trekDuration, setTrekDuration] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [startDate, setStartDate] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const [accommodationType, setAccommodationType] = useState('');
  const [budget, setBudget] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState([]);
  const [tripNotes, setTripNotes] = useState('');
  const [emergencyContact, setEmergencyContact] = useState({ name: '', phone: '', email: '' });
  const [validationErrors, setValidationErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const destinations = [
    { 
      id: 1, 
      name: 'Everest Base Camp', 
      difficulty: 'Hard', 
      duration: '12-14 days',
      elevation: '5,364m',
      bestTime: 'Mar-May, Sep-Nov',
      rating: 4.9,
      reviews: 1247,
      price: '$1850-2200',
      highlights: ['Stunning mountain views', 'Sherpa culture', 'Kala Patthar summit'],
      description: 'The ultimate trekking destination offering breathtaking views of the world\'s highest peaks.',
      region: 'Everest Region',
      checkpoints: [
        { 
          name: 'Kathmandu', 
          type: 'transportation', 
          description: 'Starting point', 
          details: 'International airport, visa on arrival, hotel stay',
          elevation: '1,400m',
          duration: '1 day'
        },
        { 
          name: 'Lukla Airport', 
          type: 'transportation', 
          description: 'Gateway to Everest', 
          details: 'Domestic flight (45 min), weather dependent',
          elevation: '2,860m',
          duration: '1 day'
        },
        { 
          name: 'Phakding', 
          type: 'accommodation', 
          description: 'First trekking stop', 
          details: 'Tea house accommodation, acclimatization',
          elevation: '2,610m',
          duration: '1 day'
        },
        { 
          name: 'Namche Bazaar', 
          type: 'accommodation', 
          description: 'Sherpa capital', 
          details: 'Tea houses, ATMs, internet cafes, rest day',
          elevation: '3,440m',
          duration: '2 days'
        },
        { 
          name: 'Tengboche Monastery', 
          type: 'destination', 
          description: 'Famous monastery', 
          details: 'Buddhist monastery, cultural experience',
          elevation: '3,867m',
          duration: '1 day'
        },
        { 
          name: 'Dingboche', 
          type: 'accommodation', 
          description: 'Acclimatization stop', 
          details: 'Tea houses, mountain views, rest day',
          elevation: '4,410m',
          duration: '2 days'
        },
        { 
          name: 'Lobuche', 
          type: 'accommodation', 
          description: 'High altitude stop', 
          details: 'Basic tea houses, cold weather',
          elevation: '4,940m',
          duration: '1 day'
        },
        { 
          name: 'Gorak Shep', 
          type: 'accommodation', 
          description: 'Last stop before EBC', 
          details: 'Basic accommodation, highest tea house',
          elevation: '5,164m',
          duration: '1 day'
        },
        { 
          name: 'Everest Base Camp', 
          type: 'destination', 
          description: 'Final destination', 
          details: 'Tent city, spectacular views, achievement point',
          elevation: '5,364m',
          duration: '1 day'
        },
        { 
          name: 'Kala Patthar', 
          type: 'destination', 
          description: 'Best viewpoint', 
          details: 'Optional climb for best Everest views',
          elevation: '5,545m',
          duration: '1 day'
        }
      ],
      accommodation: [
        { 
          name: 'Hotel Tibet International', 
          type: 'hotel', 
          price: '$80-120/night', 
          location: 'Kathmandu',
          amenities: ['WiFi', 'Restaurant', 'AC', 'Hot Water', 'Airport Transfer'],
          description: '4-star hotel in Thamel area'
        },
        { 
          name: 'Yeti Mountain Home', 
          type: 'lodge', 
          price: '$45-65/night', 
          location: 'Namche Bazaar',
          amenities: ['WiFi', 'Restaurant', 'Heating', 'Mountain Views', 'Hot Shower'],
          description: 'Comfortable lodge with modern amenities'
        },
        { 
          name: 'Tengboche Guest House', 
          type: 'teahouse', 
          price: '$25-35/night', 
          location: 'Tengboche',
          amenities: ['Restaurant', 'Mountain Views', 'Basic Room'],
          description: 'Traditional tea house near monastery'
        },
        { 
          name: 'Dingboche Resort', 
          type: 'lodge', 
          price: '$30-45/night', 
          location: 'Dingboche',
          amenities: ['Restaurant', 'Heating', 'Mountain Views'],
          description: 'Comfortable lodge at high altitude'
        },
        { 
          name: 'Gorak Shep Tea House', 
          type: 'teahouse', 
          price: '$20-30/night', 
          location: 'Gorak Shep',
          amenities: ['Basic Room', 'Restaurant', 'Warm Bedding'],
          description: 'Basic accommodation at highest point'
        }
      ],
      transport: [
        { type: 'Flight', from: 'Kathmandu', to: 'Lukla', duration: '45 min', cost: '$150-200', details: 'Tara Air or Yeti Airlines' },
        { type: 'Trek', from: 'Lukla', to: 'EBC', duration: '12-14 days', cost: 'Included in package', details: 'Guided trek with porter' },
        { type: 'Flight', from: 'Lukla', to: 'Kathmandu', duration: '45 min', cost: '$150-200', details: 'Return flight' }
      ]
    },
    { 
      id: 2, 
      name: 'Annapurna Circuit', 
      difficulty: 'Moderate', 
      duration: '10-12 days',
      elevation: '5,416m',
      bestTime: 'Mar-May, Sep-Nov',
      rating: 4.8,
      reviews: 892,
      price: '$1450-1800',
      highlights: ['Thorong La Pass', 'Diverse landscapes', 'Local villages'],
      description: 'A classic trek around the Annapurna massif with diverse landscapes and cultures.',
      region: 'Annapurna Region',
      checkpoints: [
        { 
          name: 'Kathmandu', 
          type: 'transportation', 
          description: 'Starting point', 
          details: 'International airport, visa on arrival, hotel stay',
          elevation: '1,400m',
          duration: '1 day'
        },
        { 
          name: 'Pokhara', 
          type: 'transportation', 
          description: 'Lakeside city', 
          details: 'Domestic flight or bus, hotel stay',
          elevation: '827m',
          duration: '1 day'
        },
        { 
          name: 'Besisahar', 
          type: 'transportation', 
          description: 'Road head', 
          details: 'Bus from Pokhara, trek starting point',
          elevation: '760m',
          duration: '1 day'
        },
        { 
          name: 'Chame', 
          type: 'accommodation', 
          description: 'District headquarters', 
          details: 'Tea houses, shops, police check post',
          elevation: '2,670m',
          duration: '1 day'
        },
        { 
          name: 'Pisang', 
          type: 'accommodation', 
          description: 'Traditional village', 
          details: 'Tea houses, apple orchards, mountain views',
          elevation: '3,200m',
          duration: '1 day'
        },
        { 
          name: 'Manang', 
          type: 'accommodation', 
          description: 'Acclimatization stop', 
          details: 'Tea houses, medical facilities, rest day',
          elevation: '3,519m',
          duration: '2 days'
        },
        { 
          name: 'Thorong Phedi', 
          type: 'accommodation', 
          description: 'Base of Thorong La', 
          details: 'Basic tea house, last stop before pass',
          elevation: '4,450m',
          duration: '1 day'
        },
        { 
          name: 'Thorong La Pass', 
          type: 'destination', 
          description: 'Highest point', 
          details: '5,416m pass, challenging crossing',
          elevation: '5,416m',
          duration: '1 day'
        },
        { 
          name: 'Muktinath', 
          type: 'destination', 
          description: 'Sacred site', 
          details: 'Temple complex, cultural significance',
          elevation: '3,760m',
          duration: '1 day'
        },
        { 
          name: 'Jomsom', 
          type: 'transportation', 
          description: 'End point', 
          details: 'Airport, return to Pokhara/Kathmandu',
          elevation: '2,720m',
          duration: '1 day'
        }
      ],
      accommodation: [
        { 
          name: 'Hotel Barahi', 
          type: 'hotel', 
          price: '$60-90/night', 
          location: 'Pokhara',
          amenities: ['WiFi', 'Swimming Pool', 'Restaurant', 'Lake View', 'Garden'],
          description: '3-star hotel on Lakeside'
        },
        { 
          name: 'Manang Hotel', 
          type: 'lodge', 
          price: '$35-50/night', 
          location: 'Manang',
          amenities: ['Restaurant', 'Heating', 'Mountain Views', 'Hot Shower'],
          description: 'Comfortable lodge in Manang village'
        },
        { 
          name: 'Pisang Peak Hotel', 
          type: 'teahouse', 
          price: '$25-35/night', 
          location: 'Pisang',
          amenities: ['Restaurant', 'Mountain Views', 'Basic Room'],
          description: 'Traditional tea house with views'
        },
        { 
          name: 'Thorong Phedi Lodge', 
          type: 'teahouse', 
          price: '$20-30/night', 
          location: 'Thorong Phedi',
          amenities: ['Basic Room', 'Restaurant', 'Warm Bedding'],
          description: 'Basic accommodation before pass'
        },
        { 
          name: 'Muktinath Guest House', 
          type: 'teahouse', 
          price: '$30-40/night', 
          location: 'Muktinath',
          amenities: ['Restaurant', 'Temple Views', 'Hot Shower'],
          description: 'Guest house near temple complex'
        }
      ],
      transport: [
        { type: 'Flight', from: 'Kathmandu', to: 'Pokhara', duration: '25 min', cost: '$80-120', details: 'Buddha Air or Yeti Airlines' },
        { type: 'Bus', from: 'Pokhara', to: 'Besisahar', duration: '2 hours', cost: '$15-25', details: 'Local bus or private jeep' },
        { type: 'Trek', from: 'Besisahar', to: 'Jomsom', duration: '10-12 days', cost: 'Included in package', details: 'Guided trek with porter' },
        { type: 'Flight', from: 'Jomsom', to: 'Pokhara', duration: '20 min', cost: '$80-120', details: 'Return flight' }
      ]
    },
    { 
      id: 3, 
      name: 'Langtang Valley', 
      difficulty: 'Easy', 
      duration: '7-9 days',
      elevation: '3,430m',
      bestTime: 'Mar-May, Sep-Nov',
      rating: 4.7,
      reviews: 456,
      price: '$950-1200',
      highlights: ['Tamang culture', 'Cheese factory', 'Mountain views'],
      description: 'A beautiful valley trek with rich cultural experiences and stunning scenery.',
      region: 'Langtang Region',
      checkpoints: [
        { 
          name: 'Kathmandu', 
          type: 'transportation', 
          description: 'Starting point', 
          details: 'International airport, visa on arrival',
          elevation: '1,400m',
          duration: '1 day'
        },
        { 
          name: 'Dhunche', 
          type: 'transportation', 
          description: 'Gateway to Langtang', 
          details: 'Bus from Kathmandu, permit office',
          elevation: '1,950m',
          duration: '1 day'
        },
        { 
          name: 'Syabrubesi', 
          type: 'accommodation', 
          description: 'Trek starting point', 
          details: 'Tea houses, shops, last road access',
          elevation: '1,460m',
          duration: '1 day'
        },
        { 
          name: 'Lama Hotel', 
          type: 'accommodation', 
          description: 'Forest lodge', 
          details: 'Tea house in rhododendron forest',
          elevation: '2,470m',
          duration: '1 day'
        },
        { 
          name: 'Langtang Village', 
          type: 'accommodation', 
          description: 'Traditional Tamang village', 
          details: 'Tea houses, local culture, mountain views',
          elevation: '3,430m',
          duration: '1 day'
        },
        { 
          name: 'Kyanjin Gompa', 
          type: 'destination', 
          description: 'Buddhist monastery', 
          details: 'Monastery, cheese factory, stunning views',
          elevation: '3,870m',
          duration: '2 days'
        },
        { 
          name: 'Kyanjin Ri', 
          type: 'destination', 
          description: 'Viewpoint', 
          details: 'Optional climb for panoramic views',
          elevation: '4,773m',
          duration: '1 day'
        }
      ],
      accommodation: [
        { 
          name: 'Hotel Yak & Yeti', 
          type: 'hotel', 
          price: '$70-100/night', 
          location: 'Kathmandu',
          amenities: ['WiFi', 'Restaurant', 'AC', 'Hot Water', 'Garden'],
          description: '4-star hotel in central Kathmandu'
        },
        { 
          name: 'Langtang Village Lodge', 
          type: 'teahouse', 
          price: '$20-30/night', 
          location: 'Langtang Village',
          amenities: ['Restaurant', 'Mountain Views', 'Basic Room'],
          description: 'Traditional tea house in village'
        },
        { 
          name: 'Kyanjin Gompa Guest House', 
          type: 'teahouse', 
          price: '$25-35/night', 
          location: 'Kyanjin Gompa',
          amenities: ['Restaurant', 'Monastery Views', 'Hot Shower'],
          description: 'Guest house near monastery'
        },
        { 
          name: 'Lama Hotel', 
          type: 'teahouse', 
          price: '$18-25/night', 
          location: 'Lama Hotel',
          amenities: ['Restaurant', 'Forest Setting', 'Basic Room'],
          description: 'Simple lodge in forest area'
        }
      ],
      transport: [
        { type: 'Bus', from: 'Kathmandu', to: 'Dhunche', duration: '6-7 hours', cost: '$20-30', details: 'Local bus or private jeep' },
        { type: 'Trek', from: 'Dhunche', to: 'Kyanjin Gompa', duration: '7-9 days', cost: 'Included in package', details: 'Guided trek with porter' },
        { type: 'Bus', from: 'Dhunche', to: 'Kathmandu', duration: '6-7 hours', cost: '$20-30', details: 'Return journey' }
      ]
    },
    { 
      id: 4, 
      name: 'Manaslu Circuit', 
      difficulty: 'Hard', 
      duration: '14-16 days',
      elevation: '5,106m',
      bestTime: 'Mar-May, Sep-Nov',
      rating: 4.8,
      reviews: 234,
      price: '$1650-2000',
      highlights: ['Larkya La Pass', 'Remote villages', 'Untouched beauty'],
      description: 'A challenging trek around the eighth highest mountain in the world.',
      region: 'Manaslu Region',
      checkpoints: [
        { name: 'Kathmandu', type: 'transportation', description: 'Starting point', details: 'International airport', elevation: '1,400m', duration: '1 day' },
        { name: 'Soti Khola', type: 'transportation', description: 'Road head', details: 'Bus from Kathmandu', elevation: '700m', duration: '1 day' },
        { name: 'Machha Khola', type: 'accommodation', description: 'First stop', details: 'Tea house accommodation', elevation: '930m', duration: '1 day' },
        { name: 'Jagat', type: 'accommodation', description: 'Village stop', details: 'Tea houses, permit check', elevation: '1,340m', duration: '1 day' },
        { name: 'Deng', type: 'accommodation', description: 'Mountain village', details: 'Tea houses, mountain views', elevation: '1,804m', duration: '1 day' },
        { name: 'Namrung', type: 'accommodation', description: 'Cultural village', details: 'Tea houses, local culture', elevation: '2,630m', duration: '1 day' },
        { name: 'Sama Gaon', type: 'accommodation', description: 'Acclimatization', details: 'Tea houses, rest day', elevation: '3,530m', duration: '2 days' },
        { name: 'Samdo', type: 'accommodation', description: 'High altitude', details: 'Tea houses, cold weather', elevation: '3,875m', duration: '1 day' },
        { name: 'Larkya Phedi', type: 'accommodation', description: 'Base of pass', details: 'Basic tea house', elevation: '4,460m', duration: '1 day' },
        { name: 'Larkya La Pass', type: 'destination', description: 'Highest point', details: '5,106m pass crossing', elevation: '5,106m', duration: '1 day' },
        { name: 'Bimthang', type: 'accommodation', description: 'After pass', details: 'Tea houses, mountain views', elevation: '3,720m', duration: '1 day' },
        { name: 'Dharapani', type: 'transportation', description: 'End point', details: 'Road access, return to Kathmandu', elevation: '1,860m', duration: '1 day' }
      ],
      accommodation: [
        { name: 'Hotel Manaslu', type: 'hotel', price: '$60-90/night', location: 'Kathmandu', amenities: ['WiFi', 'Restaurant', 'AC', 'Hot Water'], description: '3-star hotel' },
        { name: 'Sama Gaon Lodge', type: 'teahouse', price: '$25-35/night', location: 'Sama Gaon', amenities: ['Restaurant', 'Mountain Views', 'Basic Room'], description: 'Traditional tea house' },
        { name: 'Samdo Guest House', type: 'teahouse', price: '$20-30/night', location: 'Samdo', amenities: ['Restaurant', 'Basic Room'], description: 'Simple accommodation' }
      ],
      transport: [
        { type: 'Bus', from: 'Kathmandu', to: 'Soti Khola', duration: '8-9 hours', cost: '$25-35', details: 'Local bus or private jeep' },
        { type: 'Trek', from: 'Soti Khola', to: 'Dharapani', duration: '14-16 days', cost: 'Included in package', details: 'Guided trek with porter' },
        { type: 'Bus', from: 'Dharapani', to: 'Kathmandu', duration: '8-9 hours', cost: '$25-35', details: 'Return journey' }
      ]
    },
    { 
      id: 5, 
      name: 'Upper Mustang', 
      difficulty: 'Moderate', 
      duration: '10-12 days',
      elevation: '3,800m',
      bestTime: 'Mar-May, Sep-Nov',
      rating: 4.7,
      reviews: 189,
      price: '$2200-2800',
      highlights: ['Lo Manthang', 'Tibetan culture', 'Desert landscape'],
      description: 'A unique trek to the forbidden kingdom with Tibetan culture and desert landscapes.',
      region: 'Mustang Region',
      checkpoints: [
        { name: 'Kathmandu', type: 'transportation', description: 'Starting point', details: 'International airport', elevation: '1,400m', duration: '1 day' },
        { name: 'Pokhara', type: 'transportation', description: 'Lakeside city', details: 'Domestic flight or bus', elevation: '827m', duration: '1 day' },
        { name: 'Jomsom', type: 'transportation', description: 'Gateway to Mustang', details: 'Flight from Pokhara', elevation: '2,720m', duration: '1 day' },
        { name: 'Kagbeni', type: 'accommodation', description: 'Border village', details: 'Tea houses, permit check', elevation: '2,810m', duration: '1 day' },
        { name: 'Chele', type: 'accommodation', description: 'Mountain village', details: 'Tea houses, mountain views', elevation: '3,050m', duration: '1 day' },
        { name: 'Geling', type: 'accommodation', description: 'Traditional village', details: 'Tea houses, local culture', elevation: '3,570m', duration: '1 day' },
        { name: 'Charang', type: 'accommodation', description: 'Cultural village', details: 'Tea houses, monastery', elevation: '3,560m', duration: '1 day' },
        { name: 'Lo Manthang', type: 'destination', description: 'Forbidden city', details: 'Ancient walled city, palace', elevation: '3,800m', duration: '2 days' },
        { name: 'Ghami', type: 'accommodation', description: 'Return stop', details: 'Tea houses, mountain views', elevation: '3,520m', duration: '1 day' },
        { name: 'Jomsom', type: 'transportation', description: 'End point', details: 'Flight to Pokhara/Kathmandu', elevation: '2,720m', duration: '1 day' }
      ],
      accommodation: [
        { name: 'Hotel Barahi', type: 'hotel', price: '$60-90/night', location: 'Pokhara', amenities: ['WiFi', 'Swimming Pool', 'Restaurant', 'Lake View'], description: '3-star hotel on Lakeside' },
        { name: 'Lo Manthang Guest House', type: 'teahouse', price: '$40-60/night', location: 'Lo Manthang', amenities: ['Restaurant', 'Palace Views', 'Hot Shower'], description: 'Guest house in walled city' },
        { name: 'Kagbeni Lodge', type: 'teahouse', price: '$30-45/night', location: 'Kagbeni', amenities: ['Restaurant', 'Mountain Views', 'Basic Room'], description: 'Traditional lodge' }
      ],
      transport: [
        { type: 'Flight', from: 'Kathmandu', to: 'Pokhara', duration: '25 min', cost: '$80-120', details: 'Buddha Air or Yeti Airlines' },
        { type: 'Flight', from: 'Pokhara', to: 'Jomsom', duration: '20 min', cost: '$80-120', details: 'Tara Air' },
        { type: 'Trek', from: 'Jomsom', to: 'Lo Manthang', duration: '10-12 days', cost: 'Included in package', details: 'Guided trek with porter' },
        { type: 'Flight', from: 'Jomsom', to: 'Pokhara', duration: '20 min', cost: '$80-120', details: 'Return flight' }
      ]
    },
    { 
      id: 6, 
      name: 'Gokyo Lakes', 
      difficulty: 'Hard', 
      duration: '12-14 days',
      elevation: '5,357m',
      bestTime: 'Mar-May, Sep-Nov',
      rating: 4.9,
      reviews: 312,
      price: '$1850-2200',
      highlights: ['Gokyo Lakes', 'Gokyo Ri', 'Cho La Pass'],
      description: 'A stunning trek to the sacred Gokyo Lakes with spectacular mountain views.',
      region: 'Everest Region',
      checkpoints: [
        { name: 'Kathmandu', type: 'transportation', description: 'Starting point', details: 'International airport', elevation: '1,400m', duration: '1 day' },
        { name: 'Lukla', type: 'transportation', description: 'Gateway to Everest', details: 'Flight from Kathmandu', elevation: '2,860m', duration: '1 day' },
        { name: 'Namche Bazaar', type: 'accommodation', description: 'Sherpa capital', details: 'Tea houses, acclimatization', elevation: '3,440m', duration: '2 days' },
        { name: 'Dole', type: 'accommodation', description: 'Mountain village', details: 'Tea houses, mountain views', elevation: '4,110m', duration: '1 day' },
        { name: 'Machhermo', type: 'accommodation', description: 'High altitude', details: 'Tea houses, cold weather', elevation: '4,470m', duration: '1 day' },
        { name: 'Gokyo', type: 'destination', description: 'Sacred lakes', details: 'Tea houses, lake views', elevation: '4,790m', duration: '2 days' },
        { name: 'Gokyo Ri', type: 'destination', description: 'Viewpoint', details: 'Optional climb for views', elevation: '5,357m', duration: '1 day' },
        { name: 'Cho La Pass', type: 'destination', description: 'High pass', details: 'Optional crossing to EBC', elevation: '5,420m', duration: '1 day' }
      ],
      accommodation: [
        { name: 'Hotel Tibet International', type: 'hotel', price: '$80-120/night', location: 'Kathmandu', amenities: ['WiFi', 'Restaurant', 'AC', 'Hot Water'], description: '4-star hotel in Thamel' },
        { name: 'Gokyo Resort', type: 'teahouse', price: '$35-50/night', location: 'Gokyo', amenities: ['Restaurant', 'Lake Views', 'Hot Shower'], description: 'Lodge by the lakes' },
        { name: 'Namche Lodge', type: 'teahouse', price: '$40-60/night', location: 'Namche Bazaar', amenities: ['WiFi', 'Restaurant', 'Heating'], description: 'Comfortable lodge' }
      ],
      transport: [
        { type: 'Flight', from: 'Kathmandu', to: 'Lukla', duration: '45 min', cost: '$150-200', details: 'Tara Air or Yeti Airlines' },
        { type: 'Trek', from: 'Lukla', to: 'Gokyo', duration: '12-14 days', cost: 'Included in package', details: 'Guided trek with porter' },
        { type: 'Flight', from: 'Lukla', to: 'Kathmandu', duration: '45 min', cost: '$150-200', details: 'Return flight' }
      ]
    },
    { 
      id: 7, 
      name: 'Poon Hill', 
      difficulty: 'Easy', 
      duration: '4-5 days',
      elevation: '3,210m',
      bestTime: 'Mar-May, Sep-Nov',
      rating: 4.6,
      reviews: 567,
      price: '$650-850',
      highlights: ['Poon Hill sunrise', 'Rhododendron forest', 'Mountain views'],
      description: 'A short and scenic trek perfect for beginners with stunning sunrise views.',
      region: 'Annapurna Region',
      checkpoints: [
        { name: 'Kathmandu', type: 'transportation', description: 'Starting point', details: 'International airport', elevation: '1,400m', duration: '1 day' },
        { name: 'Pokhara', type: 'transportation', description: 'Lakeside city', details: 'Domestic flight or bus', elevation: '827m', duration: '1 day' },
        { name: 'Nayapul', type: 'transportation', description: 'Road head', details: 'Bus from Pokhara', elevation: '1,070m', duration: '1 day' },
        { name: 'Tikhedhunga', type: 'accommodation', description: 'First stop', details: 'Tea houses, mountain views', elevation: '1,577m', duration: '1 day' },
        { name: 'Ghorepani', type: 'accommodation', description: 'Main village', details: 'Tea houses, rhododendron forest', elevation: '2,874m', duration: '1 day' },
        { name: 'Poon Hill', type: 'destination', description: 'Sunrise point', details: 'Early morning climb for views', elevation: '3,210m', duration: '1 day' },
        { name: 'Ghandruk', type: 'accommodation', description: 'Gurung village', details: 'Tea houses, local culture', elevation: '1,940m', duration: '1 day' },
        { name: 'Nayapul', type: 'transportation', description: 'End point', details: 'Return to Pokhara', elevation: '1,070m', duration: '1 day' }
      ],
      accommodation: [
        { name: 'Hotel Barahi', type: 'hotel', price: '$60-90/night', location: 'Pokhara', amenities: ['WiFi', 'Swimming Pool', 'Restaurant', 'Lake View'], description: '3-star hotel on Lakeside' },
        { name: 'Ghorepani Lodge', type: 'teahouse', price: '$25-35/night', location: 'Ghorepani', amenities: ['Restaurant', 'Mountain Views', 'Basic Room'], description: 'Traditional tea house' },
        { name: 'Ghandruk Guest House', type: 'teahouse', price: '$20-30/night', location: 'Ghandruk', amenities: ['Restaurant', 'Village Views', 'Basic Room'], description: 'Local guest house' }
      ],
      transport: [
        { type: 'Flight', from: 'Kathmandu', to: 'Pokhara', duration: '25 min', cost: '$80-120', details: 'Buddha Air or Yeti Airlines' },
        { type: 'Bus', from: 'Pokhara', to: 'Nayapul', duration: '1.5 hours', cost: '$10-15', details: 'Local bus or taxi' },
        { type: 'Trek', from: 'Nayapul', to: 'Poon Hill', duration: '4-5 days', cost: 'Included in package', details: 'Guided trek with porter' },
        { type: 'Bus', from: 'Nayapul', to: 'Pokhara', duration: '1.5 hours', cost: '$10-15', details: 'Return journey' }
      ]
    },
    { 
      id: 8, 
      name: 'Mardi Himal', 
      difficulty: 'Moderate', 
      duration: '6-8 days',
      elevation: '4,500m',
      bestTime: 'Mar-May, Sep-Nov',
      rating: 4.7,
      reviews: 234,
      price: '$950-1200',
      highlights: ['Mardi Himal Base Camp', 'Annapurna views', 'Less crowded'],
      description: 'A hidden gem offering spectacular views of the Annapurna range.',
      region: 'Annapurna Region',
      checkpoints: [
        { name: 'Kathmandu', type: 'transportation', description: 'Starting point', details: 'International airport', elevation: '1,400m', duration: '1 day' },
        { name: 'Pokhara', type: 'transportation', description: 'Lakeside city', details: 'Domestic flight or bus', elevation: '827m', duration: '1 day' },
        { name: 'Kande', type: 'transportation', description: 'Road head', details: 'Bus from Pokhara', elevation: '1,770m', duration: '1 day' },
        { name: 'Forest Camp', type: 'accommodation', description: 'Forest lodge', details: 'Tea houses in forest', elevation: '2,600m', duration: '1 day' },
        { name: 'Low Camp', type: 'accommodation', description: 'Mountain camp', details: 'Tea houses, mountain views', elevation: '3,150m', duration: '1 day' },
        { name: 'High Camp', type: 'accommodation', description: 'High altitude', details: 'Tea houses, cold weather', elevation: '3,580m', duration: '1 day' },
        { name: 'Mardi Himal Base Camp', type: 'destination', description: 'Base camp', details: 'Spectacular mountain views', elevation: '4,500m', duration: '1 day' }
      ],
      accommodation: [
        { name: 'Hotel Barahi', type: 'hotel', price: '$60-90/night', location: 'Pokhara', amenities: ['WiFi', 'Swimming Pool', 'Restaurant', 'Lake View'], description: '3-star hotel on Lakeside' },
        { name: 'High Camp Lodge', type: 'teahouse', price: '$30-45/night', location: 'High Camp', amenities: ['Restaurant', 'Mountain Views', 'Basic Room'], description: 'High altitude lodge' },
        { name: 'Forest Camp Lodge', type: 'teahouse', price: '$25-35/night', location: 'Forest Camp', amenities: ['Restaurant', 'Forest Setting', 'Basic Room'], description: 'Forest lodge' }
      ],
      transport: [
        { type: 'Flight', from: 'Kathmandu', to: 'Pokhara', duration: '25 min', cost: '$80-120', details: 'Buddha Air or Yeti Airlines' },
        { type: 'Bus', from: 'Pokhara', to: 'Kande', duration: '1 hour', cost: '$8-12', details: 'Local bus or taxi' },
        { type: 'Trek', from: 'Kande', to: 'Mardi Himal', duration: '6-8 days', cost: 'Included in package', details: 'Guided trek with porter' },
        { type: 'Bus', from: 'Kande', to: 'Pokhara', duration: '1 hour', cost: '$8-12', details: 'Return journey' }
      ]
    },
    { 
      id: 9, 
      name: 'Khopra Ridge', 
      difficulty: 'Moderate', 
      duration: '7-9 days',
      elevation: '3,660m',
      bestTime: 'Mar-May, Sep-Nov',
      rating: 4.5,
      reviews: 156,
      price: '$1100-1400',
      highlights: ['Khopra Ridge', 'Community lodges', 'Panoramic views'],
      description: 'A community-based trek offering stunning views and local experiences.',
      region: 'Annapurna Region',
      checkpoints: [
        { name: 'Kathmandu', type: 'transportation', description: 'Starting point', details: 'International airport', elevation: '1,400m', duration: '1 day' },
        { name: 'Pokhara', type: 'transportation', description: 'Lakeside city', details: 'Domestic flight or bus', elevation: '827m', duration: '1 day' },
        { name: 'Nayapul', type: 'transportation', description: 'Road head', details: 'Bus from Pokhara', elevation: '1,070m', duration: '1 day' },
        { name: 'Ghandruk', type: 'accommodation', description: 'Gurung village', details: 'Tea houses, local culture', elevation: '1,940m', duration: '1 day' },
        { name: 'Tadapani', type: 'accommodation', description: 'Mountain village', details: 'Tea houses, mountain views', elevation: '2,630m', duration: '1 day' },
        { name: 'Bayeli Kharka', type: 'accommodation', description: 'Pasture land', details: 'Tea houses, grazing area', elevation: '3,420m', duration: '1 day' },
        { name: 'Khopra Ridge', type: 'destination', description: 'Ridge walk', details: 'Community lodge, panoramic views', elevation: '3,660m', duration: '2 days' }
      ],
      accommodation: [
        { name: 'Hotel Barahi', type: 'hotel', price: '$60-90/night', location: 'Pokhara', amenities: ['WiFi', 'Swimming Pool', 'Restaurant', 'Lake View'], description: '3-star hotel on Lakeside' },
        { name: 'Khopra Community Lodge', type: 'teahouse', price: '$35-50/night', location: 'Khopra Ridge', amenities: ['Restaurant', 'Ridge Views', 'Hot Shower'], description: 'Community-run lodge' },
        { name: 'Ghandruk Guest House', type: 'teahouse', price: '$20-30/night', location: 'Ghandruk', amenities: ['Restaurant', 'Village Views', 'Basic Room'], description: 'Local guest house' }
      ],
      transport: [
        { type: 'Flight', from: 'Kathmandu', to: 'Pokhara', duration: '25 min', cost: '$80-120', details: 'Buddha Air or Yeti Airlines' },
        { type: 'Bus', from: 'Pokhara', to: 'Nayapul', duration: '1.5 hours', cost: '$10-15', details: 'Local bus or taxi' },
        { type: 'Trek', from: 'Nayapul', to: 'Khopra Ridge', duration: '7-9 days', cost: 'Included in package', details: 'Guided trek with porter' },
        { type: 'Bus', from: 'Nayapul', to: 'Pokhara', duration: '1.5 hours', cost: '$10-15', details: 'Return journey' }
      ]
    },
    { 
      id: 10, 
      name: 'Tsum Valley', 
      difficulty: 'Hard', 
      duration: '15-18 days',
      elevation: '3,700m',
      bestTime: 'Mar-May, Sep-Nov',
      rating: 4.6,
      reviews: 89,
      price: '$2200-2800',
      highlights: ['Hidden valley', 'Tibetan culture', 'Ancient monasteries'],
      description: 'A remote valley trek with rich Tibetan culture and ancient monasteries.',
      region: 'Manaslu Region',
      checkpoints: [
        { name: 'Kathmandu', type: 'transportation', description: 'Starting point', details: 'International airport', elevation: '1,400m', duration: '1 day' },
        { name: 'Soti Khola', type: 'transportation', description: 'Road head', details: 'Bus from Kathmandu', elevation: '700m', duration: '1 day' },
        { name: 'Philim', type: 'accommodation', description: 'Village stop', details: 'Tea houses, permit check', elevation: '1,570m', duration: '1 day' },
        { name: 'Chumling', type: 'accommodation', description: 'Tsum entrance', details: 'Tea houses, valley entrance', elevation: '2,386m', duration: '1 day' },
        { name: 'Chhokangparo', type: 'accommodation', description: 'Upper Tsum', details: 'Tea houses, mountain views', elevation: '3,010m', duration: '1 day' },
        { name: 'Nile', type: 'accommodation', description: 'Upper village', details: 'Tea houses, local culture', elevation: '3,361m', duration: '1 day' },
        { name: 'Mu Gompa', type: 'destination', description: 'Ancient monastery', details: 'Oldest monastery in Tsum', elevation: '3,700m', duration: '2 days' },
        { name: 'Rachen Gompa', type: 'destination', description: 'Nunnery', details: 'Buddhist nunnery', elevation: '3,240m', duration: '1 day' }
      ],
      accommodation: [
        { name: 'Hotel Manaslu', type: 'hotel', price: '$60-90/night', location: 'Kathmandu', amenities: ['WiFi', 'Restaurant', 'AC', 'Hot Water'], description: '3-star hotel' },
        { name: 'Tsum Valley Lodge', type: 'teahouse', price: '$25-35/night', location: 'Chhokangparo', amenities: ['Restaurant', 'Valley Views', 'Basic Room'], description: 'Traditional lodge' },
        { name: 'Mu Gompa Guest House', type: 'teahouse', price: '$20-30/night', location: 'Mu Gompa', amenities: ['Restaurant', 'Monastery Views', 'Basic Room'], description: 'Simple accommodation' }
      ],
      transport: [
        { type: 'Bus', from: 'Kathmandu', to: 'Soti Khola', duration: '8-9 hours', cost: '$25-35', details: 'Local bus or private jeep' },
        { type: 'Trek', from: 'Soti Khola', to: 'Tsum Valley', duration: '15-18 days', cost: 'Included in package', details: 'Guided trek with porter' },
        { type: 'Bus', from: 'Soti Khola', to: 'Kathmandu', duration: '8-9 hours', cost: '$25-35', details: 'Return journey' }
      ]
    }
  ];

  const accommodationOptions = [
    { id: 'tea-houses', name: 'Tea Houses', description: 'Traditional mountain lodges', price: 'Budget-friendly' },
    { id: 'guest-houses', name: 'Guest Houses', description: 'Comfortable local accommodations', price: 'Mid-range' },
    { id: 'luxury-lodges', name: 'Luxury Lodges', description: 'Premium mountain accommodations', price: 'High-end' },
    { id: 'camping', name: 'Camping', description: 'Wilderness camping experience', price: 'Adventure-focused' }
  ];

  const budgetRanges = [
    { id: 'budget', name: 'Budget', range: '$500-800', description: 'Basic accommodations and meals' },
    { id: 'mid-range', name: 'Mid-Range', range: '$800-1500', description: 'Comfortable accommodations and good meals' },
    { id: 'luxury', name: 'Luxury', range: '$1500-3000', description: 'Premium accommodations and services' }
  ];

  const requirementOptions = [
    { id: 'vegetarian', name: 'Vegetarian Meals', icon: '🥗' },
    { id: 'vegan', name: 'Vegan Meals', icon: '🌱' },
    { id: 'gluten-free', name: 'Gluten-Free', icon: '🌾' },
    { id: 'medical', name: 'Medical Support', icon: '🏥' },
    { id: 'photography', name: 'Photography Guide', icon: '📸' },
    { id: 'cultural', name: 'Cultural Guide', icon: '🏛️' }
  ];

  const locationMap = {
    'Everest Base Camp': {
      center: [28.0026, 86.8527],
      city: 'Namche Bazaar',
      coordinates: { lat: 28.0026, lng: 86.8527 },
      markers: [
        { position: [28.0026, 86.8527], name: 'Everest Base Camp', description: 'Base camp for Mount Everest' },
        { position: [27.8056, 86.7133], name: 'Namche Bazaar', description: 'Gateway to Everest region' }
      ]
    },
    'Annapurna Circuit': {
      center: [28.5969, 83.9294],
      city: 'Pokhara',
      coordinates: { lat: 28.5969, lng: 83.9294 },
      markers: [
        { position: [28.5969, 83.9294], name: 'Annapurna Base Camp', description: 'Base camp for Annapurna' },
        { position: [28.2096, 83.9856], name: 'Pokhara', description: 'Starting point for Annapurna treks' }
      ]
    },
    'Langtang Valley': {
      center: [28.2278, 85.5178],
      city: 'Dhunche',
      coordinates: { lat: 28.2278, lng: 85.5178 },
      markers: [
        { position: [28.2278, 85.5178], name: 'Langtang Valley', description: 'Beautiful valley trek' },
        { position: [28.1956, 85.5178], name: 'Dhunche', description: 'Gateway to Langtang region' }
      ]
    },
    'Manaslu Circuit': {
      center: [28.5497, 84.5614],
      city: 'Soti Khola',
      coordinates: { lat: 28.5497, lng: 84.5614 },
      markers: [
        { position: [28.5497, 84.5614], name: 'Manaslu Circuit', description: 'Circuit around Manaslu' },
        { position: [28.1956, 84.5614], name: 'Soti Khola', description: 'Starting point for Manaslu trek' }
      ]
    },
    'Upper Mustang': {
      center: [29.1956, 83.9856],
      city: 'Jomsom',
      coordinates: { lat: 29.1956, lng: 83.9856 },
      markers: [
        { position: [29.1956, 83.9856], name: 'Upper Mustang', description: 'Forbidden kingdom' },
        { position: [28.7833, 83.7333], name: 'Jomsom', description: 'Gateway to Mustang' }
      ]
    },
    'Gokyo Lakes': {
      center: [27.9833, 86.6833],
      city: 'Namche Bazaar',
      coordinates: { lat: 27.9833, lng: 86.6833 },
      markers: [
        { position: [27.9833, 86.6833], name: 'Gokyo Lakes', description: 'Sacred lakes trek' },
        { position: [27.8056, 86.7133], name: 'Namche Bazaar', description: 'Starting point for Gokyo' }
      ]
    },
    'Poon Hill': {
      center: [28.4000, 83.7000],
      city: 'Pokhara',
      coordinates: { lat: 28.4000, lng: 83.7000 },
      markers: [
        { position: [28.4000, 83.7000], name: 'Poon Hill', description: 'Sunrise viewpoint' },
        { position: [28.2096, 83.9856], name: 'Pokhara', description: 'Starting point for Poon Hill' }
      ]
    },
    'Mardi Himal': {
      center: [28.5000, 83.8000],
      city: 'Pokhara',
      coordinates: { lat: 28.5000, lng: 83.8000 },
      markers: [
        { position: [28.5000, 83.8000], name: 'Mardi Himal', description: 'Hidden gem trek' },
        { position: [28.2096, 83.9856], name: 'Pokhara', description: 'Starting point for Mardi Himal' }
      ]
    },
    'Khopra Ridge': {
      center: [28.3500, 83.7500],
      city: 'Pokhara',
      coordinates: { lat: 28.3500, lng: 83.7500 },
      markers: [
        { position: [28.3500, 83.7500], name: 'Khopra Ridge', description: 'Community-based trek' },
        { position: [28.2096, 83.9856], name: 'Pokhara', description: 'Starting point for Khopra Ridge' }
      ]
    },
    'Tsum Valley': {
      center: [28.6000, 84.7000],
      city: 'Soti Khola',
      coordinates: { lat: 28.6000, lng: 84.7000 },
      markers: [
        { position: [28.6000, 84.7000], name: 'Tsum Valley', description: 'Hidden valley trek' },
        { position: [28.1956, 84.5614], name: 'Soti Khola', description: 'Starting point for Tsum Valley' }
      ]
    }
  };

  const validateStep = () => {
    const errors = {};
    
    // Only validate fields for the current step
    switch (currentStep) {
      case 1:
        if (!selectedDestination) errors.destination = 'Please select a destination';
        break;
      case 2:
        if (!startDate) errors.startDate = 'Please select a start date';
        if (!trekDuration) errors.trekDuration = 'Please select trek duration';
        if (!difficultyLevel) errors.difficultyLevel = 'Please select difficulty level';
        if (!groupSize) errors.groupSize = 'Please select group size';
        break;
      case 3:
        if (!accommodationType) errors.accommodationType = 'Please select accommodation type';
        if (!budget) errors.budget = 'Please select budget range';
        break;
      case 4:
        // No validation needed for review step
        break;
      default:
        break;
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDestinationSelect = (destinationName) => {
    setSelectedDestination(destinationName);
    setSelectedLocation(locationMap[destinationName]);
    setValidationErrors({});
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredDestinations([]);
      setShowSearchResults(false);
      return;
    }

    const filtered = destinations.filter(destination => 
      destination.name.toLowerCase().includes(query.toLowerCase()) ||
      destination.region.toLowerCase().includes(query.toLowerCase()) ||
      destination.difficulty.toLowerCase().includes(query.toLowerCase()) ||
      destination.highlights.some(highlight => 
        highlight.toLowerCase().includes(query.toLowerCase())
      ) ||
      destination.description.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredDestinations(filtered);
    setShowSearchResults(true);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredDestinations([]);
    setShowSearchResults(false);
  };

  const handlePlanTrip = () => {
    if (validateStep()) {
      setShowResults(true);
      setCurrentStep(5);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedDestination('');
    setTrekDuration('');
    setDifficultyLevel('');
    setGroupSize('');
    setStartDate('');
    setSelectedLocation(null);
    setShowResults(false);
    setAccommodationType('');
    setBudget('');
    setSpecialRequirements([]);
    setTripNotes('');
    setEmergencyContact({ name: '', phone: '', email: '' });
    setValidationErrors({});
  };

  const toggleRequirement = (requirementId) => {
    setSpecialRequirements(prev => 
      prev.includes(requirementId)
        ? prev.filter(id => id !== requirementId)
        : [...prev, requirementId]
    );
  };

  // Function to dynamically modify trek plan based on difficulty and budget
  const getDynamicTrekPlan = (baseTrek, difficulty, budget) => {
    if (!baseTrek) return null;
    
    const trek = { ...baseTrek };
    
    // Clone checkpoints to avoid mutating original data
    trek.checkpoints = [...baseTrek.checkpoints];
    
    // Modify based on difficulty level
    if (difficulty === 'Easy') {
      // Easy: More days, easier paths, more rest days
      trek.duration = trek.duration.replace(/\d+-\d+/, (match) => {
        const [min, max] = match.split('-').map(Number);
        return `${min + 2}-${max + 3}`;
      });
      
      // Add more rest days and easier checkpoints
      trek.checkpoints = trek.checkpoints.map((checkpoint, index) => {
        const newCheckpoint = { ...checkpoint };
        
        // Add rest days for acclimatization
        if (checkpoint.type === 'accommodation' && checkpoint.elevation && 
            parseInt(checkpoint.elevation.replace(/\D/g, '')) > 3000) {
          newCheckpoint.duration = '2 days';
          newCheckpoint.details = checkpoint.details + ' (Extended rest for acclimatization)';
        }
        
        // Modify descriptions for easier routes
        if (checkpoint.description.includes('challenging') || checkpoint.description.includes('difficult')) {
          newCheckpoint.description = checkpoint.description.replace('challenging', 'moderate');
          newCheckpoint.description = checkpoint.description.replace('difficult', 'manageable');
        }
        
        return newCheckpoint;
      });
      
      // Add additional rest stops for easy treks
      if (trek.name === 'Everest Base Camp') {
        const namcheIndex = trek.checkpoints.findIndex(cp => cp.name === 'Namche Bazaar');
        if (namcheIndex !== -1) {
          trek.checkpoints.splice(namcheIndex + 1, 0, {
            name: 'Khumjung',
            type: 'accommodation',
            description: 'Rest day village',
            details: 'Easy day hike, cultural experience, extra acclimatization',
            elevation: '3,780m',
            duration: '1 day'
          });
        }
      }
      
    } else if (difficulty === 'Hard') {
      // Hard: Fewer days, more challenging routes
      trek.duration = trek.duration.replace(/\d+-\d+/, (match) => {
        const [min, max] = match.split('-').map(Number);
        return `${Math.max(min - 2, 1)}-${max - 1}`;
      });
      
      // Reduce rest days and make routes more challenging
      trek.checkpoints = trek.checkpoints.map((checkpoint, index) => {
        const newCheckpoint = { ...checkpoint };
        
        // Reduce rest days for experienced trekkers
        if (checkpoint.type === 'accommodation' && checkpoint.duration === '2 days') {
          newCheckpoint.duration = '1 day';
          newCheckpoint.details = checkpoint.details + ' (Fast-paced for experienced trekkers)';
        }
        
        // Modify descriptions for more challenging routes
        if (checkpoint.description.includes('moderate') || checkpoint.description.includes('manageable')) {
          newCheckpoint.description = checkpoint.description.replace('moderate', 'challenging');
          newCheckpoint.description = checkpoint.description.replace('manageable', 'demanding');
        }
        
        return newCheckpoint;
      });
      
      // Add challenging side trips for hard treks
      if (trek.name === 'Everest Base Camp') {
        const gorakIndex = trek.checkpoints.findIndex(cp => cp.name === 'Gorak Shep');
        if (gorakIndex !== -1) {
          trek.checkpoints.splice(gorakIndex + 1, 0, {
            name: 'Island Peak Base Camp',
            type: 'destination',
            description: 'Advanced side trip',
            details: 'Optional technical climb for experienced mountaineers',
            elevation: '5,200m',
            duration: '1 day'
          });
        }
      }
    }
    
    // Modify based on budget
    if (budget === 'budget') {
      // Budget: Basic accommodations, fewer amenities
      trek.accommodation = trek.accommodation.map(acc => ({
        ...acc,
        price: acc.price.replace(/\$(\d+)-(\d+)/, (match, min, max) => {
          const newMin = Math.floor(parseInt(min) * 0.7);
          const newMax = Math.floor(parseInt(max) * 0.8);
          return `$${newMin}-${newMax}`;
        }),
        amenities: acc.amenities.filter(amenity => 
          !['WiFi', 'AC', 'Swimming Pool', 'Garden'].includes(amenity)
        ),
        description: acc.description + ' (Budget option)'
      }));
      
      // Reduce transport costs
      trek.transport = trek.transport.map(trans => ({
        ...trans,
        cost: trans.cost.includes('$') ? 
          trans.cost.replace(/\$(\d+)-(\d+)/, (match, min, max) => {
            const newMin = Math.floor(parseInt(min) * 0.8);
            const newMax = Math.floor(parseInt(max) * 0.9);
            return `$${newMin}-${newMax}`;
          }) : trans.cost
      }));
      
    } else if (budget === 'luxury') {
      // Luxury: Premium accommodations, more amenities
      trek.accommodation = trek.accommodation.map(acc => ({
        ...acc,
        price: acc.price.replace(/\$(\d+)-(\d+)/, (match, min, max) => {
          const newMin = Math.floor(parseInt(min) * 1.5);
          const newMax = Math.floor(parseInt(max) * 2);
          return `$${newMin}-${newMax}`;
        }),
        amenities: [...acc.amenities, 'Spa', 'Premium Dining', 'Private Guide', 'Helicopter Evacuation'],
        description: acc.description + ' (Luxury option)'
      }));
      
      // Add luxury transport options
      trek.transport = trek.transport.map(trans => ({
        ...trans,
        cost: trans.cost.includes('$') ? 
          trans.cost.replace(/\$(\d+)-(\d+)/, (match, min, max) => {
            const newMin = Math.floor(parseInt(min) * 1.3);
            const newMax = Math.floor(parseInt(max) * 1.5);
            return `$${newMin}-${newMax}`;
          }) : trans.cost,
        details: trans.details + ' (Premium service)'
      }));
      
      // Add helicopter option for luxury treks
      if (trek.name === 'Everest Base Camp') {
        trek.transport.push({
          type: 'Helicopter',
          from: 'Gorak Shep',
          to: 'Kathmandu',
          duration: '2 hours',
          cost: '$800-1200',
          details: 'Luxury helicopter return (weather dependent)'
        });
      } else if (trek.name === 'Annapurna Circuit') {
        trek.transport.push({
          type: 'Helicopter',
          from: 'Muktinath',
          to: 'Pokhara',
          duration: '1.5 hours',
          cost: '$600-900',
          details: 'Luxury helicopter return (weather dependent)'
        });
      }
    }
    
    return trek;
  };

  const selectedTrek = destinations.find(d => d.name === selectedDestination);
  const dynamicTrek = selectedTrek ? getDynamicTrekPlan(selectedTrek, difficultyLevel, budget) : null;
  const displayTrek = dynamicTrek || selectedTrek;

  return (
    <div className="trip-planning-container">
      {/* Enhanced Progress Bar */}
      <div 
        className="progress-bar" 
        style={{ '--progress': currentStep - 1 }}
      >
        <div 
          className={`progress-step ${currentStep > 1 ? 'completed' : currentStep === 1 ? 'active' : ''}`}
          onClick={() => currentStep > 1 && setCurrentStep(1)}
          title="Choose your trek destination"
        >
          <div className="step-number">1</div>
          <span>Destination</span>
        </div>
        <div 
          className={`progress-step ${currentStep > 2 ? 'completed' : currentStep === 2 ? 'active' : ''}`}
          onClick={() => currentStep > 2 && setCurrentStep(2)}
          title="Set trip dates and preferences"
        >
          <div className="step-number">2</div>
          <span>Details</span>
        </div>
        <div 
          className={`progress-step ${currentStep > 3 ? 'completed' : currentStep === 3 ? 'active' : ''}`}
          onClick={() => currentStep > 3 && setCurrentStep(3)}
          title="Select accommodation and budget"
        >
          <div className="step-number">3</div>
          <span>Options</span>
        </div>
        <div 
          className={`progress-step ${currentStep > 4 ? 'completed' : currentStep === 4 ? 'active' : ''}`}
          onClick={() => currentStep > 4 && setCurrentStep(4)}
          title="Review and generate your plan"
        >
          <div className="step-number">4</div>
          <span>Plan</span>
        </div>
      </div>

      <div className="trip-planning-header">
        <h1><FaCompass /> Plan Your Himalayan Adventure</h1>
        <p>Design your perfect trek with personalized recommendations</p>
      </div>

      <div className="planning-content">
        {/* Planning Form */}
        {!showResults && (
          <div className="planning-form glass-card">
            {/* Step 1: Destination Selection */}
            {currentStep === 1 && (
              <div className="form-section">
                <h2><FaMapMarkerAlt /> Choose Your Destination</h2>
                {validationErrors.destination && (
                  <div className="validation-error">
                    <FaTimes className="error-icon" />
                    <span>{validationErrors.destination}</span>
                  </div>
                )}
                
                {/* Search Interface */}
                <div className="search-section">
                  <div className="search-container">
                    <div className="search-input-wrapper">
                      <FaSearch className="search-icon" />
                      <input
                        type="text"
                        placeholder="Search treks by name, region, difficulty, or highlights..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="search-input"
                      />
                      {searchQuery && (
                        <button onClick={clearSearch} className="clear-search-btn">
                          <FaTimes />
                        </button>
                      )}
                    </div>
                    {showSearchResults && (
                      <div className="search-results-info">
                        <span>{Math.min(filteredDestinations.length, 5)} of {filteredDestinations.length} trek{filteredDestinations.length !== 1 ? 's' : ''} found</span>
                        <button onClick={clearSearch} className="clear-all-btn">
                          Show all treks
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="destination-grid">
                  {(showSearchResults ? filteredDestinations : destinations).slice(0, 5).map((dest) => (
                    <div
                      key={dest.id}
                      className={`destination-card${selectedDestination === dest.name ? ' selected' : ''}`}
                      onClick={() => handleDestinationSelect(dest.name)}
                    >
                      <div className="destination-header">
                        <h3>{dest.name}</h3>
                        <div className="destination-rating">
                          <FaStar className="star-icon" />
                          <span>{dest.rating}</span>
                          <span className="reviews">({dest.reviews})</span>
                        </div>
                      </div>
                      
                      <div className="destination-details">
                        <p><FaMountain /> {dest.difficulty}</p>
                        <p><FaClock /> {dest.duration}</p>
                        <p><FaThermometerHalf /> {dest.elevation}</p>
                        <p><FaCalendarAlt /> {dest.bestTime}</p>
                      </div>
                      
                      <div className="destination-price">
                        <span className="price">{dest.price}</span>
                      </div>
                      
                      <div className="destination-highlights">
                        {dest.highlights.slice(0, 2).map((highlight, index) => (
                          <span key={index} className="highlight-tag">{highlight}</span>
                        ))}
                      </div>
                      
                      {selectedDestination === dest.name && (
                        <div className="selection-indicator">
                          <FaCheckCircle />
                          <span>Selected</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Trip Details */}
            {currentStep === 2 && (
              <div className="form-section">
                <h2><FaCalendarAlt /> Trip Details</h2>
                <div className="trip-details-form">
                  <div className="form-group">
                    <label>Start Date *</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className={validationErrors.startDate ? 'error' : ''}
                    />
                    {validationErrors.startDate && (
                      <div className="validation-error">
                        <FaTimes className="error-icon" />
                        <span>{validationErrors.startDate}</span>
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Duration *</label>
                    <select 
                      value={trekDuration} 
                      onChange={(e) => setTrekDuration(e.target.value)}
                      className={validationErrors.trekDuration ? 'error' : ''}
                    >
                      <option value="">Select Duration</option>
                      <option value="7-9">7-9 days</option>
                      <option value="10-12">10-12 days</option>
                      <option value="12-14">12-14 days</option>
                      <option value="14+">14+ days</option>
                    </select>
                    {validationErrors.trekDuration && (
                      <div className="validation-error">
                        <FaTimes className="error-icon" />
                        <span>{validationErrors.trekDuration}</span>
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Difficulty Level *</label>
                    <select 
                      value={difficultyLevel} 
                      onChange={(e) => setDifficultyLevel(e.target.value)}
                      className={validationErrors.difficultyLevel ? 'error' : ''}
                    >
                      <option value="">Select Difficulty</option>
                      <option value="easy">Easy</option>
                      <option value="moderate">Moderate</option>
                      <option value="hard">Hard</option>
                    </select>
                    {validationErrors.difficultyLevel && (
                      <div className="validation-error">
                        <FaTimes className="error-icon" />
                        <span>{validationErrors.difficultyLevel}</span>
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Group Size *</label>
                    <select 
                      value={groupSize} 
                      onChange={(e) => setGroupSize(e.target.value)}
                      className={validationErrors.groupSize ? 'error' : ''}
                    >
                      <option value="">Select Group Size</option>
                      <option value="1">Solo</option>
                      <option value="2-4">2-4 people</option>
                      <option value="5-8">5-8 people</option>
                      <option value="9+">9+ people</option>
                    </select>
                    {validationErrors.groupSize && (
                      <div className="validation-error">
                        <FaTimes className="error-icon" />
                        <span>{validationErrors.groupSize}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Additional Options */}
            {currentStep === 3 && (
              <div className="form-section">
                <h2><FaCog /> Additional Options</h2>
                
                <div className="options-section">
                  <h3>Accommodation Type *</h3>
                  {validationErrors.accommodationType && (
                    <div className="validation-error">
                      <FaTimes className="error-icon" />
                      <span>{validationErrors.accommodationType}</span>
                    </div>
                  )}
                  <div className="accommodation-options">
                    {accommodationOptions.map((option) => (
                      <div 
                        key={option.id}
                        className={`accommodation-option${accommodationType === option.id ? ' selected' : ''}`}
                        onClick={() => setAccommodationType(option.id)}
                      >
                        <h4>{option.name}</h4>
                        <p>{option.description}</p>
                        <span className="price-tag">{option.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="options-section">
                  <h3>Budget Range *</h3>
                  {validationErrors.budget && (
                    <div className="validation-error">
                      <FaTimes className="error-icon" />
                      <span>{validationErrors.budget}</span>
                    </div>
                  )}
                  <div className="budget-options">
                    {budgetRanges.map((option) => (
                      <div 
                        key={option.id}
                        className={`budget-option${budget === option.id ? ' selected' : ''}`}
                        onClick={() => setBudget(option.id)}
                      >
                        <h4>{option.name}</h4>
                        <span className="budget-range">{option.range}</span>
                        <p>{option.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="options-section">
                  <h3>Special Requirements</h3>
                  <div className="requirements-grid">
                    {requirementOptions.map((option) => (
                      <div 
                        key={option.id}
                        className={`requirement-option${specialRequirements.includes(option.id) ? ' selected' : ''}`}
                        onClick={() => toggleRequirement(option.id)}
                      >
                        <span className="requirement-icon">{option.icon}</span>
                        <span>{option.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="options-section">
                  <h3>Trip Notes</h3>
                  <textarea
                    value={tripNotes}
                    onChange={(e) => setTripNotes(e.target.value)}
                    placeholder="Add any special requests, dietary requirements, or additional notes..."
                    rows={4}
                  />
                </div>

                <div className="options-section">
                  <h3>Emergency Contact</h3>
                  <div className="emergency-contact-form">
                    <input
                      type="text"
                      placeholder="Contact Name"
                      value={emergencyContact.name}
                      onChange={(e) => setEmergencyContact({...emergencyContact, name: e.target.value})}
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={emergencyContact.phone}
                      onChange={(e) => setEmergencyContact({...emergencyContact, phone: e.target.value})}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={emergencyContact.email}
                      onChange={(e) => setEmergencyContact({...emergencyContact, email: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Plan */}
            {currentStep === 4 && (
              <div className="form-section">
                <h2><FaCheckCircle /> Review Your Plan</h2>
                <div className="review-summary">
                  <div className="summary-item">
                    <strong>Destination:</strong> {selectedDestination}
                  </div>
                  <div className="summary-item">
                    <strong>Start Date:</strong> {startDate}
                  </div>
                  <div className="summary-item">
                    <strong>Duration:</strong> {trekDuration}
                  </div>
                  <div className="summary-item">
                    <strong>Difficulty:</strong> {difficultyLevel}
                  </div>
                  <div className="summary-item">
                    <strong>Group Size:</strong> {groupSize}
                  </div>
                  <div className="summary-item">
                    <strong>Accommodation:</strong> {accommodationOptions.find(a => a.id === accommodationType)?.name}
                  </div>
                  <div className="summary-item">
                    <strong>Budget:</strong> {budgetRanges.find(b => b.id === budget)?.name}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="form-navigation">
              {currentStep > 1 && (
                <button className="nav-btn prev-btn" onClick={prevStep}>
                  <FaArrowLeft /> Previous
                </button>
              )}
              
              <button className="btn reset-btn" onClick={handleReset}>
                Reset
              </button>
              
              {currentStep < 4 && (
                <button className="nav-btn next-btn" onClick={nextStep}>
                  Next <FaArrowRight />
                </button>
              )}
              
              {currentStep === 4 && (
                <button className="plan-trip-btn btn" onClick={handlePlanTrip}>
                  <FaSearch /> Generate Trip Plan
                </button>
              )}
            </div>
          </div>
        )}

        {/* Results Section - Only shows after planning completion */}
        {showResults && displayTrek && (
          <div className="results-container">
            {/* Weather Section */}
            <div className="weather-section glass-card">
              <h2><FaCloudSun /> Current Weather</h2>
              <div className="weather-container">
                <WeatherComponent
                  city={selectedLocation?.city || displayTrek.name}
                  coordinates={selectedLocation?.coordinates}
                  compact={true}
                />
              </div>
            </div>

            {/* Dynamic Modifications Section */}
            {dynamicTrek && (difficultyLevel || budget) && (
              <div className="modifications-section glass-card">
                <h2><FaCog /> Personalized Modifications</h2>
                <div className="modifications-content">
                  <div className="modification-item">
                    <FaInfoCircle className="modification-icon" />
                    <div className="modification-details">
                      <h4>Your trek has been customized based on your preferences:</h4>
                      <ul>
                        {difficultyLevel && (
                          <li>
                            <strong>Difficulty Level ({difficultyLevel}):</strong> 
                            {difficultyLevel === 'Easy' && ' Extended duration with more rest days and easier routes for better acclimatization'}
                            {difficultyLevel === 'Hard' && ' Condensed itinerary with challenging routes and optional technical climbs for experienced trekkers'}
                            {difficultyLevel === 'Moderate' && ' Standard itinerary with balanced difficulty and duration'}
                          </li>
                        )}
                        {budget && (
                          <li>
                            <strong>Budget ({budgetRanges.find(b => b.id === budget)?.name}):</strong> 
                            {budget === 'budget' && ' Optimized for cost with basic accommodations and essential amenities'}
                            {budget === 'luxury' && ' Premium accommodations with luxury amenities and enhanced services'}
                            {budget === 'mid-range' && ' Balanced comfort and cost with standard accommodations'}
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Checkpoints Section */}
            <div className="checkpoints-section glass-card">
              <h2><FaMapMarkerAlt /> Trek Itinerary & Route Guide</h2>
              <div className="itinerary-container">
                <TrekItinerary 
                  checkpoints={displayTrek.checkpoints}
                  trekName={displayTrek.name}
                  compact={true}
                />
                <MapComponent
                  center={selectedLocation?.center || [27.7172, 85.3240]}
                  markers={[{
                    name: displayTrek.name,
                    difficulty: displayTrek.difficulty,
                    elevation: displayTrek.elevation,
                    description: displayTrek.description,
                    bestTime: displayTrek.bestTime,
                    coordinates: `${selectedLocation?.center?.[0]?.toFixed(4)}°N, ${selectedLocation?.center?.[1]?.toFixed(4)}°E`,
                    checkpoints: displayTrek.checkpoints
                  }]}
                />
              </div>
            </div>

            {/* Accommodation Section */}
            <div className="accommodation-section glass-card">
              <h2><FaHotel /> Recommended Accommodations</h2>
              <div className="accommodation-grid">
                {displayTrek.accommodation.map((acc, index) => (
                  <div key={index} className="accommodation-card">
                    <div className="acc-header">
                      <div>
                        <h3>{acc.name}</h3>
                        <span className="acc-location">{acc.location}</span>
                      </div>
                      <span className="acc-type">{acc.type}</span>
                    </div>
                    <div className="acc-price">{acc.price}</div>
                    <div className="acc-description">{acc.description}</div>
                    <div className="acc-amenities">
                      {acc.amenities.map((amenity, i) => (
                        <span key={i} className="amenity-tag">{amenity}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transport Section */}
            <div className="transport-section glass-card">
              <h2><FaCar /> Transportation Details</h2>
              <div className="transport-grid">
                {displayTrek.transport.map((trans, index) => (
                  <div key={index} className="transport-card">
                    <div className="trans-icon">
                      {trans.type === 'Flight' && <FaPlane />}
                      {trans.type === 'Bus' && <FaBus />}
                      {trans.type === 'Trek' && <FaHiking />}
                      {trans.type === 'Car' && <FaCar />}
                      {trans.type === 'Helicopter' && <FaHelicopter />}
                    </div>
                    <div className="trans-details">
                      <h4>
                        {trans.type === 'Flight' && <FaPlane />}
                        {trans.type === 'Bus' && <FaBus />}
                        {trans.type === 'Trek' && <FaHiking />}
                        {trans.type === 'Car' && <FaCar />}
                        {trans.type === 'Helicopter' && <FaHelicopter />}
                        {trans.type}
                      </h4>
                      <div className="trans-detail">
                        <span className="trans-detail-label">Route</span>
                        <span className="trans-detail-value">{trans.from} → {trans.to}</span>
                      </div>
                      <div className="trans-detail">
                        <span className="trans-detail-label">Duration</span>
                        <span className="trans-detail-value">{trans.duration}</span>
                      </div>
                      <div className="trans-detail">
                        <span className="trans-detail-label">Cost</span>
                        <span className="trans-detail-value">{trans.cost}</span>
                      </div>
                      {trans.details && (
                        <p>{trans.details}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trip Summary */}
            <div className="trip-summary glass-card">
              <h2><FaCheckCircle /> Your Complete Trip Plan</h2>
              <div className="summary-content">
                <div className="summary-section">
                  <h3>Basic Information</h3>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <span className="label">Destination:</span>
                      <span className="value">{selectedDestination}</span>
                    </div>
                    <div className="summary-item">
                      <span className="label">Start Date:</span>
                      <span className="value">{startDate}</span>
                    </div>
                    <div className="summary-item">
                      <span className="label">Duration:</span>
                      <span className="value">{displayTrek.duration}</span>
                    </div>
                    <div className="summary-item">
                      <span className="label">Difficulty:</span>
                      <span className="value">{difficultyLevel}</span>
                    </div>
                    <div className="summary-item">
                      <span className="label">Group Size:</span>
                      <span className="value">{groupSize}</span>
                    </div>
                    <div className="summary-item">
                      <span className="label">Accommodation:</span>
                      <span className="value">{accommodationOptions.find(a => a.id === accommodationType)?.name}</span>
                    </div>
                    <div className="summary-item">
                      <span className="label">Budget:</span>
                      <span className="value">{budgetRanges.find(b => b.id === budget)?.name}</span>
                    </div>
                  </div>
                </div>

                {specialRequirements.length > 0 && (
                  <div className="summary-section">
                    <h3>Special Requirements</h3>
                    <div className="requirements-summary">
                      {specialRequirements.map(reqId => {
                        const req = requirementOptions.find(r => r.id === reqId);
                        return (
                          <span key={reqId} className="requirement-tag">
                            {req?.icon} {req?.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {tripNotes && (
                  <div className="summary-section">
                    <h3>Additional Notes</h3>
                    <p className="notes-text">{tripNotes}</p>
                  </div>
                )}

                {emergencyContact.name && (
                  <div className="summary-section">
                    <h3>Emergency Contact</h3>
                    <div className="emergency-summary">
                      <p><strong>Name:</strong> {emergencyContact.name}</p>
                      <p><strong>Phone:</strong> {emergencyContact.phone}</p>
                      <p><strong>Email:</strong> {emergencyContact.email}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="summary-actions">
                <button className="btn book-btn">
                  <FaPhone /> Book Now
                </button>
                <button className="btn whatsapp-btn">
                  <FaWhatsapp /> WhatsApp
                </button>
                <button className="btn email-btn">
                  <FaEnvelope /> Email
                </button>
                <button className="btn reset-btn" onClick={handleReset}>
                  Plan New Trip
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Planning Tips and Features Section */}
        {!showResults && (
          <div className="planning-tips-section">
            <div className="tips-grid">
              <div className="tip-card glass-card">
                <h3><FaRoute /> Smart Features</h3>
                <ul>
                  <li>Real-time weather integration</li>
                  <li>Altitude acclimatization planning</li>
                  <li>Rest day optimization</li>
                  <li>Emergency exit points</li>
                  <li>Photo spot recommendations</li>
                  <li>Local guide recommendations</li>
                  <li>Permit assistance</li>
                  <li>Gear recommendations</li>
                </ul>
              </div>
              
              <div className="tip-card glass-card">
                <h3><FaMountain /> Planning Tips</h3>
                <ul>
                  <li>Book accommodations 2-3 months ahead</li>
                  <li>Check weather conditions regularly</li>
                  <li>Prepare proper gear and clothing</li>
                  <li>Consider your fitness level</li>
                  <li>Get comprehensive travel insurance</li>
                  <li>Learn basic Nepali phrases</li>
                  <li>Respect local customs and culture</li>
                  <li>Pack light but essential items</li>
                </ul>
              </div>

              <div className="tip-card glass-card">
                <h3><FaExclamationTriangle /> Safety Information</h3>
                <ul>
                  <li>Always trek with a guide in remote areas</li>
                  <li>Carry emergency contact information</li>
                  <li>Stay hydrated and acclimatize properly</li>
                  <li>Monitor weather conditions</li>
                  <li>Have a backup plan for emergencies</li>
                  <li>Register with local authorities</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPlanning; 