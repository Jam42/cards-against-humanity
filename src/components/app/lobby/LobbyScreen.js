import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { leaveLobby } from '../../../actions/game';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class LobbyScreen extends Component {
	render() {
		const styles = StyleSheet.create({
			container: {
				flex: 1,
				backgroundColor: '#000',
				alignItems: 'center',
				justifyContent: 'center',
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
		});

		const { game } = this.props.navigation.state.params;

		const name = `${game.name}'s lobby`;
		const currentNumberOfPlayers = Object.keys(game.members).length;
		const maxNumberOfPlayers = game.numberOfPlayers;

		return (
			<View style={[styles.container, styles.modalContainer]}>
				<Text style={styles.buttonText}>{name}</Text>
				<Text style={styles.buttonText}>
					{currentNumberOfPlayers}/{maxNumberOfPlayers} players
				</Text>
				<View style={styles.modalFooter}>
					<TouchableOpacity
						style={[styles.button, styles.bottomButton]}
						onPress={() => this.props.leaveLobby(game.id)}>
						<Text style={styles.buttonText}>Leave</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ leaveLobby }, dispatch);
};

const mapStateToProps = state => {
	return {
		games: state.games,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LobbyScreen);
