const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/show_dogs', (req, res, next) => {
    if(req.session.user){
        const uid = req.session.user.user_id;
    }
    else{
        return res.status(404).
    }

    try{
        const[rows] = db.query(
            ``,
            [uid]
        )
    }
});