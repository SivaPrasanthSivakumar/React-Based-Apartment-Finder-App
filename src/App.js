import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles.css";
import SearchApartments from "./pages/SearchApartments";
import { ContactAgent } from "./pages/ContactAgent";
import Contribute from "./pages/Contribute";
import LoginSignup from "./pages/LoginSignup";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
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
    </Router>
  );
}

function Header() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header>
      <h1>Apartment Finder</h1>
      <nav>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/search">Search Apartments</Link>
          <Link to="/contribute">Contribute</Link>
          <Link to="/contact">Contact Agent</Link>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
}

function HomePage() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Welcome to Apartment Finder</h2>
      <p>Use the navigation to explore the app.</p>
      <div style={{ marginTop: "2rem" }}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/g-Jz3TYrdQs"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p>RENTING VS BUYING (what's better?)</p>
      <p>By Mark Tilbury</p>
    </div>
  );
}

export default App;
