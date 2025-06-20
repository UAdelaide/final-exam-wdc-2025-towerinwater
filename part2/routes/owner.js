const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/show_dogs', (req, res, next) => {
    var uid = null;

    if(req.session.user){
        uid = req.session.user.user_id;
    }
    else{
        return res.status(400).json({ error: 'Access Period Expired.' });
    }

    try{
        const[rows] = db.query(
            `SELECT name FROM Dogs WHERE owner_id = ?`,
            [uid]
        );

        res.status(200).json({ message: 'Successfully Loaded Info', info: rows });
    }
    catch(error){
        res.status(500).json({ error: 'Interal Server Error '});
    }
});