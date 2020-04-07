const _ = require('lodash');
const {Path} = require('path-parser');
const {URL} = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const creditCheck = require('../middlewares/creditCheck');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		res.send('Thanks for voting');
	});

	app.post('/api/surveys/webhooks', (req, res) => {
		const p = new Path('/api/surveys/:surveyId/:choice');

		const events = _.chain(req.body)
			.map((el) => {
				const match = p.test(new URL(el.url).pathname);

				if (match && el.event === 'click') {
					return {email: el.email, ...match};
				}
			})
			.compact()
			.uniqBy('email', 'surveyId')
			.value();

		_.each(events, ({surveyId, email, choice}) => {
			Survey.updateOne(
				{
					_id: surveyId,
					recipients: {
						$elemMatch: {email: email, responded: false},
					},
				},
				{
					$inc: {[choice]: 1},
					lastResponded: new Date(),
					$set: {'recipients.$.responded': true},
				}
			).exec();
		});

		res.send({});
	});

	app.post('/api/surveys', requireLogin, creditCheck, async (req, res) => {
		const {title, body, subject, recipients} = req.body;

		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map((email) => ({email: email.trim()})),
			_user: req.user.id,
			dateSent: Date.now(),
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
