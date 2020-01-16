import { combineReducers } from 'redux';
import user from './user';
import data from './data';

const rootReducer = combineReducers({
	user,
	data,
});

export default rootReducer;
