const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const creditCheck = require('../middlewares/creditCheck');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
	app.get('/api/surveys/thanks', (req, res) => {
		res.send('Thanks for voting');
	});

	app.post('/api/surveys', requireLogin, creditCheck, async (req, res) => {
		const {title, body, subject, recipients} = req.body;

		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map((email) => ({email: email.trim()})),
			_user: req.user.id,
			dateSent: Date.now()
		});

		//create email
		const mailer = new Mailer(survey, surveyTemplate(survey));

		try {
			//send email
			await mailer.send();

			//save survey
			await survey.save();

			//charge 1 credit
			req.user.credits -= 1;

			//save user
			const user = await req.user.save();

			res.send(user);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
