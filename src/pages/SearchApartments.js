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
    if (!validateSearchCriteria(location, price, bedrooms)) return;

    setLoading(true);
    setResults("");
    try {
      const data = await fetchApartments({ location, price, bedrooms });
      setResults(formatResults(data));
    } catch (error) {
      handleSearchError(error);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => setResults("");

  return (
    <main>
      <SearchForm
        location={location}
        price={price}
        bedrooms={bedrooms}
        onLocationChange={handleInputChange(setLocation)}
        onPriceChange={handleInputChange(setPrice)}
        onBedroomsChange={handleInputChange(setBedrooms)}
        onSearch={searchApartments}
        onClear={clearResults}
      />
      <SearchResults loading={loading} results={results} />
    </main>
  );
}

function SearchForm({
  location,
  price,
  bedrooms,
  onLocationChange,
  onPriceChange,
  onBedroomsChange,
  onSearch,
  onClear,
}) {
  return (
    <section id="search">
      <h2>Search Apartments</h2>
      <input
        type="text"
        value={location}
        onChange={onLocationChange}
        placeholder="Enter location"
      />
      <input
        type="number"
        value={price}
        onChange={onPriceChange}
        placeholder="Max price"
      />
      <input
        type="number"
        value={bedrooms}
        onChange={onBedroomsChange}
        placeholder="Bedrooms"
      />
      <button onClick={onSearch}>Search</button>
      <button onClick={onClear}>Clear</button>
    </section>
  );
}

function SearchResults({ loading, results }) {
  return (
    <section id="results">
      <h2>Results</h2>
      {loading ? <p>Loading...</p> : <pre>{results}</pre>}
    </section>
  );
}

function validateSearchCriteria(location, price, bedrooms) {
  if (!location.trim() && !price.trim() && !bedrooms.trim()) {
    alert("Please provide at least one search criterion.");
    return false;
  }
  return true;
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

function handleSearchError(error) {
  console.error("Error fetching apartments:", error);
  alert("Error fetching apartments. Please try again later.");
}
