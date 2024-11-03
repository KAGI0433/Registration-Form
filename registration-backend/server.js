// server.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg'); // or mysql if using MySQL

const app = express();
app.use(express.json());
const pool = new Pool({ /* db config */ });

// Register route
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
        [name, email, hashedPassword]
    );
    const token = jwt.sign({ id: result.rows[0].id }, 'secret_key');
    res.json({ message: 'Registration successful', token });
});

// Google OAuth route
app.get('/auth/google', /* Google OAuth setup */);

app.listen(3000, () => console.log('Server running on port 3000'));
