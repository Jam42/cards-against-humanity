import firebase, { db } from '../config/Firebase.js';

export const GET_GAMES = 'GET_GAMES';
export const CREATE_LOBBY = 'CREATE_LOBBY';
export const JOIN_LOBBY = 'JOIN_LOBBY';
export const LEAVE_LOBBY = 'LEAVE_LOBBY';

export const getGames = () => {
	return async (dispatch, getState) => {
		try {
			let games = [];
			await db
				.collection('games')
				.get()
				.then(async querySnapshot => {
					await querySnapshot.forEach(doc => {
						const value = {
							...doc.data(),
							id: doc.id,
						};
						games.push(value);
					});
					getMembers(games, dispatch);
				});
		} catch (e) {
			alert(e);
		}
	};
};

async function getMembers(games, dispatch) {
	let payload = [];
	try {
		games.forEach(async (game, index) => {
			const id = game.id;
			await db
				.collection('games')
				.doc(id)
				.collection('members')
				.get()
				.then(querySnapshot => {
					const members = [];
					querySnapshot.forEach(doc => {
						let member = doc.data();
						member = { [member.id]: { ready: member.ready } };
						members.push(member);
					});
					payload.push({ ...game, members });
					dispatch({ type: GET_GAMES, payload: payload });
				});
		});
	} catch (e) {
		alert(e);
	}
}

export const createLobby = numberOfPlayers => {
	return async (dispatch, getState) => {
		try {
			firebase.auth().onAuthStateChanged(user => {
				if (user) {
					const game = {
						id: user.uid,
						name: user.email.substring(0, user.email.indexOf('@')),
						numberOfPlayers,
						started: false,
					};
					db.collection('games')
						.doc(user.uid)
						.set(game)
						.then(() => {
							db.collection('games')
								.doc(user.uid)
								.collection('members')
								.doc(user.uid)
								.update({ ready: true });
						});

					dispatch({ type: CREATE_LOBBY, payload: game });
				}
			});
		} catch (e) {
			alert(e);
		}
	};
};

export const joinLobby = id => {
	return async (dispatch, getState) => {
		try {
			firebase.auth().onAuthStateChanged(user => {
				if (user) {
					db.collection('games')
						.doc(id)
						.collection('members')
						.doc(user.uid)
						.set({
							id: user.uid,
							ready: true,
						});

					dispatch({ type: JOIN_LOBBY, payload: { game_id: id, uid: user.uid } });
				}
			});
		} catch (e) {
			alert(e);
		}
	};
};

export const leaveLobby = id => {
	return async (dispatch, getState) => {
		try {
			firebase.auth().onAuthStateChanged(user => {
				if (user) {
					db.collection('games')
						.doc(id)
						.collection('members')
						.doc(user.uid)
						.delete()
						.then(() => {
							dispatch({ type: LEAVE_LOBBY, payload: { game_id: id, uid: user.uid } });
						});
				}
			});
		} catch (e) {
			alert(e);
		}
	};
};
