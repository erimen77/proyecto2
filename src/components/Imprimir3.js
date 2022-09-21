import  { Component } from "react";
//import * as React from 'react';
import {  FlatList, StyleSheet, Text, Switch, 
	View, Image, Linking,  Button} from "react-native";
//import { Button } from "react-native-paper";
import Bajar from "./Bajar";
const REMOTE_IMAGE_PATH = 'https://informatica.uatf.edu.bo/rest/src/logo3.jpg'; 


class Imprimir3 extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      count: 0,
      data:[],
      loading: false,
      //url: 'https://randomuser.me/api?results=6',
//	  url: 'https://pokeapi.co/api/v2/pokemon',
	  url: 'https://informatica.uatf.edu.bo/rest/post3.php',
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
      data: json,
     // data: json.results,
      loading: false
      //loading: true
    });
  }
  
  render() {

    if(this.state.loading) {
      return (
        
        <View style={[styles.countContainer]}>
          <Text style={[styles.countText]}>
          Cargando ...
          </Text>
        </View>
      
      );
    }
    const hanleWhatsAppPress= async ()=>{
     await Linking.openURL ("https://wa.me/+59172421616?text=hols")
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
          height: 200,
          //resizeMode: 'contain',
          margin: 1
        }}
      />
        <Text>Puede Visualizar las tarjetas en sentido horizontal o vertical</Text>
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
          {/*<Text>-- Elija --</Text>*/}
          <FlatList
            horizontal={this.state.isEnabled ? true : false}
            animated={true}
            data={this.state.data}
            keyExtractor={(x,i)=> i}
            renderItem={({item})=>
			<View style={styles.contenedor}>
              <Text>{item.titulo}</Text>
			  <Image
                style={styles.logo}
                source={{uri: item.strCategoryThumb}}

				/>
				<Bajar archivo={item.strCategoryThumb}
				/>				
              </View>
              }
           />
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
    padding: 10,
    backgroundColor: "#E7004B",
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
    width: 250,
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
    paddingHorizontal: 0,
    paddingVertical: 0,
    right: 0,
  },
});

export default Imprimir3;
