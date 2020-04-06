import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions/index';

const SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) => {
	const reviewFields = _.map(formFields, ({name, label}) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>{formValues[name]}</div>
			</div>
		);
	});

	return (
		<div>
			<h5>Please confirm</h5>
			<div>{reviewFields}</div>
			<button
				className="yellow white-text darken-3 btn-flat left"
				onClick={onCancel}
			>
				<i className="material-icons left">arrow_back</i>
				Back
			</button>
			<button
				className="green white-text btn-flat right"
				onClick={() => submitSurvey(formValues, history)}
			>
				Send
				<i className="material-icons right">email</i>
			</button>
		</div>
	);
};

function mapStateToProps(reduxState) {
	return {
		formValues: reduxState.form.surveyForm.values,
	};
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
