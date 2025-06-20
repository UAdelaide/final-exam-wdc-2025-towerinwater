const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/show_dogs', (req, res, next) => {
    const { uid } = req.body;
    const
    try{
        const[rows] = db.query(
            ``,
            [uid]
        )
    }
});