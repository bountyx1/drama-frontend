import React,{useState,useEffect} from 'react'
import {View,StyleSheet, FlatList} from 'react-native'
import {SendChatMessage} from '../../api/service'
import {socket} from '../../api/explore'
import { TextInput ,Text, Avatar} from 'react-native-paper'
import ShareExample from '../Share'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const UserMessage = ({item}) => {
const {profile,message} = item
return(
<>
<Text>{profile.username}</Text>
<View style={styles.messageContainer}>
<Avatar.Text size={38} label={profile.first_name.charAt(0) +  profile.last_name.charAt(0)} />
<Text>{message}</Text>
</View>
</>
    )
}

const RcvMessage = ({messages}) => {
    const renderItem = ({item}) => <UserMessage item={item} />
    const keyExtractor = (item,index) => index+item.id
    return(
    <FlatList
    data={messages}
    renderItem={renderItem}
    keyExtractor={keyExtractor}
    />
)
}

const SendMessage = () => {
    const [message,setMessage] = useState('')
    
    return(
        
        <View style={{ position:"relative",bottom:0}}>
        <TextInput 
        label="message"
        value={message}
        onChangeText={message => setMessage(message)}
        onSubmitEditing={({nativeEvent}) => {
            SendChatMessage(nativeEvent.text)
            setMessage('')
        }}
        placeholder="messages"
        />
        </View>
    )
}

export default function Chat({profile,landascape}) {
    const [messages, setMessages] = useState([])
    const [refresh,setRefresh] = useState(false)

    useEffect(() => {
        socket.on('message',(message)=> setMessages([...messages,message]))
        socket.on('chat',(message)=> setMessages([...messages,message]))
        setRefresh(true)
    }, [messages])

   

    return (

            <View style={styles.container}>
                <RcvMessage messages={messages} />
                <ShareExample message="" />
                <SendMessage />
            </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    messageContainer:{
        flex:1,
        flexDirection:"row",
        alignItems:"center"
    }
})