import React, { useState } from "react";
import "../styles.css";

export function SearchApartments() {
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(false);

  const searchApartments = async () => {
    setLoading(true);
    setResults("");
    try {
      const query = `http://localhost:5000/api/apartments?location=${location}&price=${price}&bedrooms=${bedrooms}`;
      const response = await fetch(query);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResults(
        data.length
          ? data
              .map(
                (apartment) =>
                  `${apartment.title} - $${apartment.price}, ${apartment.bedrooms} bedrooms, Address: ${apartment.address}`
              )
              .join("\n")
          : "No apartments found."
      );
    } catch (error) {
      console.error("Error fetching apartments:", error);
      setResults("Error fetching apartments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section id="search">
        <h2>Search Apartments</h2>
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
        <button onClick={() => setResults("")}>Clear</button>
      </section>

      <section id="results">
        <h2>Results</h2>
        {loading ? <p>Loading...</p> : <pre>{results}</pre>}
      </section>
    </main>
  );
}

export function ContactAgent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const sendMessageToAgent = async () => {
    try {
      const response = await sendContactMessage({ name, email, message });
      if (!response.ok) throw new Error("Failed to send message.");
      alert("Message sent successfully!");
      clearForm();
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <main>
      <section id="contact-form">
        <h2>Contact Agent</h2>
        <input
          type="text"
          value={name}
          onChange={handleInputChange(setName)}
          placeholder="Your Name"
        />
        <input
          type="email"
          value={email}
          onChange={handleInputChange(setEmail)}
          placeholder="Your Email"
        />
        <textarea
          value={message}
          onChange={handleInputChange(setMessage)}
          placeholder="Message"
        ></textarea>
        <button onClick={sendMessageToAgent}>Send</button>
        <button onClick={clearForm}>Clear</button>
      </section>
    </main>
  );
}

async function sendContactMessage(data) {
  return await fetch("http://localhost:5000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
