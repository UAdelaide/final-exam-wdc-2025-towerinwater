const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/show_dogs', (req, res, next) => {
    var uid = null;

    if(req.session.user){
        uid = req.session.user.user_id;
    }
    else{
        return res.status(400).json({ message: 'Access Period Expired.' });
    }

    try{
        const[rows] = db.query(
            `SELECT name FROM Dogs WHERE owner_id = ?`,
            [uid]
        );

        res.status(200).send(rows);
    }
    catch(error){

    }
});