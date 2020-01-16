import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import firebase from '../../config/Firebase';
import { getQuestions, getAnswers } from '../../actions/data';
import Draggable from './Draggable';
import DropZone from './DropZone';

class GameScreen extends Component {
	componentDidMount() {
		this.props.getQuestions();
		this.props.getAnswers();
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

		const { questions, answers } = this.props;

		if (answers.length > 0 && questions.length > 0) {
			const currentQuestion = this.getRandom(questions, 1)[0];
			return (
				<PaperProvider>
					<View style={styles.container}>
						<View style={styles.dropZone}>
							<DropZone question={currentQuestion} />
						</View>
						<View style={styles.row}>
							{this.getRandom(answers, 3).map(answer => {
								return <Draggable key={answer.value} text={answer.value} />;
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

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ getQuestions, getAnswers }, dispatch);
};

const mapStateToProps = state => {
	return {
		questions: state.data.questions,
		answers: state.data.answers,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
