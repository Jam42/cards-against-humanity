import { GET_GAMES, CREATE_LOBBY } from '../actions/game';

const INITIAL_STATE = { games: null };

const game = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_GAMES: {
			return { ...state, games: action.payload };
		}
		case CREATE_LOBBY: {
			return { ...state, games: [...state.games, action.payload] };
		}
		default: {
			return state;
		}
	}
};

export default game;
