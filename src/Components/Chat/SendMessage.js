import {SendChatMessage} from '../../api/service'
import { TextInput} from 'react-native-paper'
import React,{useState,useContext} from 'react'
import {View} from 'react-native'
import {SocketContext} from '../../App';


export default SendMessage = () => {
    const [message,setMessage] = useState('')
    const socket = useContext(SocketContext)
    return(
       

        <View style={{ position:"relative",bottom:0,width:"100%"}}>
        <TextInput 
        label="message"
        value={message}
        onChangeText={message => setMessage(message)}
        onSubmitEditing={({nativeEvent}) => {
            SendChatMessage(socket,nativeEvent.text)
            setMessage('')
        }}
        placeholder="messages"
        
        />
        </View>
        
    )
}
