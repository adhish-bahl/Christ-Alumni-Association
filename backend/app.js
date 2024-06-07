const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();
const axios = require('axios');
const CryptoJS = require("crypto-js");

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

// Signup
app.post('/api/signup', (req, res) => {
    const { username, password } = req.body;
    const query = 'INSERT INTO login(username, password) VALUES(?, ?)';

    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error inserting year:', err);
            res.status(500).send('Error Signing up');
            return;
        }
        res.status(200).send('Signed up successfully!');
    });
});

// Login
app.post('/api/login', (req, res) => {
    let { username, password } = req.body;
    password = CryptoJS.AES.decrypt(password, "alumni").toString(CryptoJS.enc.Utf8);

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

        const decryptedPassword = CryptoJS.AES.decrypt(user.password, "alumni").toString(CryptoJS.enc.Utf8);

        // if (password !== user.password) {
        if (password !== decryptedPassword) {
            return res.status(400).send('Invalid password');
        }

        // JWT
        const token = jwt.sign({ username: username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ token: token });

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


// Add Alumni
app.post('/api/register', async (req, res) => {
    try {
        const { name, dob, email, mobile, department, graduation_year, specialisation, extra_curricular, co_curricular } = req.body;

        // Fetch graduation year ID
        const [graduationYearRows] = await db.promise().query('SELECT id FROM g_year WHERE year = ?', [graduation_year]);
        const graduation_year_id = graduationYearRows[0].id;

        // Fetch department ID
        const [departmentRows] = await db.promise().query('SELECT id FROM department WHERE department = ?', [department]);
        const department_id = departmentRows[0].id;

        // Insert alumni data
        await db.promise().query('INSERT INTO alumni (name, dob, email, mobile, department_id, graduation_year_id, specialisation, extra_curricular_activities, co_curricular_activities) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, dob, email, mobile, department_id, graduation_year_id, specialisation, extra_curricular, co_curricular]);

        res.status(200).send('Alumni registered successfully');
    } catch (error) {
        console.error('Error registering alumni:', error);
        res.status(500).send('Server error');
    }
});

// Delete Alumni
app.post('/api/deleteAlumni', (req, res) => {
    const { alumniId } = req.body;
    const query = 'DELETE FROM alumni WHERE id = ?';
    
    db.query(query, [alumniId], (err, results) => {
        if (err) {
            console.error('Error inserting year:', err);
            res.status(500).send('Server error');
            return;
        }
        res.status(200).send('Alumni deleted successfully');
    });
});


// Search Alumni
app.get('/api/search', (req, res) => {
    const { name, graduation_year, department } = req.query;

    let query = 'SELECT a.id, a.name, d.department, g.year AS graduation_year, a.dob, a.email, a.mobile, a.specialisation, a.extra_curricular_activities, a.co_curricular_activities  FROM alumni a JOIN department d ON a.department_id = d.id JOIN g_year g ON a.graduation_year_id = g.id WHERE 1=1';

    const params = [];

    if (name) {
        query += ' AND a.name LIKE ?';
        params.push(`%${name}%`);
    }

    if (graduation_year) {
        query += ' AND g.year LIKE ?';
        params.push(`%${graduation_year}%`);
    }

    if (department) {
        query += ' AND d.department LIKE ?';
        params.push(`%${department}%`);
    }

    db.query(query, params, (err, results) => {
        if (err) {
            console.error('Error fetching alumni:', err);
            res.status(500).json({ error: 'Server error' });
            return;
        }
        res.json(results);
    });
});


// JWT

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.get('/api/protected-route', authenticateToken, (req, res) => {

});

app.get('/api/verify-token', verifyToken, (req, res) => {
    res.sendStatus(200);
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});