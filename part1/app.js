//Taken from the starthere app.js code
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql2/promise');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let db;

(async () => {
    try {
        // Connect to MySQL without specifying a database
        const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '' // Set your MySQL root password
        });

        // Create the database if it doesn't exist
        await connection.query('CREATE DATABASE IF NOT EXISTS DogWalkService');
        await connection.end();

        // Now connect to the created database
        db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'DogWalkService'
        });

        await db.query(`
            INSERT INTO Users (username, email, password_hash, role) VALUES
                ('alice123',  'alice@example.com',  'hashed123', 'owner'),
                ('bobwalker', 'bob@example.com',    'hashed456', 'walker'),
                ('carol123',  'carol@example.com',  'hashed789', 'owner'),
                ('hai', 'hai@example.com',   'hashed888', 'owner'),
                ('phuong', 'phuong@example.com',    'hashed126', 'owner');

            INSERT INTO Dogs (name, size, owner_id) VALUES
                ('Max', 'medium', (SELECT user_id FROM Users WHERE username = 'alice123')),
                ('Onion', 'medium', (SELECT user_id FROM Users WHERE username = 'alice123')),
                ('Bella', 'small', (SELECT user_id FROM Users WHERE username = 'carol123')),
                ('Wi', 'large', (SELECT user_id FROM Users WHERE username = 'hai')),
                ('Bo', 'medium', (SELECT user_id FROM Users WHERE username = 'phuong'));

            INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES
                ((SELECT dog_id FROM Dogs WHERE name = 'Max'), '2025-06-10 08:00:00', 30, 'Parklands', 'open'),
                ((SELECT dog_id FROM Dogs WHERE name = 'Onion'), '2025-06-10 08:00:00', 30, 'Parklands', 'open'),
                ((SELECT dog_id FROM Dogs WHERE name = 'Bella'), '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted'),
                ((SELECT dog_id FROM Dogs WHERE name = 'Wi'), '2025-06-12 14:00:00', 100, 'Independence St', 'open'),
                ((SELECT dog_id FROM Dogs WHERE name = 'Bo'), '2025-06-20 15:10:00', 80, 'Independce Square', 'accepted'),
        `);

    } catch (err) {
        console.error('Error setting up database. Ensure Mysql is running: service mysql start', err);
    }
})();

// Route to return books as JSON
app.get('/api/dogs', async (req, res) => {
    
});

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;