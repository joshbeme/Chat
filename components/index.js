import {createAppContainer, createStackNavigator} from 'react-navigation';
import Home from './home';
import Login from './login'

const stack = createStackNavigator({
    Home:{screen: Home},
    Login: {screen: Login}
},
{
    initialRouteName: "Login"
});

export default createAppContainer(stack);