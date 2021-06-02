
import { FlatList} from 'react-native';
import React,{useState,useEffect,useContext} from 'react'
import {SocketContext} from '../../App';
import UserMessage from './UserMessage';



export default RecieveMessage = () => {
    const [messages, setMessages] = useState([])
    const socket = useContext(SocketContext)

    useEffect(() => {
        socket.on('message',(message)=> setMessages([...messages,message]))
        socket.on('chat',(message)=> setMessages([...messages,message]))
    },[])

    const renderItem = ({item}) => <UserMessage item={item} />
    const keyExtractor = (item,index) => index+item.id
    return(
        <>
        <FlatList
    data={messages}
    renderItem={renderItem}
    keyExtractor={keyExtractor}
    extraData={messages}
    />
    
    </>
)
}


