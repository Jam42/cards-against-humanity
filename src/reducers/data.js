import { GET_QUESTIONS, GET_ANSWERS } from '../actions/data';

const INITIAL_STATE = { questions: [], answers: [] };

const data = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_QUESTIONS: {
			return { ...state, questions: action.payload };
		}
		case GET_ANSWERS:
			return { ...state, answers: action.payload };
		default: {
			return state;
		}
	}
};

export default data;
