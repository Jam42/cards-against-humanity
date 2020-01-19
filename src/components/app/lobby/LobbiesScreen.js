import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGames, createLobby } from '../../../actions/game';
import firebase from '../../../config/Firebase';
import CreateLobbyModal from './CreateLobbyModal';
import InfoAboutLobbyModal from './InfoAboutLobbyModal';
import LobbiesList from './LobbiesList';
import Loader from '../Loader';

class LobbiesScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showInfoAboutLobbyModal: false,
			showCreateLobbyModal: false,
			id: null,
		};
	}

	toggleInfoAboutLobbyModal = (visible, id) => {
		this.setState({ showInfoAboutLobbyModal: visible, id: id });
	};

	toggleCreateLobbyModal = visible => {
		this.setState({ showCreateLobbyModal: visible });
	};

	componentDidMount = () => {
		this.props.getGames();
	};

	handleSignout = () => {
		firebase.auth().signOut();
		this.props.navigation.navigate('Login');
	};

	handleCreateLobby = numberOfPlayers => {
		this.props.createLobby(numberOfPlayers);
		this.toggleCreateLobbyModal(false);
	};

	joinLobby = id => {
		this.toggleInfoAboutLobbyModal(false, null);
		this.props.navigation.navigate('Lobby', { id: id });
	};

	render = () => {
		const { navigate } = this.props.navigation;
		const styles = StyleSheet.create({
			container: {
				paddingVertical: 10,
				flex: 1,
				backgroundColor: '#000',
				alignItems: 'center',
				justifyContent: 'center',
			},
			button: {
				marginTop: 10,
				marginBottom: 50,
				paddingVertical: 5,
				alignItems: 'center',
				backgroundColor: '#000',
				borderColor: '#fff',
				borderWidth: 1,
				borderRadius: 5,
				width: 200,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: 60,
			},
			buttonText: {
				fontSize: 20,
				fontWeight: 'bold',
				color: '#fff',
			},
		});

		const game = this.state.showInfoAboutLobbyModal
			? this.props.games.find(game => game.id === this.state.id)
			: { name: '', members: [], id: null };

		return (
			<View style={styles.container}>
				<InfoAboutLobbyModal
					show={this.state.showInfoAboutLobbyModal}
					id={this.state.id}
					game={game}
					hideModal={visible => this.toggleInfoAboutLobbyModal(visible, null)}
					joinLobby={uid => this.joinLobby(uid)}
				/>

				{this.props.games === null ? (
					<Loader />
				) : (
					<LobbiesList
						games={this.props.games}
						toggleModal={(visible, id) => this.toggleInfoAboutLobbyModal(visible, id)}
					/>
				)}

				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText} onPress={() => this.toggleCreateLobbyModal(true)}>
						Create Lobby
					</Text>
				</TouchableOpacity>

				<CreateLobbyModal
					show={this.state.showCreateLobbyModal}
					hideModal={visible => this.toggleCreateLobbyModal(visible)}
					createLobby={numberOfPlayers => this.handleCreateLobby(numberOfPlayers)}
				/>
			</View>
		);
	};
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ getGames, createLobby }, dispatch);
};

const mapStateToProps = state => {
	return {
		games: state.game.games,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LobbiesScreen);
