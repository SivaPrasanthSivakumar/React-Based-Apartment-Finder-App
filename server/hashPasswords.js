const bcrypt = require("bcrypt");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "NearbyHomes",
});

async function hashPasswords() {
  const query = "SELECT id, password FROM users";
  db.query(query, async (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return db.end();
    }

    for (const user of results) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const updateQuery = "UPDATE users SET password = ? WHERE id = ?";
      db.query(updateQuery, [hashedPassword, user.id], (updateErr) => {
        if (updateErr) {
          console.error(
            `Error updating password for user ID ${user.id}:`,
            updateErr
          );
        } else {
          console.log(`Password updated for user ID ${user.id}`);
        }
      });
    }

    db.end();
  });
}

hashPasswords();
