import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput
} from "react-native";
// import store from './components/redux/store'

export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  static navigationOptions = {
    title: "Login",
    headerStyle: {
      backgroundColor: "#5e2f36",
    }
  };

  onLogin(){
    
  }

  componentDidMount() {}
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.options}>
          <View>
            <Text style={styles.text}>Email</Text>
            <TextInput placeholder="Ex. JohnDoe@gmai.com" />
          </View>
          <View>
            <Text style={styles.text}>Password</Text>
            <TextInput placeholder="Ex. DontUseThis35" />
          </View>
          <View
          style={styles.buttonContainer}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={()=>this.props.navigation.navigate('Friends')}
            >
              <Text>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3a5466"
  },
  text: {
    textAlign: "center",
    fontSize: 40
  },
  options: {
    height: 400,
    justifyContent: "space-between"
  },
  button:{
    alignItems: 'center',
    height: 40,
    width: 120,
    backgroundColor: "#6e3942",
    borderRadius: 4,
    padding: 9
    
  },
  buttonContainer:{
    alignItems: 'center'
  }
});
