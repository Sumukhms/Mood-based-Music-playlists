"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaUser, FaPlus, FaMusic, FaSearch } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import "../styles/Home.css";

const Home = () => {
  // State management
  const [darkMode, setDarkMode] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlists, setPlaylists] = useState([
    { id: 1, name: "Chill Vibes", songs: 24 },
    { id: 2, name: "Workout Beats", songs: 18 },
    { id: 3, name: "Lo-Fi Relax", songs: 32 },
    { id: 4, name: "Party Hits", songs: 15 },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") === "dark";
    setDarkMode(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Playlist functions
  const addPlaylist = () => {
    if (playlistName.trim() !== "") {
      const newPlaylist = {
        id: playlists.length + 1,
        name: playlistName.trim(),
        songs: 0
      };
      setPlaylists([...playlists, newPlaylist]);
      setPlaylistName("");
    }
  };

  const filteredPlaylists = playlists.filter(playlist =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-container">
      {/* Left Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Your Playlists</h2>
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search playlists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <ul className="playlist-list">
          {filteredPlaylists.map((playlist) => (
            <li key={playlist.id} className="playlist-item">
              <FaMusic className="music-icon" />
              <div className="playlist-info">
                <span className="playlist-name">{playlist.name}</span>
                <span className="song-count">{playlist.songs} songs</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="add-playlist">
          <input
            type="text"
            placeholder="New playlist name..."
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addPlaylist()}
          />
          <button onClick={addPlaylist}>
            <FaPlus /> Create
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header with theme toggle */}
        <header className="main-header">
          <h1>Welcome to <span className="brand">MoodMusic</span></h1>
          <button 
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <MdLightMode /> : <MdDarkMode />}
          </button>
        </header>

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h2>Discover music that matches your mood</h2>
            <p>Our AI analyzes your emotions to create the perfect playlist for every moment</p>
            <div className="hero-actions">
              <Link href="/mood" className="primary-button">
                Detect My Mood
              </Link>
              <Link href="/browse" className="secondary-button">
                Browse All Playlists
              </Link>
            </div>
          </div>
          <div className="hero-image">
            {/* Placeholder for an image or illustration */}
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <h3>Why Choose MoodMusic?</h3>
          <div className="feature-cards">
            <div className="feature-card">
              <div className="feature-icon">🎵</div>
              <h4>Mood-Based Playlists</h4>
              <p>Let AI detect your mood and suggest the perfect music</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h4>Smart Recommendations</h4>
              <p>Personalized suggestions that improve over time</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎧</div>
              <h4>Cross-Platform Sync</h4>
              <p>Access your playlists anywhere, anytime</p>
            </div>
          </div>
        </section>

        {/* Recent Activity Section */}
        <section className="recent-activity">
          <h3>Your Recent Activity</h3>
          <div className="activity-items">
            {/* Would typically map through recent activity data */}
            <div className="activity-item">
              <div className="activity-icon">🎵</div>
              <div className="activity-details">
                <p>Added "Blinding Lights" to Party Hits</p>
                <span className="activity-time">2 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">❤️</div>
              <div className="activity-details">
                <p>Liked "Save Your Tears"</p>
                <span className="activity-time">Yesterday</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* User Profile Button */}
      <button className="user-profile">
        <FaUser />
      </button>
    </div>
  );
};

export default Home;