const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/hello', (req, res) => {
	res.render('hello');
});

app.post('/hello', (req, res) => {
	res.render('hello', { name: req.body.username });
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
