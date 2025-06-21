var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/show', async (req, res) => {
    try{
        const [rows] = await db.query(`
            SELECT * FROM Dogs
        `);
        res.status(200).json({ message: 'Successfully Loaded Info.', info: rows });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Errors.' });
    }
});

module.exports = router;
