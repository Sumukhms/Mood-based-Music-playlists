"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FiMenu, FiX, FiSearch, FiSun, FiMoon } from "react-icons/fi";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef(null);

  // Handle theme persistence
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") === "dark";
    setDarkMode(savedTheme);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          <img
            className="logo-img"
            src="/images/logo.png"
            alt="MoodMusic Logo"
          />
          <span>MoodMusic</span>
        </Link>

        {/* Left-aligned navigation links (desktop) */}
        <ul className="nav-left">
          <li className="nav-item">
            <Link href="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/mood" className="nav-link">
              Moods
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/about" className="nav-link">
              About
            </Link>
          </li>
        </ul>

        {/* Mobile menu toggle */}
        <div
          className={`menu-icon ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </div>

        {/* Right-aligned actions (search + theme) */}
        <div className="nav-right" ref={menuRef}>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search songs or moods..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="search-icon">
              <FiSearch />
            </button>
          </div>
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>

        {/* Mobile menu (hidden on desktop) */}
        <div className={`mobile-menu ${isOpen ? "active" : ""}`}>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link
                href="/"
                className="nav-link"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/mood"
                className="nav-link"
                onClick={() => setIsOpen(false)}
              >
                Moods
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/about"
                className="nav-link"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;