import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';

const LobbiesList = props => {
	const styles = StyleSheet.create({
		scrollContainer: {
			marginTop: 70,
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

	return (
		<ScrollView style={styles.scrollContainer}>
			{props.games.map(game => (
				<TouchableOpacity
					key={game.id}
					style={styles.button}
					onPress={() => {
						props.toggleModal(true, game.id);
					}}>
					<Text style={styles.buttonText}>{game.name}</Text>
				</TouchableOpacity>
			))}
		</ScrollView>
	);
};

export default LobbiesList;
