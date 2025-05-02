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
(1, 'Cozy Bungalow in Denver', '9834 Blake St, Denver, CO', 3046.34, 3, 39.747551, -104.989868),
(1, 'Luxury Apartment in San Diego', '9451 Harbor Dr, San Diego, CA', 3264.61, 1, 32.696134, -117.167587),
(1, 'Rustic Cottage in Phoenix', '2943 N Central Ave, Phoenix, AZ', 2092.61, 2, 33.501034, -112.075383),
(1, 'Family House in San Diego', '5355 Harbor Dr, San Diego, CA', 1982.80, 3, 32.704351, -117.167761),
(1, 'Family House in Las Vegas', '3459 Las Vegas Blvd, Las Vegas, NV', 3636.40, 2, 36.104099, -115.176657),
(1, 'Studio Loft in Miami', '536 Biscayne Blvd, Miami, FL', 3996.25, 4, 25.806106, -80.192630),
(1, 'Rustic Cottage in Miami', '2432 Biscayne Blvd, Miami, FL', 2890.16, 1, 25.810226, -80.192363),
(1, 'Luxury Apartment in Nashville', '1747 Broadway, Nashville, TN', 1449.59, 5, 36.160813, -86.783988),
(1, 'Beach House in Philadelphia', '276 Market St, Philadelphia, PA', 3306.59, 2, 39.956257, -75.163218),
(1, 'Modern Townhouse in Denver', '9411 Blake St, Denver, CO', 2357.98, 3, 39.751965, -104.987620),
(1, 'Studio Loft in Phoenix', '8286 N Central Ave, Phoenix, AZ', 1629.49, 1, 33.507083, -112.074586),
(1, 'Modern Townhouse in Chicago', '4764 S Lake Shore Dr, Chicago, IL', 1590.67, 2, 41.794708, -87.575153),
(1, 'Cozy Bungalow in Denver', '8791 Blake St, Denver, CO', 1376.81, 5, 39.744395, -104.993099),
(1, 'Cozy Bungalow in Denver', '2909 Blake St, Denver, CO', 3023.63, 2, 39.762619, -104.992217),
(1, 'Family House in San Diego', '2188 Harbor Dr, San Diego, CA', 2351.09, 4, 32.706559, -117.160288),
(1, 'Contemporary Loft in San Diego', '8564 Harbor Dr, San Diego, CA', 2345.90, 1, 32.707422, -117.165541),
(1, 'Rustic Cottage in San Diego', '6827 Harbor Dr, San Diego, CA', 1541.14, 1, 32.710455, -117.148207),
(1, 'Studio Loft in Austin', '7064 Congress Ave, Austin, TX', 3977.50, 5, 30.277026, -97.746600),
(1, 'Rustic Cottage in Austin', '5459 Congress Ave, Austin, TX', 2967.57, 5, 30.267042, -97.736086),
(1, 'Cozy Bungalow in Denver', '8468 Blake St, Denver, CO', 4510.39, 4, 39.757558, -104.991479),
(1, 'Beach House in Minneapolis', '5979 Nicollet Ave, Minneapolis, MN', 1870.93, 4, 44.950663, -93.276971),
(1, 'Beach House in Miami', '1882 Biscayne Blvd, Miami, FL', 4710.67, 2, 25.798142, -80.192635),
(1, 'Contemporary Loft in Denver', '2465 Blake St, Denver, CO', 4076.48, 2, 39.747768, -104.999077),
(1, 'Rustic Cottage in Austin', '3482 Congress Ave, Austin, TX', 1844.21, 1, 30.265714, -97.741834),
(1, 'Suburban Home in Philadelphia', '9692 Market St, Philadelphia, PA', 1550.88, 2, 39.962786, -75.166010),
(1, 'Contemporary Loft in Austin', '2542 Congress Ave, Austin, TX', 3178.02, 2, 30.276399, -97.737375),
(1, 'Studio Loft in Phoenix', '8945 N Central Ave, Phoenix, AZ', 1303.61, 5, 33.511501, -112.079201),
(1, 'Contemporary Loft in Philadelphia', '7245 Market St, Philadelphia, PA', 3766.91, 1, 39.949661, -75.176262),
(1, 'Studio Loft in Denver', '5442 Blake St, Denver, CO', 3590.19, 2, 39.751943, -104.996375),
(1, 'Cozy Bungalow in San Diego', '5731 Harbor Dr, San Diego, CA', 1176.52, 1, 32.708870, -117.165653),
(1, 'Family House in Miami', '4590 Biscayne Blvd, Miami, FL', 1906.61, 3, 25.807947, -80.197822),
(1, 'Modern Townhouse in San Diego', '1822 Harbor Dr, San Diego, CA', 2259.08, 5, 32.698170, -117.148528),
(1, 'Spacious Villa in Minneapolis', '4441 Nicollet Ave, Minneapolis, MN', 2563.12, 4, 44.949500, -93.274804),
(1, 'Contemporary Loft in Las Vegas', '7599 Las Vegas Blvd, Las Vegas, NV', 3770.95, 3, 36.094174, -115.169535),
(1, 'Spacious Villa in Phoenix', '618 N Central Ave, Phoenix, AZ', 1925.54, 4, 33.509991, -112.080828),
(1, 'Cozy Bungalow in Chicago', '5714 S Lake Shore Dr, Chicago, IL', 2334.22, 3, 41.797875, -87.579940),
(1, 'Rustic Cottage in Las Vegas', '9466 Las Vegas Blvd, Las Vegas, NV', 3111.43, 3, 36.104206, -115.167896),
(1, 'Modern Townhouse in Nashville', '3984 Broadway, Nashville, TN', 1112.07, 4, 36.161483, -86.785213),
(1, 'Rustic Cottage in Phoenix', '3594 N Central Ave, Phoenix, AZ', 2596.75, 2, 33.518782, -112.064005),
(1, 'Spacious Villa in Miami', '4710 Biscayne Blvd, Miami, FL', 2583.46, 2, 25.797303, -80.186638),
(1, 'Spacious Villa in Las Vegas', '3523 Las Vegas Blvd, Las Vegas, NV', 1042.94, 2, 36.108874, -115.172018),
(1, 'Luxury Apartment in Las Vegas', '1869 Las Vegas Blvd, Las Vegas, NV', 2872.44, 1, 36.101168, -115.178866),
(1, 'Studio Loft in San Diego', '6848 Harbor Dr, San Diego, CA', 3684.10, 5, 32.709234, -117.150880),
(1, 'Family House in Phoenix', '8186 N Central Ave, Phoenix, AZ', 2572.25, 1, 33.513123, -112.082365),
(1, 'Cozy Bungalow in Nashville', '1335 Broadway, Nashville, TN', 1838.68, 3, 36.166488, -86.788836),
(1, 'Luxury Apartment in San Diego', '465 Harbor Dr, San Diego, CA', 2487.88, 3, 32.705987, -117.159670),
(1, 'Contemporary Loft in San Diego', '2434 Harbor Dr, San Diego, CA', 3646.47, 2, 32.710632, -117.155775),
(1, 'Studio Loft in Philadelphia', '9457 Market St, Philadelphia, PA', 1201.10, 3, 39.960534, -75.165290),
(1, 'Luxury Apartment in Nashville', '7602 Broadway, Nashville, TN', 3072.89, 1, 36.171124, -86.776271),
(1, 'Modern Townhouse in Austin', '1895 Congress Ave, Austin, TX', 4964.39, 1, 30.284609, -97.739277),
(1, 'Beach House in Philadelphia', '1003 Market St, Philadelphia, PA', 4395.46, 1, 39.949305, -75.175103),
(1, 'Studio Loft in San Diego', '653 Harbor Dr, San Diego, CA', 3861.23, 4, 32.693647, -117.152125),
(1, 'Studio Loft in Nashville', '3900 Broadway, Nashville, TN', 4088.37, 3, 36.163822, -86.790970),
(1, 'Family House in Phoenix', '7141 N Central Ave, Phoenix, AZ', 3811.97, 1, 33.506418, -112.082565),
(1, 'Family House in Minneapolis', '569 Nicollet Ave, Minneapolis, MN', 1850.14, 4, 44.951346, -93.271873),
(1, 'Luxury Apartment in Chicago', '8919 S Lake Shore Dr, Chicago, IL', 3542.17, 1, 41.801753, -87.583715),
(1, 'Modern Townhouse in Minneapolis', '8978 Nicollet Ave, Minneapolis, MN', 1438.50, 4, 44.952547, -93.275805),
(1, 'Beach House in Denver', '2916 Blake St, Denver, CO', 2078.84, 2, 39.761975, -104.988027),
(1, 'Family House in San Diego', '9040 Harbor Dr, San Diego, CA', 4471.97, 5, 32.694425, -117.154453),
(1, 'Luxury Apartment in San Diego', '4851 Harbor Dr, San Diego, CA', 1829.94, 4, 32.706927, -117.162444),
(1, 'Suburban Home in Nashville', '5549 Broadway, Nashville, TN', 1937.19, 3, 36.170070, -86.781567),
(1, 'Cozy Bungalow in Austin', '3266 Congress Ave, Austin, TX', 2625.28, 5, 30.272611, -97.734347),
(1, 'Cozy Bungalow in San Diego', '8274 Harbor Dr, San Diego, CA', 4915.26, 3, 32.706083, -117.150252),
(1, 'Spacious Villa in Denver', '6754 Blake St, Denver, CO', 4753.16, 1, 39.759866, -104.999);