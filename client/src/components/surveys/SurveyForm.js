import _ from 'lodash';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {reduxForm, Field} from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
	renderFields() {
		return _.map(formFields, (field) => {
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
					onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
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

function validate(values) {
	const errors = {};

	_.each(formFields, ({name}) => {
		if (!values[name]) {
			errors[name] = 'Please enter a value';
		}
	});

	if (!errors.emails) {
		errors.emails = validateEmails(values.emails);
	}

	return errors;
}

export default reduxForm({
	validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
