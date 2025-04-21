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
  app.post("/api/apartments", (req, res) => addApartment(req, res, db));
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

function addApartment(req, res, db) {
  console.log("addApartment called with data:", req.body); 
  const { title, address, price, bedrooms, latitude, longitude } = req.body;

  if (!title || !address || !price || !bedrooms || !latitude || !longitude) {
    return res.status(400).send("All fields are required.");
  }

  if (latitude < -90 || latitude > 90) {
    return res.status(400).send("Latitude must be between -90 and 90.");
  }
  if (longitude < -180 || longitude > 180) {
    return res.status(400).send("Longitude must be between -180 and 180.");
  }

  const query =
    "INSERT INTO apartments (agent_id, title, address, price, bedrooms, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [1, title, address, price, bedrooms, latitude, longitude],
    (err) => {
      if (err) {
        console.error("Error adding apartment:", err);
        return res.status(500).send(`Error adding apartment: ${err.message}`);
      }
      res.status(201).send("Apartment added successfully.");
    }
  );
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
