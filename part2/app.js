const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();

const requireLogin = require('./middleware/auth');

// Middleware
app.use(express.json());
app.use(session({
    name: 'user.sid',
    secret: 'TriHai',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 6000,
        httpOnly: true
    }
}));

app.get('/owner-dashboard.html', requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'owner-dashboard.html'));
});
app.get('/owner-dashboard.html', requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'owner-dashboard.html'));
});

app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/walks', walkRoutes);
app.use('/users', userRoutes);

// Export the app instead of listening here
module.exports = app;
