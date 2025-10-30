// Importeer benodigde modules
const express = require('express'); // Express framework voor de server
const mysql = require('mysql2'); // MySQL driver voor database connectie
const bodyParser = require('body-parser'); // Voor het parsen van form data
const cors = require('cors'); // Voor cross-origin requests (niet strikt nodig voor lokale test)

const app = express(); // Maak een nieuwe Express applicatie
const port = 3000; // Poort waar de server op luistert

// Configureer body-parser middleware
app.use(bodyParser.urlencoded({ extended: true })); // Voor form data
app.use(bodyParser.json()); // Voor JSON data
app.use(cors()); // Sta cross-origin requests toe
app.use(express.static('public')); // Serveer statische bestanden uit de 'public' map

// Maak verbinding met de MySQL database
const db = mysql.createConnection({
    host: 'localhost', // Database host
    user: 'root', // Database gebruiker (vervang met je eigen gebruikersnaam)
    password: '', // Database wachtwoord (vervang met je eigen wachtwoord)
    database: 'Bevolkingsregister' // Database naam
});

// Verbinding maken met de database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Route voor het ophalen van alle adressen
app.get('/adressen', (req, res) => {
    const sql = 'SELECT * FROM Adres'; // SQL query om alle adressen op te halen
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching addresses:', err);
            res.status(500).send('Error fetching addresses');
            return;
        }
        res.json(results); // Stuur de resultaten als JSON terug
    });
});

// Route voor het toevoegen van een nieuw adres
app.post('/adres', (req, res) => {
    const { adres, woonplaats } = req.body; // Haal adres en woonplaats uit het request body
    const sql = 'INSERT INTO Adres (Adres, Woonplaats) VALUES (?, ?)'; // SQL query met placeholders
    db.query(sql, [adres, woonplaats], (err, result) => {
        if (err) {
            console.error('Error adding address:', err);
            res.status(500).send('Error adding address');
            return;
        }
        res.status(201).send('Address added successfully'); // Stuur succesbericht terug
    });
});

// Start de server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});