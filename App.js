
import  { Component } from "react";
//import * as React from 'react';
import { Button, FlatList, StyleSheet, Text, Switch, TouchableHighlight, 
	View, Image, TouchableOpacity, PermissionsAndroid, Platform } from "react-native";
// Import RNFetchBlob for the file download
import RNFetchBlob from 'rn-fetch-blob';
//import { Button } from 'react-native-paper';
const REMOTE_IMAGE_PATH = 'https://usip.edu.bo/wp-content/uploads/2021/09/usip-marca.png';
const REMOTE_IMAGE_PATH_X = 'https://usip.edu.bo/wp-content/uploads/2021/09/usip-marca.png';
const checkPermission = async (archivo) => {
    
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission
	if (Platform.OS === 'ios') {
      downloadImage(archivo);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'App needs access to your storage to download Photos',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage(archivo);
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };
  const downloadImage = (archi) => {
    // Main function to download the image
    
    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    //let image_URL = REMOTE_IMAGE_PATH;    
	let image_URL = archi;    
    // Getting the extention of the file
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' + 
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image', 
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        console.log(image_URL);
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Image Downloaded Successfully.');
      });
  };
 
  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ?
             /[^.]+$/.exec(filename) : undefined;
  };
 
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
          Cargando ...........
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
          <FlatList
            horizontal={this.state.isEnabled ? true : false}
            animated={true}
            data={this.state.data}
            keyExtractor={(x,i)=> i}
            renderItem={({item})=>
			<View style={styles.contenedor}>
              <Text>{item.strCategory}</Text>
			  <Image
                style={styles.logo}
                source={{uri: item.strCategoryThumb}}
				/>
				<TouchableOpacity
        			style={styles.button}
        			onPress={()=>{
					    let REMOTE_IMAGE_PATH_X=	item.strCategoryThumb
						checkPermission (REMOTE_IMAGE_PATH_X)
					}
				}>
        			<Text style={styles.text}>
          			{item.strCategoryThumb}
        			</Text>
      			</TouchableOpacity>
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