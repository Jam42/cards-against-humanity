import React from 'react';
import { StyleSheet, Text } from 'react-native';

const DropZone = props => {
	const { question } = props;

	const styles = StyleSheet.create({
		text: {
			marginTop: 35,
			marginLeft: 5,
			marginRight: 5,
			textAlign: 'center',
			color: '#fff',
			fontSize: 25,
			fontWeight: 'bold',
		},
	});
	return <Text style={styles.text}>{question.value}</Text>;
};

export default DropZone;
