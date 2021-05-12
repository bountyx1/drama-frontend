import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {Home,Search,Download,Account} from './Routes'
import colors from '../styles/colors'

const Tab = createMaterialBottomTabNavigator();

export default function HomeTab() {
    const TabIcon = (name,color) => <MaterialCommunityIcons name={name} color={color} size={26} />
    
    return (
        <Tab.Navigator 
        barStyle={{ backgroundColor: colors.paper }}
        >

          <Tab.Screen name="Home"
            component={Home}
            options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => TabIcon("home",color)
            }}
          />
          <Tab.Screen name="Search" 
          component={Search} 
          options={{
            tabBarLabel: 'search',
            tabBarIcon: ({color}) => TabIcon("magnify",color)
            }}
           />
            <Tab.Screen name="Download" component={Download} 
            options={{
            tabBarLabel: 'Youtube',
            tabBarIcon: ({color}) => TabIcon("youtube",color)
            }}
            />
    
            <Tab.Screen name="Account" component={Account} 
            options={{
              tabBarLabel: 'Account',
              tabBarIcon: ({color}) => TabIcon("account",color)
            }}
            />
        </Tab.Navigator>
      );
}
