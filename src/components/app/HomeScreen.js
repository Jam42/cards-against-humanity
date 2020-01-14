import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';

class HomeScreen extends Component {
	static navigationOptions = {
		title: 'Cards Against Humanity',
	};
	render() {
		const { navigate } = this.props.navigation;
		const styles = StyleSheet.create({
			container: {
				flex: 1,
				justifyContent: 'center',
				backgroundColor: '#000',
			},
			horizontal: {
				justifyContent: 'space-around',
				padding: 100,
			},
		});

		return (
			<View style={[styles.container, styles.horizontal]}>
				<Button
					color='gray'
					title='Start game'
					onPress={() => {
						navigate('Game');
					}}
				/>
			</View>
		);
	}
}

export default HomeScreen;
