const express = require('express');
const router = express.Router();

// Since the 'cards' root is defined in the use method in app.js, it is removed from the route below
router.get('/', (req, res) => {
	res.render('index', {
		prompt: "Who is buried in Grant's tomb?",
		hint: 'Think about whose tomb it is.'
	});
});

module.exports = router;
