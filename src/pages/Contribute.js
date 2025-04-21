import React, { useState } from "react";
import "../styles.css";

export default function Contribute() {
  const [formData, setFormData] = useState(initialFormData());
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const handleSubmit = async () => {
    const validationError = validateFormData(formData);
    if (validationError) {
      setError(validationError);
      setSuccess("");
      return;
    }

    setError("");
    try {
      await submitApartment(formData);
      setSuccess("Apartment added successfully!");
      clearForm();
    } catch (error) {
      handleSubmissionError(error);
    }
  };

  const clearForm = () => setFormData(initialFormData());

  return (
    <main>
      <ContributeForm
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onClear={clearForm}
        error={error}
        success={success}
      />
    </main>
  );
}

function ContributeForm({
  formData,
  onInputChange,
  onSubmit,
  onClear,
  error,
  success,
}) {
  return (
    <section id="contribute-form">
      <h2>Contribute an Apartment</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <input
        type="text"
        value={formData.title}
        onChange={onInputChange("title")}
        placeholder="Apartment Title"
      />
      <input
        type="text"
        value={formData.address}
        onChange={onInputChange("address")}
        placeholder="Address"
      />
      <input
        type="text"
        value={formData.price}
        onChange={onInputChange("price")}
        placeholder="Price (e.g., 1200.00)"
      />
      <input
        type="text"
        value={formData.bedrooms}
        onChange={onInputChange("bedrooms")}
        placeholder="Number of Bedrooms"
      />
      <input
        type="text"
        value={formData.latitude}
        onChange={onInputChange("latitude")}
        placeholder="Latitude (e.g., 37.7749)"
      />
      <input
        type="text"
        value={formData.longitude}
        onChange={onInputChange("longitude")}
        placeholder="Longitude (e.g., -122.4194)"
      />
      <button onClick={onSubmit}>Submit</button>
      <button onClick={onClear}>Clear</button>
    </section>
  );
}

function initialFormData() {
  return {
    title: "",
    address: "",
    price: "",
    bedrooms: "",
    latitude: "",
    longitude: "",
  };
}

function validateFormData({
  title,
  address,
  price,
  bedrooms,
  latitude,
  longitude,
}) {
  if (
    !title.trim() ||
    !address.trim() ||
    !price.trim() ||
    !bedrooms.trim() ||
    !latitude.trim() ||
    !longitude.trim()
  ) {
    return "All fields are required.";
  }
  if (!/^\d+(\.\d{1,2})?$/.test(price)) {
    return "Price must be a valid number (e.g., 1200.00).";
  }
  if (!/^\d+$/.test(bedrooms)) {
    return "Bedrooms must be a valid whole number.";
  }
  if (address.length < 10) {
    return "Address must be at least 10 characters long.";
  }
  if (
    !/^[-+]?\d{1,2}(\.\d+)?$/.test(latitude) ||
    latitude < -90 ||
    latitude > 90
  ) {
    return "Latitude must be a valid number between -90 and 90.";
  }
  if (
    !/^[-+]?\d{1,3}(\.\d+)?$/.test(longitude) ||
    longitude < -180 ||
    longitude > 180
  ) {
    return "Longitude must be a valid number between -180 and 180.";
  }
  return null;
}

async function submitApartment(data) {
  const response = await fetch("http://localhost:5000/api/apartments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(await response.text());
}

function handleSubmissionError(error) {
  console.error("Error adding apartment:", error);
  alert(error.message || "Failed to add apartment. Please try again.");
}
