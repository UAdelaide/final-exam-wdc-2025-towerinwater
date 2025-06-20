const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET all users (for admin/testing)
router.get('/', async (req, res) => {
	try {
		const [rows] = await db.query('SELECT user_id, username, email, role FROM Users');
		res.json(rows);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch users' });
	}
});

// POST a new user (simple signup)
router.post('/register', async (req, res) => {
	const { username, email, password, role } = req.body;

	try {
		const [result] = await db.query(`
      INSERT INTO Users (username, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `, [username, email, password, role]);

		res.status(201).json({ message: 'User registered', user_id: result.insertId });
	} catch (error) {
		res.status(500).json({ error: 'Registration failed' });
	}
});

router.get('/me', (req, res) => {
	if (!req.session.user) {
		/* Put some more log error message */
		return res.status(401).json({ error: 'Not logged in' });
	}
	/* Successful log message when  */
	res.status(200).json({ message: 'Successfully Loaded Info', info: req.session.user.user_id });
});

/* Updated POST of login */
router.post('/login', async (req, res) => {
	const { username, password } = req.body;

	try {
		const [rows] = await db.query(`
			SELECT user_id, username, role, email FROM Users
			WHERE username = ? AND password_hash = ?
		`, [username, password]);

		if (rows.length === 0) {
			return res.status(401).json({ error: 'Invalid credentials' });
		}

		const user = rows[0];

		req.session.user = { username: user.username, user_id: user.user_id, role: user.role };

		res.json({ message: 'Login successful', user });
	} catch (error) {
		res.status(500).json({ error: 'Login failed' });
	}
});

/* Newly written logout */
router.post('/logout', (req, res) => {
	req.session.destroy((err) => {
		if(err){
			return res.status(500).json({ error: 'Server Error' });
		}
		//Clear the cookies when no errors occur.
		res.clearCookie('user.sid');
		return res.status(200).json({ message: 'Successfully Logout' });
	});
});

module.exports = router;