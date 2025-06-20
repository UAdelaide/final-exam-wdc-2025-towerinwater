const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/show_dogs', (req, res, next) => {
    const uid = req.session.user.user_id;
    try{
        const[rows] = db.query(
            ``,
            [uid]
        )
    }
});