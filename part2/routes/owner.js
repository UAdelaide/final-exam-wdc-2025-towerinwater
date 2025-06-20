const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/show_dogs', (req, res, next) => {
    if(req.session.user){
        const uid = req.session.user.user_id;
    }
    else{
        return res.status(400).json({message: 'Access Period Expired.'})
    }

    try{
        const[rows] = db.query(
            `SELECT name FROM Dogs WHERE owner_id = ?`,
            [uid]
        )
    }
});