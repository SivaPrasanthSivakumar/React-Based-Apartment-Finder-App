const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
setupMiddleware(app);

// MySQL connection setup
const db = setupDatabaseConnection();

// API endpoints
setupApiEndpoints(app, db);

// Root endpoint
setupRootEndpoint(app);

// Start the server
startServer(app, PORT);

function setupMiddleware(app) {
  app.use(cors());
  app.use(bodyParser.json());
}

function setupDatabaseConnection() {
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "NearbyHomes",
  });

  db.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      process.exit(1);
    }
    console.log("Connected to the MySQL database.");
  });

  return db;
}

function setupApiEndpoints(app, db) {
  app.get("/api/apartments", (req, res) => fetchApartments(req, res, db));
  app.post("/api/contact", (req, res) => saveContactMessage(req, res, db));
}

function fetchApartments(req, res, db) {
  console.log("GET /api/apartments called with query:", req.query);
  const { location, price, bedrooms } = req.query;

  const { query, params } = buildApartmentQuery(location, price, bedrooms);
  console.log("SQL Query:", query, "Params:", params);

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error fetching apartments:", err);
      return res.status(500).send("Error fetching apartments.");
    }
    res.status(200).json(results.length ? results : []);
  });
}

function buildApartmentQuery(location, price, bedrooms) {
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

  return { query, params };
}

function saveContactMessage(req, res, db) {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("All fields are required.");
  }

  const query =
    "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)";
  db.query(query, [name, email, message], (err) => {
    if (err) {
      console.error("Error saving contact message:", err);
      return res.status(500).send("Error saving contact message.");
    }
    res.status(201).send("Message saved successfully.");
  });
}

function setupRootEndpoint(app) {
  app.get("/", (req, res) => {
    res.send(
      "Welcome to the NearbyHomes API! Use /api/apartments to fetch data."
    );
  });
}

function startServer(app, port) {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
