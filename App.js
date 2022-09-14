import React, { Component } from "react";
import { FlatList, StyleSheet, Switch, TouchableHighlight, View, Image } from "react-native";
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      count: 0,
      data:[],
      loading: false,
      url: 'https://randomuser.me/api?results=9',
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
      data: json.results,
      loading: false
    });
  }
  render() {

    if(this.state.loading) {
      return (
        <View style={styles.container}>
        <View style={[styles.countContainer]}>
          <Text style={[styles.countText]}>
            Iniciando las Tarjeta
          </Text>
        </View>
      </View>
      );
    }


    return (
      <View>
        <View style={styles.header}>
        <Text> Horizontal</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={this.state.isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#114e3f"
          onValueChange={ () => { 
            this.setState({isEnabled: !this.state.isEnabled})
          }}
          value={this.state.isEnabled}
      
        />
        </View>
        <View>
        <View style={[styles.countContainer]}>
          <Text>Escoje tu Tarjeta</Text>
          <FlatList
            horizontal={this.state.isEnabled ? true : false}
            animated={true}
            data={this.state.data}
            keyExtractor={(x,i)=> i}
            renderItem={({item})=>
            <View style={styles.contenedor}>
              <Text>{item.name.first}</Text>
              <Text>{item.name.last}</Text>
              <Image
                style={styles.logo}
                source={{uri: item.picture.large}}
              />
              <Text>{item.email}</Text>
              <Button icon="camera" mode="contained" onPress={() => this.showModal(item.url)}>
									Detalle
							</Button>
            </View>}
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
    padding: 10
  },
  countText: {
    color: "red"
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 200,
    height: 200,
    alignItems: "center",
  },
  contenedor: {
    width: 300,
    height: 450,
    backgroundColor: '#AA8829',
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