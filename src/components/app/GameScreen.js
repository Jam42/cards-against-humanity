import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import firebase from '../../config/Firebase';
import Draggable from './Draggable';
import DropZone from './DropZone';

export default class GameScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPick: null,
			answers: [],
			questions: [],
			loaded: false,
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData() {
		firebase
			.database()
			.ref('questions')
			.on('value', snapshot => {
				const questions = snapshot.val().filter(question => question);
				this.setState({
					questions,
				});
			});
		firebase
			.database()
			.ref('answers')
			.on('value', snapshot => {
				const answers = snapshot.val().filter(answer => answer);
				this.setState({
					answers,
				});
			});
	}

	getRandom(arr, n) {
		var result = new Array(n),
			len = arr.length,
			taken = new Array(len);
		if (n > len) throw new RangeError('getRandom: more elements taken than available');
		while (n--) {
			var x = Math.floor(Math.random() * len);
			result[n] = arr[x in taken ? taken[x] : x];
			taken[x] = --len in taken ? taken[len] : len;
		}
		return result;
	}

	render() {
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
			dropZone: {
				height: 400,
			},
			row: {
				backgroundColor: '#000',
			},
		});

		if (this.state.answers.length > 0 && this.state.questions.length > 0) {
			const { questions, answers, currentPick } = this.state;
			const currentQuestion = this.getRandom(questions, 1)[0];
			return (
				<PaperProvider>
					<View style={styles.container}>
						<View style={styles.dropZone}>
							<DropZone question={currentQuestion} />
						</View>
						<View style={styles.row}>
							{this.getRandom(answers, 3).map(text => {
								return <Draggable key={text} text={text} currentPick={currentPick} />;
							})}
						</View>
					</View>
				</PaperProvider>
			);
		} else {
			return (
				<View style={[styles.container, styles.horizontal]}>
					<ActivityIndicator size='large' color='#fff' />
				</View>
			);
		}
	}
}
