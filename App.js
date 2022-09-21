
import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { ButoonTab } from './src/navigation/ButoonTab'
// principal 
const App = () => {
  return (
    <NavigationContainer>
      <ButoonTab/>
    </NavigationContainer>
  )
}

export default App;