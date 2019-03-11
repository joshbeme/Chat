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

export default class Search extends React.Component {
  static navigationOptions = {
    title: "Search",
    headerStyle: {
      backgroundColor: "#5e2f36",
    },
    header: null
  };
  constructor(props){
      super(props);
      this.state={
          input: '',
          fakeData: [
              "Joshbeme",
              "Eddiebeme",
              "Natbeme",
              "Alfiebeme",
              "Alfonse"
          ],
          searchDisplay: []
      }
      this._onChange = this._onChange.bind(this);
      this.displayNames = this.displayNames.bind(this);
  }

 _onChange(item){
    console.log(this.state.input)
    this.setState({
          input: item
      });
     this.displayNames(item)
  }
 displayNames(item){

console.log(item)
if(item.length){

    function mapping(val){
      const strang = '^'+item+'*'
      
      const regex1 = new RegExp(strang, 'i')

      if(regex1.test(val)){
        console.log("ping")
        let obj = new Object
        obj.key = val
       newList.push(obj)
      }
    }
    let newList = []
    console.log(newList)
    this.state.fakeData.forEach((val)=>mapping(val))
   return this.setState({
      searchDisplay: newList
    })
  };
  }


  componentDidMount() {}
  render() {
    
    return (
      <View style={styles.container}>
      <View style={styles.inputContainer} >
      <Text style={styles.inputText} >Search</Text>
      <TextInput
        onChangeText={(text)=>this._onChange(text)}
        style={styles.input}
        value={this.state.input}
        placeholder="Search"
      ></TextInput></View>
      <View style={styles.listContainer}><FlatList
      data={this.state.searchDisplay}
      renderItem={({item})=>{
        return<View style={styles.result}><Text>{item.key}</Text><TouchableOpacity style={styles.button}><Text>ADD</Text></TouchableOpacity></View>
      }}
      /></View> 
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4b738e",
  },
  listContainer:{
    marginTop: 20
  },
  text: {
    textAlign: "left",
    fontSize: 20,
    marginTop: 5,
    marginLeft: 25,
    color: '#5e2f36'
  },
  result:{
    flex:1,
      height: 60,
      backgroundColor: "#fff",
      borderRadius: 1,
      padding: 9,
      paddingTop: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      fontSize: 20,
      marginTop:2,
  },
  button:{
    alignItems: 'center',
    height: 30,
    width: 55,
    backgroundColor: "#6e3942",
    borderRadius: 4,
    padding:5
    
  },
  inputText:{
    marginLeft: 20,
    fontSize: 25
  },
  input:{
    width: "100%",
    backgroundColor: "#fff"
  },
  inputContainer:{
    marginTop: 20,
    
    height: 60
  },
  buttonContainer:{
    alignItems: 'center'
  }
});
