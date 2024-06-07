const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 8000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM login WHERE username = ?';

    db.query(query, [username], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error logging in');
        }
        if (results.length === 0) {
            return res.status(400).send('User not found');
        }

        const user = results[0];
        if (password !== user.password) {
            return res.status(400).send('Invalid password');
        }

        res.status(200).json({ message: 'Login successful' });

    });
});

// Add Year
app.post('/api/add-year', (req, res) => {
    const { year } = req.body;
    const query = 'INSERT INTO g_year (year) VALUES (?)';

    db.query(query, [year], (err, results) => {
        if (err) {
            console.error('Error inserting year:', err);
            res.status(500).send('Server error');
            return;
        }
        res.status(200).send('Year added successfully');
    });
});

// Add Department
app.post('/api/add-department', (req, res) => {
    const { department } = req.body;
    const query = 'INSERT INTO department (department) VALUES (?)';

    db.query(query, [department], (err, results) => {
        if (err) {
            console.error('Error inserting department:', err);
            res.status(500).send('Server error');
            return;
        }
        res.status(200).send('Department added successfully');
    });
});

// Fetch department
app.get('/api/department', (req, res) => {
    const query = 'SELECT * FROM department';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching departments:', err);
            res.status(500).json({ error: 'Server error' });
            return;
        }
        res.json(results);
    });
});

// Fetch graduation years
app.get('/api/graduation-year', (req, res) => {
    const query = 'SELECT * FROM g_year';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching graduation years:', err);
            res.status(500).json({ error: 'Server error' });
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});