import React, { Component } from 'react';
import { StyleSheet, View, PanResponder, Animated, Text } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { withTheme } from 'react-native-paper';

class Draggable extends Component {
	constructor() {
		super();
		this.state = {
			showDraggable: true,
			dropAreaValues: null,
			pan: new Animated.ValueXY(),
			opacity: new Animated.Value(1),
		};
		this.val = { x: 0, y: 0 };
		this.state.pan.addListener(value => (this.val = value));
		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderGrant: () => {
				this.state.pan.setOffset(this.state.pan.__getValue());
				this.state.pan.setValue({ x: 0, y: 0 });
			},
			onPanResponderMove: Animated.event([
				null,
				{
					dx: this.state.pan.x,
					dy: this.state.pan.y,
				},
			]),
			onPanResponderRelease: (e, gesture) => {
				if (this.isDropArea(gesture)) {
					Animated.timing(this.state.opacity, {
						toValue: 0,
						duration: 1000,
					}).start(() =>
						this.setState({
							showDraggable: false,
						})
					);
				} else {
					Animated.spring(this.state.pan, {
						toValue: { x: 0, y: 0 },
						friction: 5,
					}).start();
				}
			},
		});
	}

	isDropArea(gesture) {
		return gesture.moveY < 400;
	}

	render() {
		const panStyle = {
			transform: this.state.pan.getTranslateTransform(),
		};
		return (
			<Card {...this.panResponder.panHandlers} style={[panStyle, styles.circle, { opacity: this.state.opacity }]}>
				<Card.Content>
					<Paragraph style={styles.text}>{this.props.text}</Paragraph>
				</Card.Content>
			</Card>
		);
	}
}

export default withTheme(Draggable);

let styles = StyleSheet.create({
	circle: {
		backgroundColor: 'white',
		marginTop: 10,
	},
	text: {
		fontSize: 20,
	},
});
