import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import HomeScreen from '../components/app/HomeScreen';
import GameScreen from '../components/app/GameScreen';

const SwitchNavigator = createStackNavigator(
	{
		Login: { screen: Login },
		Signup: { screen: Signup },
		Home: { screen: HomeScreen },
		Game: { screen: GameScreen },
	},
	{
		initialRouteName: 'Login',
	}
);

export default createAppContainer(SwitchNavigator);
