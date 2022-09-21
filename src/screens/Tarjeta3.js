import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Imprimir3 from '../components/Imprimir3';

const Tarjeta3 = () => {
  return (
    <View style={[styles.cContainer]}>
      <Imprimir3/> 

      
    </View>
  )
}
const styles = StyleSheet.create({
  cContainer: {
     backgroundColor: "#E7004B",
  },
  
});

export default Tarjeta3;