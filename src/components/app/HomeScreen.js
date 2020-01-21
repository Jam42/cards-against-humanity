import React, { Component } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import firebase from '../../config/Firebase';

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.handleSignout = this.handleSignout.bind(this);
	}

	handleSignout() {
		firebase.auth().signOut();
		this.props.navigation.navigate('Login');
	}

	render() {
		const { navigate } = this.props.navigation;
		const styles = StyleSheet.create({
			container: {
				flex: 1,
				backgroundColor: '#000',
				alignItems: 'center',
				justifyContent: 'center',
			},
			button: {
				marginTop: 30,
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
			<View style={[styles.container, styles.horizontal]}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						navigate('Lobbies');
					}}>
					<Text style={styles.buttonText}>Start Game</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={this.handleSignout}>
					<Text style={styles.buttonText}>Logout</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default HomeScreen;
