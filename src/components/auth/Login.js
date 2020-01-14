import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import firebase from '../../config/Firebase';
import { updateEmail, updatePassword, login, getUser } from '../../actions/user';

class Login extends React.Component {
	componentDidMount = () => {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.props.getUser(user.uid);
				if (this.props.user != null) {
					this.props.navigation.navigate('Home');
				}
			}
		});
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
				<TouchableOpacity style={styles.button} onPress={() => this.props.login()}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Signup')}>
					<Text style={styles.buttonText}>Sign up</Text>
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
	buttonSignup: {
		fontSize: 12,
	},
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateEmail, updatePassword, login, getUser }, dispatch);
};

const mapStateToProps = state => {
	return {
		user: state.user,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
