import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

import Tarjeta1 from '../screens/Tarjeta1';
import Tarjeta2 from '../screens/Tarjeta2';
import Tarjeta3 from '../screens/Tarjeta3';
const Tab = createBottomTabNavigator();
export const ButoonTab = ()=> {
  return (
      <Tab.Navigator style={{color: "red", justifyContent: "center"}}
      screenOptions = { ({ route }) => ({
        // tabBarActiveTintColor: 'red',
        // tabBarActiveBackgroundColor: 'grey',
        // tabBarInactiveBackgroundColor: 'orange',
        tabBarIcon: ({ focused, color, size }) => {
 
            let iconName = '';
            switch ( route.name ) {
                case 'Tarjetas Cumpleaños':
                    iconName = focused ? 'birthday-cake'  : 'image';
                    break;
                case 'Fiestas Patrias':
                    iconName = focused ? 'vcard-o' : 'bell-o';
                    break;
                case 'Enamorados':
                    iconName = focused ? 'heart' : 'heart-o';
                    break;
            }

            return <Icon name = { iconName } size = { size } color = { color } />
        }
    })}
         
      
      
      >
        
        <Tab.Screen   style={{color: "red"}} name="Tarjetas Cumpleaños" component={Tarjeta1}/>
        <Tab.Screen name="Fiestas Patrias" component={Tarjeta2}/>
        <Tab.Screen name="Enamorados" component={Tarjeta3}/>
      </Tab.Navigator>
  );
}