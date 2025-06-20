const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();

const { requireLogin, requireRole } = require('./middleware/auth');

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

app.get('/owner-dashboard.html', requireLogin, requireRole('owner'), (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'owner-dashboard.html'));
});
app.get('/walker-dashboard.html', requireLogin, requireRole('walker'), (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'walker-dashboard.html'));
});

app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');
const ownerRoutes = require('./routes/owner');
const walkerRoutes = require('./routes/walker');

app.use('/walks', walkRoutes);
app.use('/users', userRoutes);
app.use('/owner', ownerRoutes);
app.use('/walker', walkerRoutes);

// Export the app instead of listening here
module.exports = app;
