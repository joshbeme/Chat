import React, {Component} from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import Home from './components/home';


const stack = createStackNavigator({
  Home: Home
},
{
  initialRouteName: "Home"
});

const AppContainer = createAppContainer(stack)

class App extends Component{
  componentDidMount(){
    console.log("s")
  }
  render(){
    return(
      <AppContainer />
    )
  }
}

export default App;