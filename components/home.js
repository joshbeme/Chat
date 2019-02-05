import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import {Provider} from 'react-redux';
// import store from './components/redux/store'

export default class App extends React.Component {

    componentDidMount(){
        this.props.navigation.navigate('Home')
    }
  render() {
    return (
    //   <Provider store={}>
      <View style={styles.container}>
              <Text style={styles.text}>Register or Log in to start chatting</Text>
      <View style={styles.options}>
      <Button style={styles.container} title="Register" onPress={()=>this.props.navigation.navigate('Register')}/>
      <Button style={styles.container} title="Login" onPress={()=>this.props.navigation.navigate('Login')} />
      </View>
      </View>
    //   </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    top: 0
  },
  options:{
    height: 100
  }
});
