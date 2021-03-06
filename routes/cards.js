const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcard.json');
const { cards } = data;

// Since the 'cards' root is defined in the use method in server.js, it is removed from the route below
// Redirect user to a random question if user lands on the cards route
router.get('/', (req, res) => {
	const cardCount = cards.length;
	const randomId = Math.floor(Math.random() * cardCount);
	res.redirect(`/cards/${randomId}`);
});

router.get('/:id', (req, res) => {
	const cardCount = cards.length;
	const id = parseInt(req.params.id);

	// Check that id is a number and will match a card's index. If not, redirect to display a random question
	if (isNaN(id) || id < 0 || id > cardCount) {
		return res.redirect(`/cards`);
	}

	const { side } = req.query;

	// If query string is missing from URL, redirect to the correct path
	if (!side) {
		return res.redirect(`/cards/${id}?side=question`);
	}

	const { hint } = cards[id];
	const name = req.cookies.username;

	const templateData = { id, name };
	if (side === 'answer') {
		const td = templateData;
		td.text = cards[id].answer;
		td.flipSide = 'question';
		td.displaySide = 'answer';
	} else {
		// If side equals any other string, set side to question
		const td = templateData;
		td.text = cards[id].question;
		td.hint = hint;
		td.flipSide = 'answer';
		td.displaySide = 'question';
	}

	res.render('cards', templateData);
});

module.exports = router;
