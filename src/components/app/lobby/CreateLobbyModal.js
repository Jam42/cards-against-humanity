import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet, Picker } from 'react-native';

const CreateLobbyModal = props => {
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
		text: {
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
		picker: {
			alignSelf: 'stretch',
			backgroundColor: 'white',
			marginTop: 20,
			marginBottom: 50,
			marginHorizontal: 50,
		},
		pickerLabel: {
			marginTop: 40,
		},
	});

	const MIN_NUMBER_OF_USERS = 3;
	const MAX_NUMBER_OF_USERS = 9;

	let maxNumberOfPlayer = [];

	for (let index = MIN_NUMBER_OF_USERS; index <= MAX_NUMBER_OF_USERS; index++) {
		maxNumberOfPlayer.push(<Picker.Item key={index} label={index.toString()} value={index} />);
	}

	const [numberOfPlayers, setNumberOfPlayers] = useState(MIN_NUMBER_OF_USERS);

	return (
		<Modal
			animationType='none'
			transparent={false}
			visible={props.show}
			onRequestClose={() => props.hideModal(false)}>
			<View style={[styles.container, styles.modalContainer]}>
				<Text style={styles.text}>New Lobby</Text>
				<Text style={[styles.text, styles.pickerLabel]}>Max number of players</Text>
				<Picker
					mode='dropdown'
					selectedValue={numberOfPlayers}
					style={styles.picker}
					onValueChange={(itemValue, itemIndex) => setNumberOfPlayers(itemValue)}>
					{maxNumberOfPlayer}
				</Picker>
				<View style={styles.modalFooter}>
					<TouchableOpacity
						style={[styles.button, styles.modalResult]}
						onPress={() => props.hideModal(false)}>
						<Text style={styles.text}>Cancel</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button, styles.modalResult]}
						onPress={() => props.createLobby(numberOfPlayers)}>
						<Text style={styles.text}>Create</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

export default CreateLobbyModal;
