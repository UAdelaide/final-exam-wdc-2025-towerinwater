const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/dogs', async (req, res) => {
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

module.exports = router;