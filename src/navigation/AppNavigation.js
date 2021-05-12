import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeTab from './HomeTab';
import {Welcome,SignIn,SignUp,Drama,Player} from './Routes'
import linking from './linking'

const Stack = createStackNavigator();


export default function AppNavigation() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{headerShown:false}}  >
      <Stack.Screen   name="Welcome" component={Welcome} />
      <Stack.Screen   name="Home" component={HomeTab} />
      <Stack.Screen   name="SignIn" component={SignIn} />
      <Stack.Screen   name="SignUp" component={SignUp} />
      <Stack.Screen   name="Drama" component={Drama} />
      <Stack.Screen   name="Player" component={Player} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}
