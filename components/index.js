import {createAppContainer, createStackNavigator} from 'react-navigation';
import Home from './home';

const stack = createStackNavigator({
    Home: Home
});

export default createAppContainer(stack);