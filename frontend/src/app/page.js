"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import "../styles/Home.css";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") === "dark";
    setDarkMode(savedTheme);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to MoodMusic</h1>
        <p>Explore music that matches your mood and vibes!</p>
        <Link href="/mood" className="explore-btn">Discover Now</Link>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>🎵 Mood-Based Playlists</h3>
          <p>Let AI detect your mood and suggest the best music.</p>
        </div>
        <div className="feature-card">
          <h3>🔥 Trending Songs</h3>
          <p>Check out the hottest and most loved tracks.</p>
        </div>
        <div className="feature-card">
          <h3>🎧 Personalized Selection</h3>
          <p>Create and enjoy your custom playlists.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
