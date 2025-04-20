import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles.css";
import SearchApartments from "./pages/SearchApartments";
import { ContactAgent } from "./pages/ContactAgent";
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <Router>
      <header>
        <h1>Apartment Finder</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/search">Search Apartments</Link>
          <Link to="/contact">Contact Agent</Link>
        </nav>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <h2>Welcome to Apartment Finder</h2>
              <p>Use the navigation to explore the app.</p>
            </div>
          }
        />
        <Route path="/search" element={<SearchApartments />} />
        <Route path="/contact" element={<ContactAgent />} />
      </Routes>
    </Router>
  );
}

export default function WrappedApp() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
