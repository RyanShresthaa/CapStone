<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaSignOutAlt,
  FaChartBar,
  FaCogs,
  FaClipboardList,
  FaBell,
  FaCloudSun,
  FaHiking,
  FaCalendarAlt,
  FaMedal,
  FaStar,
  FaUsers,
  FaComments,
  FaMapMarkerAlt,
  FaRunning,
  FaMap,
} from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import api from "./services/api";
import "./Dashboard.css";

const DEFAULT_WIDGETS = [
  "progress",
  "achievements",
  "map",
  "bookings",
  "community",
  "recommendations",
  "stats",
  "calendar",
  "weather",
  "notifications",
  "analytics",
  "groupTracking",
  "fitness",
  "packingList",
  "expenseTracker",
  "documentVault",
  "journalGallery",
  "pushSettings",
  "leaderboard",
  "apiIntegrations",
];

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    recentActivity: [],
  });

  const [widgetVisibility] = useState({
=======
import React, { useEffect, useState, useRef } from "react";
import WeatherComponent from "./components/WeatherComponent";
import MapComponent from "./components/MapComponent";
import { useTheme } from "./contexts/ThemeContext";
import { FaUser, FaSignOutAlt, FaChartBar, FaCogs, FaClipboardList, FaBell, FaCloudSun, FaHiking, FaCalendarAlt, FaMedal, FaStar, FaMoon, FaSun, FaUsers, FaComments, FaMapMarkerAlt, FaRunning, FaHeartbeat, FaMap, FaExclamationTriangle, FaEye } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "./Dashboard.css";

const MOTIVATIONAL_QUOTES = [
  "The journey of a thousand miles begins with a single step.",
  "Difficult roads often lead to beautiful destinations.",
  "Adventure is worthwhile.",
  "The best view comes after the hardest climb.",
  "Not all those who wander are lost."
];

const ACHIEVEMENTS = [
  { icon: <FaMedal color="#FFD700" />, label: "First Trek" },
  { icon: <FaStar color="#38bdf8" />, label: "Summited 5000m+" },
  { icon: <FaUsers color="#10b981" />, label: "Community Helper" }
];

const RECOMMENDATIONS = [
  { id: 1, name: "Upper Mustang", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", desc: "Ancient kingdom, unique culture, and desert landscapes." },
  { id: 2, name: "Mardi Himal", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80", desc: "Short, scenic trek with stunning Annapurna views." }
];

const COMMUNITY_HIGHLIGHTS = [
  { id: 1, title: "Best gear for monsoon treks?", author: "Maya", replies: 12 },
  { id: 2, title: "Share your Everest Base Camp story!", author: "Ravi", replies: 8 },
  { id: 3, title: "Looking for partners for Annapurna Circuit", author: "Laxman", replies: 5 }
];

const DEFAULT_WIDGETS = [
  'progress', 'achievements', 'map', 'bookings', 'community', 'recommendations', 'stats', 'calendar', 'weather', 'notifications', 'analytics', 'groupTracking', 'fitness',
  'packingList', 'expenseTracker', 'documentVault', 'journalGallery', 'pushSettings', 'leaderboard', 'apiIntegrations'
];

const Dashboard = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    recentActivity: []
  });
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Your trek to Everest Base Camp is coming up!" },
    { id: 2, text: "Weather alert: Possible rain in Annapurna region." },
    { id: 3, text: "New message from your guide." }
  ]);
  const [upcomingTreks, setUpcomingTreks] = useState([
    { id: 1, name: "Everest Base Camp", date: "2024-06-15", status: "Confirmed", center: [28.0026, 86.8527], markers: [{ position: [28.0026, 86.8527], name: 'Everest Base Camp' }] },
    { id: 2, name: "Annapurna Circuit", date: "2024-09-10", status: "Pending", center: [28.5969, 83.9294], markers: [{ position: [28.5969, 83.9294], name: 'Annapurna Base Camp' }] }
  ]);
  const [recentBookings, setRecentBookings] = useState([
    { id: 1, name: "Langtang Valley", date: "2023-11-10", rating: 5 },
    { id: 2, name: "Manaslu Circuit", date: "2023-04-22", rating: 4 }
  ]);
  const [quote, setQuote] = useState("");
  const [progress, setProgress] = useState(80); // percent ready
  const [checklist, setChecklist] = useState([
    { label: "Gear packed", checked: true },
    { label: "Permits ready", checked: true },
    { label: "Fitness routine", checked: false },
    { label: "Travel insurance", checked: false }
  ]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const notifRef = useRef();
  const [aiReason, setAiReason] = useState('This trek matches your interests and current weather conditions.');
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { from: 'bot', text: 'Hi! I am NepGo AI. How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Widget visibility state for customization
  const [widgetVisibility, setWidgetVisibility] = useState({
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
    progress: true,
    achievements: true,
    map: true,
    bookings: true,
    community: true,
    recommendations: true,
    stats: true,
    calendar: true,
    weather: true,
    notifications: true,
    analytics: true,
    groupTracking: true,
<<<<<<< HEAD
    fitness: true,
  });

  const [widgetOrder, setWidgetOrder] = useState(() => {
    const saved = localStorage.getItem("dashboardWidgetOrder");
=======
    fitness: true
  });

  // Widget order state for drag-and-drop
  const [widgetOrder, setWidgetOrder] = useState(() => {
    const saved = localStorage.getItem('dashboardWidgetOrder');
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
    return saved ? JSON.parse(saved) : DEFAULT_WIDGETS;
  });

  useEffect(() => {
<<<<<<< HEAD
    localStorage.setItem("dashboardWidgetOrder", JSON.stringify(widgetOrder));
  }, [widgetOrder]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoadError(null);
      try {
        const { data } = await api.get("/dashboard");
        setMessage(data.message || "");
        setUser(data.user || { name: "User", email: "user@example.com" });
        setStats(
          data.stats || {
            totalUsers: 0,
            activeUsers: 0,
            recentActivity: [],
          }
        );
      } catch (err) {
        setLoadError(
          err.response?.data?.message || "Could not load dashboard. Try again."
        );
        setMessage("");
=======
    localStorage.setItem('dashboardWidgetOrder', JSON.stringify(widgetOrder));
  }, [widgetOrder]);

  // AI Recommendation logic (mocked)
  const handleNewAiRecommendation = () => {
    setAiReason('Based on your recent activity and weather, this trek is ideal for you!');
  };

  // AI Chatbot logic (mocked)
  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages(msgs => [...msgs, { from: 'user', text: chatInput }]);
    setChatInput('');
    setChatLoading(true);
    setTimeout(() => {
      setChatMessages(msgs => [...msgs, { from: 'bot', text: 'This is an AI response. (Integrate with OpenAI or similar for real answers.)' }]);
      setChatLoading(false);
    }, 1200);
  };

  useEffect(() => {
    setQuote(MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]);
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/dashboard", {
          headers: {
            Authorization: "Bearer " + token
          }
        });
        if (response.ok) {
          const data = await response.json();
          setMessage(data.message);
          setUser(data.user || { name: "User", email: "user@example.com" });
          setStats(data.stats || {
            totalUsers: 0,
            activeUsers: 0,
            recentActivity: []
          });
        } else {
          setMessage("Unauthorized");
        }
      } catch (error) {
        setMessage("Error loading dashboard");
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
<<<<<<< HEAD
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    window.location.href = "/login";
  };

  const renderWidget = (key) => {
    switch (key) {
      case "progress":
        return (
          <div className="card-header">
            <h2>Preparation Progress</h2>
            <div className="card-icon">
              <FaHiking />
            </div>
          </div>
        );
      case "achievements":
        return (
          <div className="card-header">
            <h2>Achievements</h2>
            <div className="card-icon">
              <FaMedal />
            </div>
          </div>
        );
      case "map":
        return (
          <div className="card-header">
            <h2>Next Trek Map</h2>
            <div className="card-icon">
              <FaMapMarkerAlt />
            </div>
          </div>
        );
      case "bookings":
        return (
          <div className="card-header">
            <h2>Recent Bookings</h2>
            <div className="card-icon">
              <FaClipboardList />
            </div>
          </div>
        );
      case "community":
        return (
          <div className="card-header">
            <h2>Community</h2>
            <div className="card-icon">
              <FaComments />
            </div>
          </div>
        );
      case "recommendations":
        return (
          <div className="card-header">
            <h2>Recommended for You</h2>
            <div className="card-icon">
              <FaStar />
            </div>
          </div>
        );
      case "stats":
        return (
          <div className="card-header">
            <h2>Animated Stats</h2>
            <div className="card-icon">
              <FaChartBar />
            </div>
          </div>
        );
      case "calendar":
        return (
          <div className="card-header">
            <h2>Calendar</h2>
            <div className="card-icon">
              <FaCalendarAlt />
            </div>
          </div>
        );
      case "weather":
        return (
          <div className="card-header">
            <h2>Weather</h2>
            <div className="card-icon">
              <FaCloudSun />
            </div>
          </div>
        );
      case "notifications":
        return (
          <div className="card-header">
            <h2>Notifications</h2>
            <div className="card-icon">
              <FaBell />
            </div>
          </div>
        );
      case "analytics":
        return (
          <div className="card-header">
            <h2>Analytics & Insights</h2>
            <div className="card-icon">
              <FaChartBar />
            </div>
          </div>
        );
      case "groupTracking":
        return (
          <div className="card-header">
            <h2>Live Group Tracking</h2>
            <div className="card-icon">
              <FaMap />
            </div>
          </div>
        );
      case "fitness":
        return (
          <div className="card-header">
            <h2>Fitness & Health</h2>
            <div className="card-icon">
              <FaRunning />
            </div>
          </div>
        );
      case "packingList":
        return (
          <div className="card-header">
            <h2>Packing List</h2>
            <div className="card-icon">
              <FaClipboardList />
            </div>
          </div>
        );
      case "expenseTracker":
        return (
          <div className="card-header">
            <h2>Expense Tracker</h2>
            <div className="card-icon">
              <FaChartBar />
            </div>
          </div>
        );
      case "documentVault":
        return (
          <div className="card-header">
            <h2>Document Vault</h2>
            <div className="card-icon">
              <FaClipboardList />
            </div>
          </div>
        );
      case "journalGallery":
        return (
          <div className="card-header">
            <h2>Trek Journal & Gallery</h2>
            <div className="card-icon">
              <FaClipboardList />
            </div>
          </div>
        );
      case "pushSettings":
        return (
          <div className="card-header">
            <h2>Push Notifications</h2>
            <div className="card-icon">
              <FaBell />
            </div>
          </div>
        );
      case "leaderboard":
        return (
          <div className="card-header">
            <h2>Leaderboard</h2>
            <div className="card-icon">
              <FaMedal />
            </div>
          </div>
        );
      case "apiIntegrations":
        return (
          <div className="card-header">
            <h2>API Integrations</h2>
            <div className="card-icon">
              <FaCogs />
            </div>
=======
    window.location.href = "/login";
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const handleChecklistToggle = idx => {
    setChecklist(list => list.map((item, i) => i === idx ? { ...item, checked: !item.checked } : item));
    setProgress(list => {
      const updated = checklist.map((item, i) => i === idx ? { ...item, checked: !item.checked } : item);
      return Math.round((updated.filter(i => i.checked).length / updated.length) * 100);
    });
  };

  // Widget toggle handler
  const handleToggleWidget = (key) => {
    setWidgetVisibility(v => ({ ...v, [key]: !v[key] }));
  };

  // Packing List state
  const [packingList, setPackingList] = useState([
    { label: 'Backpack', checked: false },
    { label: 'Sleeping Bag', checked: false },
    { label: 'Water Bottle', checked: false },
    { label: 'Rain Jacket', checked: false },
    { label: 'First Aid Kit', checked: false },
    { label: 'Snacks', checked: false }
  ]);
  const handlePackingToggle = idx => {
    setPackingList(list => list.map((item, i) => i === idx ? { ...item, checked: !item.checked } : item));
  };

  // Expense Tracker state
  const [expenses, setExpenses] = useState([
    { label: 'Guide Fee', amount: 120 },
    { label: 'Permits', amount: 40 },
    { label: 'Equipment', amount: 150 }
  ]);
  const [expenseInput, setExpenseInput] = useState({ label: '', amount: '' });
  const handleAddExpense = () => {
    if (!expenseInput.label || !expenseInput.amount) return;
    setExpenses(exp => [...exp, { ...expenseInput, amount: parseFloat(expenseInput.amount) }]);
    setExpenseInput({ label: '', amount: '' });
  };
  const handleExportCSV = () => {
    const csv = 'Label,Amount\n' + expenses.map(e => `${e.label},${e.amount}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Document Vault state (mock)
  const [docs, setDocs] = useState([]);
  const handleUploadDoc = e => {
    const file = e.target.files[0];
    if (file) setDocs(d => [...d, { name: file.name, url: URL.createObjectURL(file) }]);
  };

  // Journal & Gallery state (mock)
  const [journal, setJournal] = useState([]);
  const [journalInput, setJournalInput] = useState('');
  const [photos, setPhotos] = useState([]);
  const handleAddJournal = () => {
    if (!journalInput.trim()) return;
    setJournal(j => [...j, { text: journalInput, date: new Date().toLocaleDateString() }]);
    setJournalInput('');
  };
  const handleAddPhoto = e => {
    const file = e.target.files[0];
    if (file) setPhotos(p => [...p, { name: file.name, url: URL.createObjectURL(file) }]);
  };

  // Push Notification Settings (mock)
  const [pushEnabled, setPushEnabled] = useState(false);

  // Leaderboard & Challenges (mock)
  const leaderboard = [
    { name: 'Maya', treks: 7 },
    { name: 'Ravi', treks: 6 },
    { name: 'Laxman', treks: 5 }
  ];
  const challenges = [
    { label: 'Summit 3 Peaks', progress: 2, total: 3 },
    { label: 'Walk 100km', progress: 80, total: 100 }
  ];

  // API Integrations (mock)
  const integrations = [
    { label: 'Strava', connected: false },
    { label: 'Google Calendar', connected: false },
    { label: 'WhatsApp', connected: false }
  ];

  // Drag-and-drop handlers
  const onDragEnd = result => {
    if (!result.destination) return;
    const newOrder = Array.from(widgetOrder);
    const [removed] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, removed);
    setWidgetOrder(newOrder);
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const nextTrek = upcomingTreks[0];

  const renderWidget = (key) => {
    switch (key) {
      case 'progress':
        return (
          <div className="card-header">
            <h2>Preparation Progress</h2>
            <div className="card-icon"><FaHiking /></div>
          </div>
        );
      case 'achievements':
        return (
          <div className="card-header">
            <h2>Achievements</h2>
            <div className="card-icon"><FaMedal /></div>
          </div>
        );
      case 'map':
        return (
          <div className="card-header">
            <h2>Next Trek Map</h2>
            <div className="card-icon"><FaMapMarkerAlt /></div>
          </div>
        );
      case 'bookings':
        return (
          <div className="card-header">
            <h2>Recent Bookings</h2>
            <div className="card-icon"><FaClipboardList /></div>
          </div>
        );
      case 'community':
        return (
          <div className="card-header">
            <h2>Community</h2>
            <div className="card-icon"><FaComments /></div>
          </div>
        );
      case 'recommendations':
        return (
          <div className="card-header">
            <h2>Recommended for You</h2>
            <div className="card-icon"><FaStar /></div>
          </div>
        );
      case 'stats':
        return (
          <div className="card-header">
            <h2>Animated Stats</h2>
            <div className="card-icon"><FaChartBar /></div>
          </div>
        );
      case 'calendar':
        return (
          <div className="card-header">
            <h2>Calendar</h2>
            <div className="card-icon"><FaCalendarAlt /></div>
          </div>
        );
      case 'weather':
        return (
          <div className="card-header">
            <h2>Weather</h2>
            <div className="card-icon"><FaCloudSun /></div>
          </div>
        );
      case 'notifications':
        return (
          <div className="card-header">
            <h2>Notifications</h2>
            <div className="card-icon"><FaBell /></div>
          </div>
        );
      case 'analytics':
        return (
          <div className="card-header">
            <h2>Analytics & Insights</h2>
            <div className="card-icon"><FaChartBar /></div>
          </div>
        );
      case 'groupTracking':
        return (
          <div className="card-header">
            <h2>Live Group Tracking</h2>
            <div className="card-icon"><FaMap /></div>
          </div>
        );
      case 'fitness':
        return (
          <div className="card-header">
            <h2>Fitness & Health</h2>
            <div className="card-icon"><FaRunning /></div>
          </div>
        );
      case 'packingList':
        return (
          <div className="card-header">
            <h2>Packing List</h2>
            <div className="card-icon"><FaClipboardList /></div>
          </div>
        );
      case 'expenseTracker':
        return (
          <div className="card-header">
            <h2>Expense Tracker</h2>
            <div className="card-icon"><FaChartBar /></div>
          </div>
        );
      case 'documentVault':
        return (
          <div className="card-header">
            <h2>Document Vault</h2>
            <div className="card-icon"><FaClipboardList /></div>
          </div>
        );
      case 'journalGallery':
        return (
          <div className="card-header">
            <h2>Trek Journal & Gallery</h2>
            <div className="card-icon"><FaClipboardList /></div>
          </div>
        );
      case 'pushSettings':
        return (
          <div className="card-header">
            <h2>Push Notifications</h2>
            <div className="card-icon"><FaBell /></div>
          </div>
        );
      case 'leaderboard':
        return (
          <div className="card-header">
            <h2>Leaderboard</h2>
            <div className="card-icon"><FaMedal /></div>
          </div>
        );
      case 'apiIntegrations':
        return (
          <div className="card-header">
            <h2>API Integrations</h2>
            <div className="card-icon"><FaCogs /></div>
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
          </div>
        );
      default:
        return null;
    }
  };

<<<<<<< HEAD
  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">
          <div className="spinner" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
=======
  return (
    <div className="dashboard-container">
      {/* Header Section */}
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
      <div className="dashboard-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="dashboard-title">NepGo Dashboard</div>
<<<<<<< HEAD
            <div className="dashboard-subtitle">
              Your Himalayan Trekking Hub
            </div>
            {message ? (
              <p className="dashboard-welcome-line" style={{ marginTop: "0.5rem", opacity: 0.9 }}>
                {message}
              </p>
            ) : null}
            {loadError ? (
              <p className="dashboard-error-line" role="alert" style={{ marginTop: "0.35rem", color: "#f87171" }}>
                {loadError}{" "}
                <button
                  type="button"
                  className="logout-btn"
                  style={{ marginLeft: "0.5rem", padding: "0.25rem 0.6rem", fontSize: "0.85rem" }}
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </p>
            ) : null}
            {!loadError && stats.totalUsers > 0 ? (
              <p style={{ marginTop: "0.35rem", fontSize: "0.9rem", opacity: 0.85 }}>
                <FaUsers style={{ marginRight: 6, verticalAlign: "middle" }} />
                {stats.totalUsers} members · {stats.activeUsers} treks in catalog
              </p>
            ) : null}
=======
            <div className="dashboard-subtitle">Your Himalayan Trekking Hub</div>
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
          </div>
          <div className="user-section">
            <div className="user-info">
              <div className="user-avatar">
                <FaUser />
              </div>
              <div className="user-details">
<<<<<<< HEAD
                <h3>{user?.name || "User"}</h3>
                <p>{user?.email || "user@example.com"}</p>
              </div>
            </div>
            <button type="button" className="logout-btn" onClick={handleLogout}>
=======
                <h3>{user?.name || 'User'}</h3>
                <p>{user?.email || 'user@example.com'}</p>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>

<<<<<<< HEAD
      <div className="dashboard-main">
        <DragDropContext
          onDragEnd={(result) => {
            if (!result.destination) return;
            const newOrder = Array.from(widgetOrder);
            const [removed] = newOrder.splice(result.source.index, 1);
            newOrder.splice(result.destination.index, 0, removed);
            setWidgetOrder(newOrder);
          }}
        >
          <Droppable droppableId="dashboard-widgets" direction="vertical">
            {(provided) => (
              <div
                className="dashboard-grid"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {widgetOrder
                  .filter((key) => widgetVisibility[key])
                  .map((key, idx) => (
                    <Draggable key={key} draggableId={key} index={idx}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="glass-card"
                          style={{
                            ...provided.draggableProps.style,
                            zIndex: snapshot.isDragging ? 100 : "auto",
                            boxShadow: snapshot.isDragging
                              ? "0 8px 32px rgba(14,165,233,0.25)"
                              : undefined,
                            border: snapshot.isDragging
                              ? "2px solid #0ea5e9"
                              : undefined,
                            transition: "box-shadow 0.2s, border 0.2s",
                          }}
                        >
                          {renderWidget(key)}
                        </div>
                      )}
                    </Draggable>
                  ))}
=======
      {/* Main Dashboard Content */}
      <div className="dashboard-main">
        <DragDropContext onDragEnd={result => {
          if (!result.destination) return;
          const newOrder = Array.from(widgetOrder);
          const [removed] = newOrder.splice(result.source.index, 1);
          newOrder.splice(result.destination.index, 0, removed);
          setWidgetOrder(newOrder);
        }}>
          <Droppable droppableId="dashboard-widgets" direction="vertical">
            {(provided) => (
              <div className="dashboard-grid" ref={provided.innerRef} {...provided.droppableProps}>
                {widgetOrder.filter(key => widgetVisibility[key]).map((key, idx) => (
                  <Draggable key={key} draggableId={key} index={idx}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="glass-card"
                        style={{
                          ...provided.draggableProps.style,
                          zIndex: snapshot.isDragging ? 100 : 'auto',
                          boxShadow: snapshot.isDragging ? '0 8px 32px rgba(14,165,233,0.25)' : undefined,
                          border: snapshot.isDragging ? '2px solid #0ea5e9' : undefined,
                          transition: 'box-shadow 0.2s, border 0.2s',
                        }}
                      >
                        {renderWidget(key)}
                      </div>
                    )}
                  </Draggable>
                ))}
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Dashboard;
