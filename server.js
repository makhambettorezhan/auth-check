const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const db = require('./db.js');

var port = process.env.PORT || 3000;

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page'
    });
});

app.post('/submit', (req, res) => {
	var login = req.body.login;
	var password = req.body.password;

	if(db.addUser({login, password})) {
		res.render('submit.hbs', {
			message: 'Welcome to our site',
			login
		});
	} else {
		res.render('submit.hbs', {
			message: 'Sorry, the account with the same name already exists.'
		});
	}
});

app.listen(port, () => {
    console.log('Server is up for port ', port);
});