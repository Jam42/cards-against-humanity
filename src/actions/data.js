import firebase, { db } from '../config/Firebase.js';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_ANSWERS = 'GET_ANSWERS';

export const getQuestions = () => {
	return async (dispatch, getState) => {
		try {
			let payload = [];
			const questions = await db
				.collection('questions')
				.get()
				.then(function(querySnapshot) {
					querySnapshot.forEach(function(doc) {
						payload.push(doc.data());
					});
				});
			dispatch({ type: GET_QUESTIONS, payload: payload });
		} catch (e) {
			alert(e);
		}
	};
};

export const getAnswers = () => {
	return async (dispatch, getState) => {
		try {
			let payload = [];
			const questions = await db
				.collection('answers')
				.get()
				.then(function(querySnapshot) {
					querySnapshot.forEach(function(doc) {
						payload.push(doc.data());
					});
				});
			dispatch({ type: GET_ANSWERS, payload: payload });
		} catch (e) {
			alert(e);
		}
	};
};
