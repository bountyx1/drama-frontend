import React,{useState,useContext,useEffect} from 'react'
import {VideoPlayer,Screen, Loading,Chat} from '../../Components/'
import {SocketContext} from '../../App';
import { createRoom, getRoom, getUser, JoinChatRoom } from '../../api/service';
import {View,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard} from 'react-native'

export default function Player({route}) {
    const [video,setVideo] = useState(route.params.video)
    const [header,setHeader] = useState(route.params.video)
    const [landascape,setLandascape] = useState(false)
    const [room,setRoom] = useState(route.params.room)
    const [profile,setProfile] = useState(null)
    const socket = useContext(SocketContext);
    const [loading,setLoading] = useState(true);

    /*Get User Profile*/
    useEffect(() => {
        getUser().then( profile => setProfile(profile) )
    }, [])

    useEffect(() => {
        if(room && profile)
        {
            console.log(`Invoked when user join with deep link ${room}`)
        JoinChatRoom(socket,profile,room);
        getRoom(room).then( 
            ({results}) => {
                setVideo(results[0].video)
                setLoading(false)
            })
        
        }

        if(!room && profile) {
            console.log("Invoked when user makes room")
            createRoom({video,header}).then(
                ({room}) => {
                    JoinChatRoom(socket,profile,room)
                    setRoom(room)
                    setLoading(false)
                })
                
            }

    }, [profile])

    
    const _handleLandascape = () => {
        setLandascape(!landascape)
    }

  
    
    return (
    <Screen>
    {
    loading ? <Loading /> :
    <>
     
    <VideoPlayer 
    videourl={video} 
    header={header} 
    showControl={true} 
    onChange={_handleLandascape} 
    landascape={landascape}
    socket={socket}
    />
    
    <KeyboardAvoidingView
  style={{flex: 1}} 
  behavior={'padding'} 
  enabled="false">
    <Chat room={room}/>
    </KeyboardAvoidingView>
    </>
    }
    </Screen>
    
    )
}


