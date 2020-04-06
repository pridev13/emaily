import _ from 'lodash';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {reduxForm, Field} from 'redux-form';
import SurveyField from './SurveyField';

const FIELDS = [
	{label: 'Survey title', name: 'title'},
	{label: 'Subject line', name: 'subject'},
	{label: 'Email body', name: 'body'},
	{label: 'Recipient list', name: 'emails'}
];

class SurveyForm extends Component {
	renderFields() {
		return _.map(FIELDS, (field) => {
			return (
				<Field
					key={field.name}
					type="text"
					name={field.name}
					label={field.label}
					component={SurveyField}
				/>
			);
		});
	}

	render() {
		return (
			<div>
				<form
					onSubmit={this.props.handleSubmit((values) => console.log(values))}
				>
					{this.renderFields()}
					<Link to="/surveys" className="red btn-flat white-text left">
						Cancel
						<i className="material-icons right">cancel</i>
					</Link>
					<button className="teal btn-flat right white-text" type="submit">
						Done
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}

export default reduxForm({
	form: 'surveyForm'
})(SurveyForm);
