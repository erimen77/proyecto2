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
          margin: 0
        }}
      />
        <Text style={styles.Texto1}>Puede Visualizar las tarjetas en sentido horizontal o vertical</Text>
        <View style={styles.centro}>
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
        </View>
        <View>
        <View style={[styles.countContainer]}>
          <Text style={styles.Texto2}> Descargue la tarjeta que desee</Text>
          <FlatList style={[styles.fas]}
              horizontal={this.state.isEnabled ? true : false}
              animated={true}
              data={this.state.data}
              keyExtractor={(x,i)=> i}
              renderItem={({item})=>
			        <View style={styles.contenedor}>
                  <Text style={styles.Texto3} >{item.titulo}</Text>
			            <Image
                     style={styles.logo}
                    source={{uri: item.strCategoryThumb}}

				          />
				          <Bajar  archivo={item.strCategoryThumb}
                  descrip={item.descripcion}
                  style={styles.botoncito}
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
  fas:{
    width: '90%',
    height:500
  },
  centro: { justifyContent: 'center' },
  botoncito: { height: 90,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    
  },
  button: {
    alignItems: "center",
    backgroundColor: "#E7004B",
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
  Texto1: {
    paddingRight:8,
    //alignContents: "center",
    textAlign: "right",
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: '900',
  },
  Texto3: {
    //paddingLeft:5,}
    //alignContents: "center",
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: '900',
  },
  Texto2: {
    //alignItems: "center",
    textAlign: "right",
//    paddingLeft:5,
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: '700',
  },
  tinyLogo: {
    width: 50,
    height: 50,
	alignContent:'center',
  },
  logo: {
    width: "100%",
    height: 140,
  },
  contenedor: {
    width: "100%",
    height: 250,
    backgroundColor: '#E7004B',
    marginLeft: 0,
  },
  header: {
    justifyContent: "center",
    paddingHorizontal: 0,
    paddingVertical: 0,
    right: 0,
    
  },
});

export default Imprimir3;
