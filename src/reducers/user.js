import { LOGIN, SIGNUP, UPDATE_EMAIL, UPDATE_PASSWORD } from '../actions/user';

const INITIAL_STATE = { email: '', password: '' };

const user = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOGIN: {
			if (action.payload) {
				return action.payload;
			} else {
				return state;
			}
		}
		case SIGNUP:
			return action.payload;
		case UPDATE_EMAIL:
			return { ...state, email: action.payload };
		case UPDATE_PASSWORD:
			return { ...state, password: action.payload };
		default:
			return state;
	}
};

export default user;
