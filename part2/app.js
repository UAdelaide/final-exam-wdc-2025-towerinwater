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

app.get('/index.html', requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;
