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
      <div className="right-section">
        <nav>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/search">Search Apartments</Link>
            <Link to="/contribute">Contribute</Link>
            <Link to="/contact">Contact Agent</Link>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

function HomePage() {
  return (
    <div className="home-page">
      <div className="home-header">
        <h2>Welcome to Apartment Finder</h2>
        <p>Use the navigation to explore the app.</p>
      </div>
      <div className="home-video">
        <iframe
          src="https://www.youtube.com/embed/2iGw3Yac-uQ?si=pC0ZuLp67wrnXePa"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <header className="home-header h2">
        <p>Buying vs Renting A Home - Dave Ramsey Rant</p>
        <p>By Dave Ramsey From The Ramsey Show Highlights</p>
      </header>
      <div className="home-video">
        <iframe
          src="https://www.youtube.com/embed/g-Jz3TYrdQs"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <header className="home-header h2">
        <p>RENTING VS BUYING (what's better?)</p>
        <p>By Mark Tilbury</p>
      </header>
    </div>
  );
}

export default App;
