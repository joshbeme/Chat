import {createAppContainer, createStackNavigator} from 'react-navigation';
import Index from './index';

const stack = createStackNavigator({
    Home: Index
});

export default createAppContainer(stack);