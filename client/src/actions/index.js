import axios from 'axios';
import {FETCH_USER, FETCH_SURVEYS} from './types';

export const fetchUser = () => async (disp) => {
	const res = await axios.get('/api/current_user');
	disp({
		type: FETCH_USER,
		payload: res.data,
	});
};

export const handleToken = (token) => async (disp) => {
	const res = await axios.post('/api/stripe', token);
	disp({
		type: FETCH_USER,
		payload: res.data,
	});
};

export const submitSurvey = (values, history) => async (disp) => {
	const res = await axios.post('/api/surveys', values);

	history.push('/surveys');

	disp({
		type: FETCH_USER,
		payload: res.data,
	});
};

export const fetchSurveys = () => async (disp) => {
	const res = await axios.get('/api/surveys');
	disp({
		type: FETCH_SURVEYS,
		payload: res.data
	});
};
