import React, {Component} from 'react';
import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import Friends from './components/friends';
import Search from './components/search';
import { Provider } from "react-redux";
import store from './components/redux/store';




const HomeStack = createStackNavigator({
  Home:Home,
  Login: Login,
  Register: Register
},
{
  initialRouteName: "Home"
});

const ChatStack = createMaterialBottomTabNavigator({
  Friends: Friends,
  Search
},
{
  initialRouteName: 'Friends',
  activeColor: '#f0edf6',
    inactiveColor: "#5e2f36",
  barStyle: { backgroundColor: '#3a5466' },
})

const Stack = createSwitchNavigator({
  HomeStack: HomeStack,
  ChatStack: ChatStack
},
{
  initialRouteName: "HomeStack"
})
// const stack= createStackNavigator({
//   HomeStack: homeStack,
//   ChatStack: chatStack 
// })

const AppContainer = createAppContainer(Stack);

class App extends Component{
  componentDidMount(){
    console.log("s")
  }
  render(){
    return(
      <Provider store={store} >
      <AppContainer />
      </Provider>
    )
  }
}

export default App;