import React from 'react'
import { DarkTheme, Provider as PaperProvider } from 'react-native-paper'
import AppNavigation from './navigation/AppNavigation'
import socketClient  from "socket.io-client";
import {BACKEND} from './api/constants'



export const socket = socketClient(BACKEND.CHAT);
export const SocketContext = React.createContext(socket);

function App() {
  return (
    <SocketContext.Provider value={socket}>
    <PaperProvider theme={DarkTheme}>
      <AppNavigation/>
    </PaperProvider>
    </SocketContext.Provider>

    )
}


export default  App;



