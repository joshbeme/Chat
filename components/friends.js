import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import { loadFriends } from "./redux/actions";

class Friends extends React.Component {
  static navigationOptions = {
    title: "Friends",
    headerStyle: {
      backgroundColor: "#5e2f36"
    },
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      friendsList: [],
      friendsData: {
        josh: "d4asd54s54a",
        eddie: "h54df6345fd4",
        Nat: "k45hg64k5reujy",
        Nittens: "4dsfa645df"
      },
      error: ""
    };
    this._onPress = this._onPress.bind(this);
    this.addPropsToState = this.addPropsToState;
  }

  addPropsToState() {
    let friends = [];

    Object.keys(this.state.friendsData).forEach(key => {
      friends.push({ key });
    });

    this.setState({
      friendsList: friends
    });
  }
  async fetchFriends(token){
    if(token){
    try{
      const response = await fetch("http://localhost:3000/friends", {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify(token)
    })
    const responseBody = await response.json();
    return responseBody};
    catch(err){
      return console.error(err);
    }}
    else{
      this.setState({
        error: "Sign in to look at friends"
      })
    }
  }
  componentDidMount() {
    this.addPropsToState;
    this.props.addFriends(this.state.friendsData);
    
  }

  _onPress() {
    console.log(this.props.friends.list);
  }
  render() {

    let friends = [];

    Object.keys(this.props.friends.list).forEach(key => {
      friends.push({ key });
    });
    friends.sort((a, b) => {
      console.log(a, b);
      return (
        a.key[0].toLowerCase().charCodeAt(0) -
        b.key[0].toLowerCase().charCodeAt(0)
      );
    });
    let lastItem = "";
    return (
      <View style={styles.container}>
        <View style={styles.padding} />
        <FlatList
          data={friends}
          renderItem={({ item }) => {
            if (lastItem.toLowerCase() !== item.key[0].toLowerCase()) {
              lastItem = item.key[0];
              return (
                <View>
                  <Text>{item.key[0].toUpperCase()}</Text>
                  <TouchableOpacity
                    onPress={this._onPress}
                    style={styles.friends}
                  >
                    <Text style={styles.text}>{item.key}</Text>
                  </TouchableOpacity>
                </View>
              );
            } else {
              return (
                <TouchableOpacity style={styles.friends}>
                  <Text style={styles.text}>{item.key}</Text>
                </TouchableOpacity>
              );
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4b738e"
  },
  text: {
    textAlign: "left",
    fontSize: 20,
    marginTop: 5,
    marginLeft: 25,
    color: "#5e2f36"
  },
  friends: {
    height: 70,
    backgroundColor: "#fff",
    marginBottom: 0,
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: { width: 50, height: 50 },
    borderColor: "#000000",
    borderWidth: 1
  },
  button: {
    alignItems: "center",
    height: 40,
    width: 120,
    backgroundColor: "#6e3942",
    borderRadius: 4,
    padding: 9
  },
  padding: {
    paddingTop: 25
  },
  buttonContainer: {
    alignItems: "center"
  }
});

const mapStateToProps = store => {
  return { friends: store.friends };
};

export default connect(
  mapStateToProps,
  { loadFriends }
)(Friends);
