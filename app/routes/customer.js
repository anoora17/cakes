var express = require('express');
var router = express.Router();


	router.get('/login', function (req, res) {
		res.render('login')
	});

	router.get('/register', function (req, res) {
		res.render('register')
	});

	router.get('/order', function (req, res) {
		res.render('dashboard')
	});

	router.post('/register', function (req, res) {
		
		var firstname = req.body.firstname;
		var lastname  = req.body.lastname;
		var email     = req.body.email;
		var password  = req.body.password;
		var city      = req.body.city;
		var zipcode   = req.body.zipcode
		console.log(firstname)
	});

module.exports = router;
