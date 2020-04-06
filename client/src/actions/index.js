import axios from 'axios';
import {FETCH_USER} from './types';

export const fetchUser = () => async (disp) => {
	const res = await axios.get('/api/current_user');
	disp({
		type: FETCH_USER,
		payload: res.data
	});
};

export const handleToken = (token) => async (disp) => {
	const res = await axios.post('/api/stripe', token);
	disp({
		type: FETCH_USER,
		payload: res.data
	});
};

export const submitSurvey = (values) => {
	return {type: 'submit_survey'};
};
