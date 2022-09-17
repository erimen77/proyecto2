
import  { Component } from "react";
//import * as React from 'react';
import {  FlatList, StyleSheet, Text, Switch, 
	View, Image} from "react-native";
//import Bajar from "./src/components/Bajar";
const REMOTE_IMAGE_PATH = 'https://usip.edu.bo/wp-content/uploads/2021/09/usip-marca.png'; 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      count: 0,
      data:[],
      loading: false,
      //url: 'https://randomuser.me/api?results=6',
	  //url: 'https://pokeapi.co/api/v2/pokemon',
	  url: 'https://www.themealdb.com/api/json/v1/1/categories.php',
      prev: null,
      next: null,
      isEnabled: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  toggleSwitch = async() => { 
    const ise = this.state.isEnabled;
    this.setState({isEnabled: !ise})
  };


  getData = async() => {
    this.setState({loading: true});
    const reponse = await fetch(this.state.url);
    const json = await reponse.json();
   const prev = json.previous;
    const next = json.next;
    this.setState({
      data: json.categories,
      loading: false
    });
  }
  render() {

    if(this.state.loading) {
      return (
        //<View style={styles.container}>
        <View style={[styles.countContainer]}>
          <Text style={[styles.countText]}>
          Cargando ...
          </Text>
        </View>
      //</View>
      );
    }


    return (
      <View>
        <View style={styles.header}>

		<Image
        source={{
          uri: REMOTE_IMAGE_PATH,
        }}
        style={{
          width: '100%',
          height: 100,
          resizeMode: 'contain',
          margin: 5
        }}
      />
        <Text> Horizontal</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={this.state.isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={ () => { 
            this.setState({isEnabled: !this.state.isEnabled})
          }}
          value={this.state.isEnabled}
        />
        </View>
        <View>
        <View style={[styles.countContainer]}>
          <Text>Listado</Text>
        </View>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  },
  countText: {
    color: "red"
  },
  tinyLogo: {
    width: 50,
    height: 50,
	alignContent:'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  contenedor: {
    width: 300,
    height: 450,
    backgroundColor: '#AADE29',
    marginLeft: 5,
  },
  header: {
    justifyContent: "center",
    paddingHorizontal: 50,
    paddingVertical: 50,
    right: 40,
  },
});

export default App;
