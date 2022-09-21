import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Tarjeta1 from '../screens/Tarjeta1';
import Tarjeta2 from '../screens/Tarjeta2';
import Tarjeta3 from '../screens/Tarjeta3';
const Tab = createBottomTabNavigator();
export const ButoonTab = ()=> {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Tarjetas Cumpleaños" component={Tarjeta1}/>
        <Tab.Screen name="Fiestas Patrias" component={Tarjeta2}/>
        <Tab.Screen name="Enamorados" component={Tarjeta3}/>
      </Tab.Navigator>
  );
}