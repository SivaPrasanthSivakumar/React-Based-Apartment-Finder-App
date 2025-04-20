CREATE DATABASE IF NOT EXISTS NearbyHomes;

USE NearbyHomes;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    role ENUM('client', 'agent', 'admin')
);

-- Apartments table
CREATE TABLE IF NOT EXISTS apartments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    agent_id INT,
    title VARCHAR(200),
    address TEXT,
    price DECIMAL(10,2),
    bedrooms INT,
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    listed_date DATETIME DEFAULT NOW(),
    FOREIGN KEY (agent_id) REFERENCES users(id)
);

-- Add a table for storing contact messages
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    submitted_at DATETIME DEFAULT NOW()
);

-- Insert sample users
INSERT INTO users (first_name, last_name, email, password, role)
VALUES
('John', 'Doe', 'john.doe@example.com', 'password123', 'agent'),
('Jane', 'Smith', 'jane.smith@example.com', 'password123', 'client'),
('Admin', 'User', 'admin@example.com', 'adminpassword', 'admin');

-- Insert sample apartments
INSERT INTO apartments (agent_id, title, address, price, bedrooms, latitude, longitude)
VALUES
(1, 'Cozy 2-Bedroom Apartment', '123 Main St, Springfield', 1200.00, 2, 37.7749, -122.4194),
(1, 'Luxury 3-Bedroom Condo', '456 Elm St, Springfield', 2500.00, 3, 37.8044, -122.2711),
(1, 'Affordable Studio Apartment', '789 Oak St, Springfield', 800.00, 1, 37.3382, -121.8863);