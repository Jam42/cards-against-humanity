import React from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Loader from '../Loader';

const InfoAboutLobbyModal = props => {
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
		modalFooter: {
			flexDirection: 'row',
		},
		modalResult: {
			width: 150,
			marginHorizontal: 20,
		},
	});

	const name = `${props.game.name}'s lobby`;
	const currentNumberOfPlayers = props.game.members.length;
	const maxNumberOfPlayers = props.game.numberOfPlayers;

	return (
		<Modal
			animationType='fade'
			transparent={false}
			visible={props.show}
			onRequestClose={() => props.hideModal(false)}>
			<View style={[styles.container, styles.modalContainer]}>
				<Text style={styles.buttonText}>{name}</Text>
				<Text style={styles.buttonText}>
					{currentNumberOfPlayers}/{maxNumberOfPlayers} players
				</Text>
				<View style={styles.modalFooter}>
					<TouchableOpacity
						style={[styles.button, styles.modalResult]}
						onPress={() => props.hideModal(false)}>
						<Text style={styles.buttonText}>Cancel</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button, styles.modalResult]}
						onPress={() => props.joinLobby(props.game.id)}>
						<Text style={styles.buttonText}>Join</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

export default InfoAboutLobbyModal;
