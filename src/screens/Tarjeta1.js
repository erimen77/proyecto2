import { View, Text, Button } from 'react-native'
import React from 'react'
import Imprimir from '../components/Imprimir';
Hola = () => { 
  console.log('Hola mundo');
};

const Tarjeta1 = () => {
  return (
    <View>
   <Imprimir/> 
      <Text>Tarjeta 1</Text> 
      
    </View>
  )
}

export default Tarjeta1;