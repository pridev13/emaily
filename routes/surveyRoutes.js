const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const creditCheck = require('../middlewares/creditCheck');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
	app.post('/api/surveys', requireLogin, creditCheck, (req, res) => {
		const {title, body, subject, recipients} = req.body;

		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map((email) => ({email: email.trim()})),
			_user: req.user.id,
			dateSent: Date.now()
		});
	});
};
