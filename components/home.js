import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { Provider } from "react-redux";
// import store from './components/redux/store'

export default class App extends React.Component {
  constructor(props){
    super(props);
  };
  static navigationOptions = ({navigation}) =>{
    return {
      header: null
    }
  }

  _onPress(){
    this.props.navigation.navigate('Login')
  }
  componentDidMount() {
  }
  render() {
    return (
      //   <Provider store={}>
      <View style={styles.container}>
        <Text style={styles.title}>Babel On</Text>
        <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={styles.text} >
            Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={styles.text} >
            Login
          </Text>
        </TouchableOpacity>
        </View>
      </View>
      //   </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3a5466",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    alignSelf: "center"
    
  },
  options: {
    height: 100
  },
  buttons:{
    height: 200,
    justifyContent: "space-evenly"
  },
  button:{
    alignItems: 'center',
    height: 40,
    width: 170,
    backgroundColor: "#6e3942",
    borderRadius: 4,
    padding: 9
    
  },
  title:{
    fontSize: 60,
    fontFamily: "Roboto",
    padding: 20
  }
});
