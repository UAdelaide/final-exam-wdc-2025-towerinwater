var express = require('express');
var router = express.Router();
const db = require('')

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

/* From part 2 dog router */
router.get('/show', async (req, res) => {
	try {
		const [rows] = await db.query(`
            SELECT * FROM Dogs
        `);
		if(rows.length === 0){
			res.status(404).json({ error: 'Empty List' });
		}
		res.status(200).json({ message: 'Successfully Loaded Info.', info: rows });
	}
	catch (err) {
		console.log(err);
		res.status(500).json({ error: 'Internal Errors.' });
	}
});

module.exports = router;
