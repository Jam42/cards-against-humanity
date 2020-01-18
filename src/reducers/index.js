import { combineReducers } from 'redux';
import user from './user';
import data from './data';
import game from './game';

const rootReducer = combineReducers({
	user,
	data,
	game,
});

export default rootReducer;
