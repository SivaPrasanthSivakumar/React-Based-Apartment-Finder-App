# Apartment Finder Application

This is a modern full-stack application for finding apartments. The project includes a React frontend, a Node.js backend, and a MySQL database.

## Features

- Search for apartments by location, price, and number of bedrooms.
- View apartment locations on an interactive map.
- Contact agents directly through the application.
- Contribute new apartment listings.
- Responsive design for mobile and desktop users.
- User authentication with login and signup functionality.
- Optimized performance with caching for faster responses.

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [MySQL](https://www.mysql.com/)
- [XAMPP](https://www.apachefriends.org/) (optional, for managing MySQL)

## Setup Instructions

### 1. Clone the Repository

Clone the project to your local machine:

```bash
git clone https://github.com/SivaPrasanthSivakumar/CSIT537-Project-3.git
cd CSIT537-Project-3
```

### 2. Set Up the Database

1. Open **phpMyAdmin** or any MySQL client.
2. Run the SQL script located at `database/schema.sql` to create the database and populate it with sample data.

### 3. Configure the Backend

1. Navigate to the `server` folder:
   ```bash
   cd server
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   node index.js
   ```
   The backend will run on `http://localhost:5000`.

### 4. Configure the Frontend

1. Navigate to the project root:
   ```bash
   cd ..
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the React frontend:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`.

## Available Commands

### Backend Commands

- `node server/index.js`: Start the backend server.
- `npm run start:dev`: Start the backend server with live reload using `nodemon`.

### Frontend Commands

- `npm start`: Start the React development server.
- `npm run build`: Build the React application for production.
- `npm test`: Run tests for the React application.

## Testing the Application

1. Open the frontend in your browser at `http://localhost:3000`.
2. Use the search form to find apartments based on location, price, and bedrooms.
3. View apartment locations on the map.
4. Contribute new apartment listings through the "Contribute" page.
5. Contact agents through the "Contact Agent" page.

## Troubleshooting

- **Database Connection Issues**: Ensure the MySQL server is running and the credentials in `server/index.js` are correct.
- **Port Conflicts**: If `http://localhost:3000` or `http://localhost:5000` is already in use, update the ports in the respective configurations.
- **Environment Variables**: Ensure the `.env` file is properly configured with necessary environment variables like `JWT_SECRET`.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
