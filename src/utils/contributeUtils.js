export function validateFormData({
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

  if (isNaN(price) || Number(price) <= 0 || !Number.isFinite(Number(price))) {
    return "Price must be a valid number (e.g., 1200.00).";
  }
  if (!Number.isInteger(Number(price) * 100)) {
    return "Price must have at most two decimal places.";
  }

  if (
    isNaN(bedrooms) ||
    !Number.isInteger(Number(bedrooms)) ||
    Number(bedrooms) <= 0
  ) {
    return "Bedrooms must be a valid whole number.";
  }

  if (address.length < 10) {
    return "Address must be at least 10 characters long.";
  }

  if (isNaN(latitude) || latitude < -90 || latitude > 90) {
    return "Latitude must be a valid number between -90 and 90.";
  }

  if (isNaN(longitude) || longitude < -180 || longitude > 180) {
    return "Longitude must be a valid number between -180 and 180.";
  }

  return null;
}

export async function submitApartment(data) {
  const response = await fetch("http://localhost:5000/api/apartments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(await response.text());
}

export function handleSubmissionError(error) {
  console.error("Error adding apartment:", error);
  alert(error.message || "Failed to add apartment. Please try again.");
}
