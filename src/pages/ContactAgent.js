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
  const [formData, setFormData] = useState(initialFormData());
  const handleInputChange = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const handleSubmit = async () => {
    try {
      await sendContactMessage(formData);
      alert("Message sent successfully!");
      clearForm();
    } catch (error) {
      handleSubmissionError(error);
    }
  };

  const clearForm = () => setFormData(initialFormData());

  return (
    <main>
      <ContactForm
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onClear={clearForm}
      />
    </main>
  );
}

function ContactForm({ formData, onInputChange, onSubmit, onClear }) {
  return (
    <section id="contact-form">
      <h2>Contact Agent</h2>
      <input
        type="text"
        value={formData.name}
        onChange={onInputChange("name")}
        placeholder="Your Name"
      />
      <input
        type="email"
        value={formData.email}
        onChange={onInputChange("email")}
        placeholder="Your Email"
      />
      <textarea
        value={formData.message}
        onChange={onInputChange("message")}
        placeholder="Message"
      ></textarea>
      <button onClick={onSubmit}>Send</button>
      <button onClick={onClear}>Clear</button>
    </section>
  );
}

function initialFormData() {
  return { name: "", email: "", message: "" };
}

async function sendContactMessage(data) {
  const response = await fetch("http://localhost:5000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to send message.");
}

function handleSubmissionError(error) {
  console.error("Error sending message:", error);
  alert("Failed to send message. Please try again.");
}
