import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loader = () => {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'center',
			backgroundColor: '#000',
		},
		horizontal: {
			flexDirection: 'row',
			justifyContent: 'space-around',
			padding: 10,
		},
	});

	return (
		<View style={[styles.container, styles.horizontal]}>
			<ActivityIndicator size='large' color='#fff' />
		</View>
	);
};

export default Loader;
