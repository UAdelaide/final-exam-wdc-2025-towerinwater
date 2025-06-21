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

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, '/public')));


app.get('/api/dogs', async (req, res) => {
    try{
        const [rows] = await db.query(`
            SELECT
                d.name AS dog_name,
                d.size AS size,
                u.username AS owner_username
            FROM Dogs AS d
            INNER JOIN Users AS u ON
                d.owner_id = u.user_id
        `);
        res.json(rows);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch database.' });
    }
});

app.get('/api/walkrequests/open', async (req, res) => {
    try{
        const [rows] = await db.query(`
            SELECT
                wr.request_id,
                d.name AS dog_name,
                wr.requested_time,
                wr.duration_minutes,
                wr.location,
                u.username AS owner_username
            FROM WalkRequests AS wr
                INNER JOIN Dogs AS d ON wr.dog_id = d.dog_id
                INNER JOIN Users AS u ON d.owner_id = u.user_id
            WHERE wr.status = 'open'
        `);
        res.json(rows);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch database.' });
    }
});

app.get('/api/walkers/summary', async (req, res) => {
    try{
        const [rows] = await db.query(`
            SELECT
                u.username AS walker_username,
                COUNT(r.rating) AS total_ratings,
                ROUND(AVG(r.rating), 1) AS average_rating,
                COUNT(DISTINCT wa.request_id) AS completed_walks
            FROM Users u
                INNER JOIN WalkApplications wa
                    ON u.user_id = wa.walker_id AND wa.status = 'accepted'
                INNER JOIN WalkRatings r
                    ON u.user_id = r.walker_id
            WHERE u.role = 'walker'
            GROUP BY u.user_id, u.username
        `);
        res.json(rows);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch database.' });
    }
});


app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;