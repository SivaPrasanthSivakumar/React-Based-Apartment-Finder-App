import React, { useState } from "react";
import "../styles.css";
import {
  validateFormData,
  submitApartment,
  handleSubmissionError,
} from "../utils/contributeUtils";

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
    <div className="page-container">
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
    </div>
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
