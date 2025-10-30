// Importeer modules
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(express.static('private'));

// Database verbinding
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Bevolkingsregister',
});

db.connect(err => {
    if (err) return console.error('Database connection error:', err);
    console.log('Connected to MySQL');
});

// Route voor ophalen van adressen
app.get('/adressen', (req, res) => {
    db.query('SELECT * FROM Adres', (err, results) => {
        if (err) return res.status(500).send('Error fetching addresses');
        res.json(results);
    });
});

// Route voor toevoegen van een adres
app.post('/adres', (req, res) => {
    const { adres, woonplaats } = req.body;
    db.query('INSERT INTO Adres (Adres, Woonplaats) VALUES (?, ?)', [adres, woonplaats], (err) => {
        if (err) return res.status(500).send('Error adding address');
        res.status(201).send('Address added successfully');
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
