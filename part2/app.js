const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();

const login = require('./')


// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
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

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;
