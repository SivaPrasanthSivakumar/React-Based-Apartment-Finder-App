const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MQLaccrol2345@",
  database: "NearbyHomes",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
  console.log("Connected to the MySQL database.");
});

// API endpoint to fetch apartments
app.get("/api/apartments", (req, res) => {
  console.log("GET /api/apartments called with query:", req.query);
  const { location, price, bedrooms } = req.query;

  let query = "SELECT * FROM apartments WHERE 1=1";
  const params = [];

  if (location) {
    query += " AND address LIKE ?";
    params.push(`%${location}%`);
  }
  if (price) {
    query += " AND price <= ?";
    params.push(price);
  }
  if (bedrooms) {
    query += " AND bedrooms = ?";
    params.push(bedrooms);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error fetching apartments:", err);
      return res.status(500).send("Error fetching apartments.");
    }
    if (!results || results.length === 0) {
      console.log("No apartments found.");
      return res.status(200).json([]);
    }
    console.log("Apartments found:", results.length);
    res.json(results);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
