import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGames, createLobby } from '../../../actions/game';
import firebase from '../../../config/Firebase';
import CreateLobbyModal from './CreateLobbyModal';
import InfoAboutLobbyModal from './InfoAboutLobbyModal';
import LobbyList from './LobbyList';
import Loader from '../Loader';

class LobbyScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showInfoAboutLobbyModal: false,
			showCreateLobbyModal: false,
			uid: null,
		};
	}

	toggleInfoAboutLobbyModal(visible) {
		this.setState({ showInfoAboutLobbyModal: visible });
	}

	toggleCreateLobbyModal(visible) {
		this.setState({ showCreateLobbyModal: visible });
	}

	componentDidMount() {
		this.props.getGames();
	}

	handleSignout = () => {
		firebase.auth().signOut();
		this.props.navigation.navigate('Login');
	};

	handleCreateLobby = numberOfPlayers => {
		this.props.createLobby(numberOfPlayers);
		this.toggleCreateLobbyModal(false);
	};

	render() {
		const { navigate } = this.props.navigation;
		const styles = StyleSheet.create({
			container: {
				paddingVertical: 10,
				flex: 1,
				backgroundColor: '#000',
				alignItems: 'center',
				justifyContent: 'center',
			},
			text: {
				fontSize: 20,
				fontWeight: 'bold',
				color: '#fff',
			},
			scrollContainer: {
				marginTop: 30,
			},
			button: {
				marginTop: 10,
				marginBottom: 20,
				paddingVertical: 5,
				alignItems: 'center',
				backgroundColor: '#000',
				borderColor: '#fff',
				borderWidth: 1,
				borderRadius: 5,
				width: 200,
			},
			buttonText: {
				fontSize: 20,
				fontWeight: 'bold',
				color: '#fff',
			},
			modalFooter: {
				flexDirection: 'row',
			},
			modalResult: {
				width: 150,
				marginHorizontal: 20,
			},
		});
		return (
			<View style={styles.container}>
				<InfoAboutLobbyModal
					show={this.state.showInfoAboutLobbyModal}
					hideModal={visible => this.toggleInfoAboutLobbyModal(visible)}
				/>

				{this.props.games === null ? (
					<Loader />
				) : (
					<LobbyList
						games={this.props.games}
						toggleModal={visible => this.toggleInfoAboutLobbyModal(visible)}
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
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ getGames, createLobby }, dispatch);
};

const mapStateToProps = state => {
	return {
		games: state.game.games,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LobbyScreen);
