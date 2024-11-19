const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");


const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your React app's URL if deployed
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(bodyParser.json()); // Middleware for parsing JSON request bodies

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "JoeMan@12", 
  database: "reg", 
});

// Test database connection
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to MySQL database!");
  }
});

// Root route
app.get('/', (req, res) => {
  res.json("From ai-chat-app side");
});

// Route to save a chat
app.post('/chats', (req, res) => {
  const { userMessage, botMessage } = req.body;
  const sql = "INSERT INTO chats (user_message, bot_message) VALUES (?, ?)";
  db.query(sql, [userMessage, botMessage], (err, result) => {
    if (err) {
      console.error("Error saving chat:", err);
      return res.status(500).json({ error: "Failed to save chat" });
    }
    res.status(200).json({ message: "Chat saved successfully!" });
  });
});

// Route to fetch all chat history
app.get('/chats', (req, res) => {
  const sql = "SELECT * FROM chats ORDER BY id DESC";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching chat history:", err);
      return res.status(500).json({ error: "Failed to fetch chat history" });
    }
    res.status(200).json(data);
  });
});

app.post('/signup', async (req, res) => { 
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const sql = "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)";
    db.query(sql, [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error("Error during registration:", err);

        // Check for duplicate email error (assuming unique constraint on email)
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ error: "Email already in use" });
        }

        return res.status(500).json({ error: "Failed to register user" });
      }

      res.status(200).json({ message: "Registration successful!" });
    });
  } catch (error) {
    console.error("Error during hashing or database operation:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});


// Start server
app.listen(8081, () => {
  console.log("Listening on port 8081...");
});
