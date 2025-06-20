const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/show', async (req, res) => {
    try{
        const [rows] = await db.query(`
            SELECT 
        `);
        res.status(200).json({ message: 'Successfully Loaded Info.', info: rows });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Errors.' });
    }
});

module.exports = router;