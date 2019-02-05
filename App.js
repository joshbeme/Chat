import React, {Component} from 'react';
import Index from './components/navigation';
import {createAppContainer, createStackNavigator} from 'react-navigation'

class App extends Component{
  componentDidMount(){
    console.log("s")
  }
  render(){
    return(
      <Index />
    )
  }
}

export default App;