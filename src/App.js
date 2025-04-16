import React, { useState, useEffect } from "react";
import "./styles.css";

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
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [results, setResults] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("App component loaded");
  }, []);

  const searchApartments = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/apartments?location=${location}&price=${price}&bedrooms=${bedrooms}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResults(
        data.length
          ? data
              .map(
                (apartment) =>
                  `${apartment.title} - $${apartment.price}, ${apartment.bedrooms} bedrooms`
              )
              .join("\n")
          : "No apartments found."
      );
    } catch (error) {
      console.error("Error fetching apartments:", error);
      setResults("Error fetching apartments. Please try again later.");
    }
  };

  const searchNearbyApartments = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setResults(
          `Searching for apartments near (${coords.latitude}, ${coords.longitude})...`
        );
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const sendMessageToAgent = () => {
    alert(
      `Message sent to agent:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
    );
  };

  const clearSearchFields = () => {
    setLocation("");
    setPrice("");
    setBedrooms("");
    setResults("");
  };

  const clearContactForm = () => {
    setName("");
    setEmail("");
    setMessage("");
  };

  const showHelp = () => {
    alert(
      "To search for apartments, fill in the location, price, and bedrooms, then click 'Search'. Use 'Near Me' to find nearby apartments. To contact an agent, fill in your details and click 'Send'."
    );
  };

  return (
    <div>
      {/* Debug element added to confirm rendering */}
      <div
        style={{
          backgroundColor: "#ff0",
          padding: "1rem",
          textAlign: "center",
        }}
      >
        Front End is rendering
      </div>
      <header>
        <h1>Apartment Finder</h1>
        <button onClick={showHelp}>Help</button>
      </header>
      <main>
        <section id="search">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Max price"
          />
          <input
            type="number"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            placeholder="Bedrooms"
          />
          <button onClick={searchApartments}>Search</button>
          <button onClick={searchNearbyApartments}>Near Me</button>
          <button onClick={clearSearchFields}>Clear</button>
        </section>

        <section id="results">{results}</section>

        <section id="contact-form">
          <h2>Contact Agent</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
          ></textarea>
          <button onClick={sendMessageToAgent}>Send</button>
          <button onClick={clearContactForm}>Clear</button>
        </section>
      </main>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
