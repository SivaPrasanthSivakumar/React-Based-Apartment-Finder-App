import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./styles.css";
import SearchApartments from "./pages/SearchApartments";
import { ContactAgent } from "./pages/ContactAgent";
import Contribute from "./pages/Contribute";
import LoginSignup from "./pages/LoginSignup";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginSignup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchApartments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <ContactAgent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contribute"
          element={
            <ProtectedRoute>
              <Contribute />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function Header() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header>
      <div className="left-section">
        <h1>Apartment Finder</h1>
      </div>
      <div className="middle-section"></div>
      <div className="right-section">
        <nav>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/search">Search Apartments</Link>
            <Link to="/contribute">Contribute</Link>
            <Link to="/contact">Contact Agent</Link>
          </div>
        </nav>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

function HomePage() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>
        Welcome to Apartment Finder
      </h2>
      <p style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}>
        Use the navigation to explore the app.
      </p>
      <div
        style={{
          marginTop: "2rem",
          position: "relative",
          paddingBottom: "56.25%",
          height: 0,
        }}
      >
        <iframe
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "var(--border-radius)",
          }}
          src="https://www.youtube.com/embed/g-Jz3TYrdQs"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)" }}>
        RENTING VS BUYING (what's better?)
      </p>
      <p style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)" }}>By Mark Tilbury</p>
    </div>
  );
}

export default App;
