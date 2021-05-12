import React from 'react'
import { DarkTheme, Provider as PaperProvider } from 'react-native-paper'
import AppNavigation from './navigation/AppNavigation'


function App() {
  return (
    <PaperProvider theme={DarkTheme}>
      <AppNavigation/>
    </PaperProvider>
    )
}


export default  App;



