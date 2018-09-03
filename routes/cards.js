const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcard.json');
const { cards } = data;

// Since the 'cards' root is defined in the use method in app.js, it is removed from the route below
router.get('/:id', (req, res) => {
	const { id } = req.params;
	console.log(req.params);
	const { side } = req.query;
	const text = cards[id][side];
	const { hint } = cards[id];

	const templateData = { id, text };
	if (side === 'question') {
		const td = templateData;
		td.hint = hint;
		td.displaySide = 'answer';
		td.displaySideText = 'Answer';
	} else if (side === 'answer') {
		const td = templateData;
		td.displaySide = 'question';
		td.displaySideText = 'Question';
	}

	res.render('index', templateData);
});

module.exports = router;
