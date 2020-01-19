import firebase, { db } from '../config/Firebase.js';

export const GET_GAMES = 'GET_GAMES';
export const CREATE_LOBBY = 'CREATE_LOBBY';

export const getGames = () => {
	return async (dispatch, getState) => {
		try {
			let payload = [];
			const questions = await db
				.collection('games')
				.get()
				.then(function(querySnapshot) {
					querySnapshot.forEach(function(doc) {
						const value = {
							...doc.data(),
							id: doc.id,
						};
						payload.push(value);
					});
				});
			dispatch({ type: GET_GAMES, payload: payload });
		} catch (e) {
			alert(e);
		}
	};
};

export const createLobby = numberOfPlayers => {
	return async (dispatch, getState) => {
		try {
			firebase.auth().onAuthStateChanged(user => {
				if (user) {
					const game = {
						name: user.email.substring(0, user.email.indexOf('@')),
						members: [user.uid],
						numberOfPlayers,
						started: false,
					};
					db.collection('games')
						.doc(user.uid)
						.set(game);

					dispatch({ type: CREATE_LOBBY, payload: game });
				}
			});
		} catch (e) {
			alert(e);
		}
	};
};
