import React, { useState } from "react";
import "../styles.css";

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
    <div className="page-container">
      <main>
        <ContactForm
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onClear={clearForm}
        />
      </main>
    </div>
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
