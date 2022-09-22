// How to Download an Image in React Native from any URL
// https://aboutreact.com/download-image-in-react-native/
 
// Import React




import React , { useState } from 'react';
 
// Import Required Components
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert, Modal,
  Pressable
} from 'react-native';
 
// Import RNFetchBlob for the file download
import RNFetchBlob from 'rn-fetch-blob';

import Icon from 'react-native-vector-icons/FontAwesome';
const Bajar = (props) => {
  console.log(props)
  
  const checkPermission = async () => {
    
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission
 
    if (Platform.OS === 'ios') {
      downloadImage();
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
          downloadImage();
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
 
  const downloadImage = (archivo) => {
     // Main function to download the image
    
    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = archivo;    
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
        alert('Se descargara esta imagen en su dispositivo....');
      });
  };
 
  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ?
             /[^.]+$/.exec(filename) : undefined;
  };
 
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>

    
   





        <Icon.Button
              name="cloud-download"
              backgroundColor="#3b5998"
              color="#ffffff"
            
              onPress={()=>{
                const REMOTE_IMAGE_PATH_X=props.archivo;
                downloadImage(REMOTE_IMAGE_PATH_X);
                //console.log(REMOTE_IMAGE_PATH_X)
              }}  


             // onPress={() => setModalVisible(!modalVisible)}
              >
              BAJAR ARCHIVO
        </Icon.Button>

    </View>
  );
};

 
export default Bajar;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    width: '80%',
    padding: 10,
    backgroundColor: 'orange',
    margin: 10,
  },
  text: { 
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 5,
  },
  
  botones:{
    width:"100%",
    flexDirection:"row"

  },
  touchable:{
    flex:1,
    paddingVertical:10,
    alignItems:"center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
});