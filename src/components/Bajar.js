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
  Pressable,
  Dimensions,
  TextInput,
  Linking
} from 'react-native';
 
// Import RNFetchBlob for the file download
import RNFetchBlob from 'rn-fetch-blob';

import Icon from 'react-native-vector-icons/FontAwesome';
const WIDTH=Dimensions.get('window').width;
const HEIGTH_MODAL =150;

const Bajar = (props) => {
  console.log("+++++++++++++++++++")
  console.log(props.archivo)
  console.log(props.descrip)
  console.log("+++++++++++++++++++")
  
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
            title: 'Se requiere permiso para el almacenamiento',
            message:
              'La App necesita acceso al almacenamiento del dispositivo para descargar la imagen..',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage();
        } else {
          // If permission denied then show alert
          alert('Permiso de almacenamiento no concedido..');
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
        alert('Imagen descargada suficientemente.');
      });
  };
 
  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ?
             /[^.]+$/.exec(filename) : undefined;
  };
 
  const [modalVisible, setModalVisible] = useState(false);
  const [noCelular, setnoCelular] = useState('');
  
  
  const mandarImagen = async (imagen,descrip) =>{
    const mensaje="https://wa.me/" + noCelular + "?text=" + imagen + "  " + descrip;
    
    console.log(mensaje);
    setModalVisible(false);
    
    await Linking.openURL(mensaje)
  }

  return (
    <View style={styles.container}>


<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>MANDA LA TARJETA AL NUMERO DE WHATSAPP DE TU PERSONA ESPECIAL</Text>


            <View style={styles.input}>
              <View style={{alignItems:'flex-start'}}>
              <TextInput style={{fontSize: 24}} placeholder="+591------"
                  onChangeText={(val)=>setnoCelular(val)}              
              />
                 
            </View>    
             </View>
         <Text style={styles.desc}>
          {props.descrip}
         </Text>

             <View style={styles.botones}>
               <TouchableOpacity 
                     styles={styles.touchable}
                     onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={[styles.text]}>
                      Cancel
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity 
                     styles={styles.touchable}
                    /*  onPress={() => setModalVisible(!modalVisible)} */
                    onPress={()=>{
                      const REMOTE_IMAGE_PATH_X=props.archivo;
                      mandarImagen(REMOTE_IMAGE_PATH_X,props.descrip);
                      //console.log(REMOTE_IMAGE_PATH_X)
                    }} 

                >
                  <Text style={[styles.text]}>
                      ok
                  </Text>
               </TouchableOpacity>
              
              </View> 
           
          </View>
        </View>
      </Modal>

        <Icon.Button
              name="cloud-download"
              backgroundColor="#3b5998"
              color="#ffffff"
            
               onPress={()=>{
                const REMOTE_IMAGE_PATH_X=props.archivo;
                downloadImage(REMOTE_IMAGE_PATH_X);
                //console.log(REMOTE_IMAGE_PATH_X)
              }}


             /*  onPress={() => setModalVisible(!modalVisible)} */
              >
              BAJAR ARCHIVO
        </Icon.Button>
        <View style={{marginTop: 2}}>

        
        <Icon.Button
              name="whatsapp"
              backgroundColor="#3b5998"
              color="#ffffff"
             onPress={() => setModalVisible(!modalVisible)}
             
              >
              MANDAR POR WHATSAPP
        </Icon.Button>
        </View>

    </View>
  );
};

 
export default Bajar;
 
const styles = StyleSheet.create({
  modalText: { color:'#E7004B',
fontWeight:'bold',
  textAlign:'center',
  },
  desc: {
    fontSize: 20,
    color: "#0059B2",
  },
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
    /* color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 5, */
    margin:5,
    fontsize:25,
    fontWeight:"bold",
    backgroundColor: '#E7004B',
    padding:25,
    color: '#fff',
    borderRadius:10,

  },
  
  botones:{
    width:"100%",
    flexDirection:"row",
   // backgroundColor: 'orange',
    //justifyContent: 'space-around',

  },
  touchable:{
    flex:1,
    paddingVertical:10,
    //alignItems:"center",
    justifyContent: 'space-around'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1
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
  modal:{
    flex:1,
    height:HEIGTH_MODAL,
    width: WIDTH-10,
    backgroundColor: "white",
    borderRadius:10,
    paddingTop:20,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginTop: 20,
    width: 200,
    borderColor: 'black',
    borderWidth: 2,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    //alignItems: 'flex-end',
    paddingRight: 10,
    backgroundColor: '#73B9FF',
  },
});