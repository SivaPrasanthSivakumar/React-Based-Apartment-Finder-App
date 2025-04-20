import React, { useState } from "react";
import "../styles.css";

export default function SearchApartments() {
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const searchApartments = async () => {
    setLoading(true);
    setResults("");
    try {
      const data = await fetchApartments({ location, price, bedrooms });
      setResults(formatResults(data));
    } catch (error) {
      console.error("Error fetching apartments:", error);
      setResults("Error fetching apartments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => setResults("");

  return (
    <main>
      <section id="search">
        <h2>Search Apartments</h2>
        <input
          type="text"
          value={location}
          onChange={handleInputChange(setLocation)}
          placeholder="Enter location"
        />
        <input
          type="number"
          value={price}
          onChange={handleInputChange(setPrice)}
          placeholder="Max price"
        />
        <input
          type="number"
          value={bedrooms}
          onChange={handleInputChange(setBedrooms)}
          placeholder="Bedrooms"
        />
        <button onClick={searchApartments}>Search</button>
        <button onClick={clearResults}>Clear</button>
      </section>

      <section id="results">
        <h2>Results</h2>
        {loading ? <p>Loading...</p> : <pre>{results}</pre>}
      </section>
    </main>
  );
}

async function fetchApartments({ location, price, bedrooms }) {
  const query = `http://localhost:5000/api/apartments?location=${location}&price=${price}&bedrooms=${bedrooms}`;
  const response = await fetch(query);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
}

function formatResults(data) {
  return data.length
    ? data
        .map(
          (apartment) =>
            `${apartment.title} - $${apartment.price}, ${apartment.bedrooms} bedrooms, Address: ${apartment.address}`
        )
        .join("\n")
    : "No apartments found.";
}
