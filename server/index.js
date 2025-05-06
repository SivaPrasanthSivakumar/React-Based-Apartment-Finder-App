const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;

setupMiddleware(app);
app.use(cors());

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

const cache = new Map(); 

setupApiEndpoints(app, db);

setupRootEndpoint(app);

startServer(app, PORT);

function setupMiddleware(app) {
  app.use(cors());
  app.use(bodyParser.json());
}

function setupApiEndpoints(app, db) {
  app.post("/api/login", (req, res) => userLogin(req, res, db));
  app.post("/api/signup", (req, res) => userSignup(req, res, db));

  app.get("/api/apartments", (req, res) => {
    console.log("GET /api/apartments called with query:", req.query);

    const cacheKey = JSON.stringify(req.query);
    if (cache.has(cacheKey)) {
      console.log("Serving from cache");
      return res.status(200).json(cache.get(cacheKey));
    }

    const { location, price, bedrooms } = req.query;
    const { query, params } = buildApartmentQuery(location, price, bedrooms);

    console.log("SQL Query:", query, "Params:", params);

    db.query(query, params, (err, results) => {
      if (err) {
        console.error("Error fetching apartments:", err);
        return res.status(500).send("Error fetching apartments.");
      }

      console.log("Query Results:", results);
      cache.set(cacheKey, results); 
      res.status(200).json(results.length ? results : []);
    });
  });

  app.post("/api/contact", (req, res) => {
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
  });

  app.post("/api/apartments", (req, res) => {
    console.log("POST /api/apartments called with data:", req.body);

    const { title, address, price, bedrooms, latitude, longitude } = req.body;

    if (!title || !address || !price || !bedrooms || !latitude || !longitude) {
      return res.status(400).send("All fields are required.");
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

        console.log("Apartment added successfully.");
        cache.clear(); 
        res.status(201).send("Apartment added successfully.");
      }
    );
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

async function userSignup(req, res, db) {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).send("All fields are required.");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      "INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, 'client')";

    db.query(query, [first_name, last_name, email, hashedPassword], (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).send("Email already exists.");
        }
        console.error("Error during signup:", err);
        return res.status(500).send("Error during signup.");
      }
      res.status(201).send("User registered successfully.");
    });
  } catch (err) {
    console.error("Error hashing password:", err);
    res.status(500).send("Error during signup.");
  }
}

function userLogin(req, res, db) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required.");
  }

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Error during login:", err);
      return res.status(500).send("Error during login.");
    }

    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Query Results:", results);

    if (results.length === 0) {
      return res.status(401).send("Invalid email or password.");
    }

    const user = results[0];

    console.log("Hashed Password from DB:", user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password Valid:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).send("Invalid email or password.");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
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
