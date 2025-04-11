function searchApartments() {
  const location = document.getElementById("location").value;
  const price = document.getElementById("price").value;
  const bedrooms = document.getElementById("bedrooms").value;
  const results = document.getElementById("results");
  results.innerHTML = `Searching for apartments in ${location} under $${price} with ${bedrooms} bedrooms...`;
}

function searchNearbyApartments() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const results = document.getElementById("results");
      results.innerHTML = `Searching for apartments near (${latitude}, ${longitude})...`;
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

function sendMessageToAgent() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  alert(
    `Message sent to agent:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
  );
}

function setupEventListeners() {
  document
    .getElementById("search-btn")
    .addEventListener("click", searchApartments);
  document
    .getElementById("near-me-btn")
    .addEventListener("click", searchNearbyApartments);
  document
    .getElementById("send-btn")
    .addEventListener("click", sendMessageToAgent);
}

setupEventListeners();
