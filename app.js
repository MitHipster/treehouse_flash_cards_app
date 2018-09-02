const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
	const name = req.cookies.username;
	if (name) {
		res.render('index', { name });
	} else {
		res.redirect('/hello');
	}
});

app.get('/hello', (req, res) => {
	const name = req.cookies.username;
	if (!name) {
		res.render('hello');
	} else {
		res.redirect('/');
	}
});

app.post('/hello', (req, res) => {
	res.cookie('username', req.body.username);
	res.redirect('/');
});

app.post('/goodbye', (req, res) => {
	res.clearCookie('username');
	res.redirect('/hello');
});

app.get('/cards', (req, res) => {
	res.render('index', {
		prompt: "Who is buried in Grant's tomb?",
		hint: 'Think about whose tomb it is.'
	});
});

app.listen(3000, () => {
	console.log('Application running on localhost:3000');
});
