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

  const [widgetVisibility] = useState({    progress: true,
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
    fitness: true,
  });

  const [widgetOrder, setWidgetOrder] = useState(() => {
    const saved = localStorage.getItem("dashboardWidgetOrder");    return saved ? JSON.parse(saved) : DEFAULT_WIDGETS;
  });

  useEffect(() => {
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
        setMessage("");      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
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
            </div>          </div>
        );
      default:
        return null;
    }
  };

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
    <div className="dashboard-container">      <div className="dashboard-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="dashboard-title">NepGo Dashboard</div>
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
            ) : null}          </div>
          <div className="user-section">
            <div className="user-info">
              <div className="user-avatar">
                <FaUser />
              </div>
              <div className="user-details">
                <h3>{user?.name || "User"}</h3>
                <p>{user?.email || "user@example.com"}</p>
              </div>
            </div>
            <button type="button" className="logout-btn" onClick={handleLogout}>              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>

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
                  ))}                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Dashboard;
