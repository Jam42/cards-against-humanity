import { GET_GAMES, CREATE_LOBBY, JOIN_LOBBY, LEAVE_LOBBY } from '../actions/game';

const INITIAL_STATE = { games: null };

const game = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_GAMES: {
			return { ...state, games: action.payload };
		}
		case CREATE_LOBBY: {
			const games = state.games;
			games.push({ [action.payload.id]: action.payload });
			return { ...state, games: games };
		}
		case JOIN_LOBBY: {
			const { game_id, uid } = action.payload;
			const gameIndex = state.games.findIndex(game => game.id === game_id);
			const games = state.games;
			games[gameIndex].members = { ...games[gameIndex].members, [uid]: { id: uid, ready: true } };
			return {
				...state,
				games: games,
			};
		}
		case LEAVE_LOBBY: {
			const { game_id, uid } = action.payload;
			const gameIndex = state.games.findIndex(game => game.id === game_id);
			const { games } = state;
			delete games[gameIndex].members[uid];
			return {
				...state,
				games: games,
			};
		}
		default: {
			return state;
		}
	}
};

export default game;
