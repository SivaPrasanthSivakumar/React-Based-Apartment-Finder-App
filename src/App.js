import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles.css";
import SearchApartments from "./pages/SearchApartments";
import { ContactAgent } from "./pages/ContactAgent";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchApartments />} />
        <Route path="/contact" element={<ContactAgent />} />
      </Routes>
    </Router>
  );
}

function Header() {
  return (
    <header>
      <h1>Apartment Finder</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/search">Search Apartments</Link>
        <Link to="/contact">Contact Agent</Link>
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
