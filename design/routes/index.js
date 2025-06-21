var express = require('express');
var router = express.Router();

/* Taken from the models of part 2 */
const mysql = require('mysql2/promise');
const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	database: 'DogWalkService',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});

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
			
		}
		res.status(200).json({ message: 'Successfully Loaded Info.', info: rows });
	}
	catch (err) {
		console.log(err);
		res.status(500).json({ error: 'Internal Errors.' });
	}
});

module.exports = router;
