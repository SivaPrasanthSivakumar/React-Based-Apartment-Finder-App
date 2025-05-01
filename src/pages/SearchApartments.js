import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "../styles.css";

export function validateSearchCriteria(location, price, bedrooms) {
  if (!location.trim() && !price.trim() && !bedrooms.trim()) {
    alert("Please provide at least one search criterion.");
    return false;
  }
  return true;
}

export async function fetchApartments({ location, price, bedrooms }) {
  const query = `http://localhost:5000/api/apartments?location=${location}&price=${price}&bedrooms=${bedrooms}`;
  const response = await fetch(query);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
}

export function formatResults(data) {
  return data.length
    ? data
        .map(
          (apartment) =>
            `${apartment.title} - $${apartment.price}, ${apartment.bedrooms} bedrooms, Address: ${apartment.address}`
        )
        .join("\n")
    : "No apartments found.";
}

export function handleSearchError(error) {
  console.error("Error fetching apartments:", error);
  alert("Error fetching apartments. Please try again later.");
}

const locationIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function SearchApartments() {
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const searchApartments = async () => {
    if (!validateSearchCriteria(location, price, bedrooms)) return;

    setLoading(true);
    setResults([]);
    try {
      const data = await fetchApartments({ location, price, bedrooms });
      setResults(data);
    } catch (error) {
      handleSearchError(error);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => setResults([]);

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
      <MapView apartments={results} />
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
      {loading ? <p>Loading...</p> : <pre>{formatResults(results)}</pre>}
    </section>
  );
}

function MapView({ apartments }) {
  const defaultPosition = [37.7749, -122.4194]; // Default to San Francisco

  return (
    <section id="map-view">
      <h2>Map View</h2>
      <MapContainer
        center={defaultPosition}
        zoom={12}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {apartments.map((apartment) => (
          <Marker
            key={apartment.id}
            position={[apartment.latitude, apartment.longitude]}
            icon={locationIcon}
          >
            <Popup>
              <strong>{apartment.title}</strong>
              <br />
              {apartment.address}
              <br />${apartment.price}, {apartment.bedrooms} bedrooms
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
}
