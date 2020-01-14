import React from 'react';
import firebase from '../../config/Firebase';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateEmail, updatePassword, signup } from '../../actions/user';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

class Signup extends React.Component {
	handleSignUp = () => {
		this.props.signup();
		this.props.navigation.navigate('Home');
	};

	render() {
		return (
			<View style={styles.container}>
				<TextInput
					style={styles.inputBox}
					value={this.props.user.email}
					onChangeText={email => this.props.updateEmail(email)}
					placeholder='Email'
					autoCapitalize='none'
				/>
				<TextInput
					style={styles.inputBox}
					value={this.props.user.password}
					onChangeText={password => this.props.updatePassword(password)}
					placeholder='Password'
					secureTextEntry={true}
				/>
				<TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
					<Text style={styles.buttonText}>Signup</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputBox: {
		width: '85%',
		margin: 10,
		padding: 15,
		fontSize: 16,
		borderColor: '#d3d3d3',
		borderBottomWidth: 1,
		textAlign: 'center',
		color: '#fff',
	},
	button: {
		marginTop: 30,
		marginBottom: 20,
		paddingVertical: 5,
		alignItems: 'center',
		backgroundColor: '#fff',
		borderColor: '#fff',
		borderWidth: 1,
		borderRadius: 5,
		width: 200,
	},
	buttonText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#000',
	},
	buttonSignup: {
		fontSize: 12,
	},
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateEmail, updatePassword, signup }, dispatch);
};

const mapStateToProps = state => {
	return {
		user: state.user,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
