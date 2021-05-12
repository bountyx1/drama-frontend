import React,{useState,useEffect} from 'react'
import VideoPlayer from '../../Components/MediaPlayer/VideoPlayer'
import Screen from '../../Components/Screen'
import {getUser} from '../../api/service'
import Loading from '../../Components/Loading'
import Chat from '../../Components/Chat/Chat'
import {JoinChatRoom,createRoom,getRoom} from '../../api/service'
import {socket} from '../../api/explore'
import { KeyboardAvoidingView } from 'react-native'

export default function Player({route}) {
    const [video,setVideo] = useState(route.params.video)
    const [header,setHeader] = useState(route.params.video)
    const [room,setRoom] = useState(route.params.room)
    const [profile,setProfile] = useState(false)
    const [isLoading,setLoading] = useState(false)
    const [landascape,setLandascape] = useState(false)
    const [join,setJoin] = useState(false)

    const _handleLandascape = () => {
        setLandascape(!landascape)
    }

    useEffect(
        () => {
            if(!profile){
            getUser().then(profile => setProfile(profile))
            }
        }
    )
   
    useEffect(
        ()=>{
            if(profile && !join && !room){
                createRoom(video,header,profile.username).then(room => JoinChatRoom(profile,room))
                setJoin(true)
            }
    })

    useEffect(
        () => {
            if(profile && !join && room){
                getRoom(room).then(res =>setVideo(res[0].video))
                JoinChatRoom(profile,room)
                setJoin(true)
            }
        }
    )

    useEffect( () => {
        if(video){
            console.log(video)
            setLoading(true)
        }
    })

    useEffect(() => {
        return () => {
        console.log("Clean Up")
        socket.disconnect()
        };
      }, []);

    
    return (
 
    <Screen>
        
        {
        isLoading ? 
        <>
        <VideoPlayer videourl={video} header={header} showControl={true} onChange={_handleLandascape} landascape={landascape} />
        <Chat landascape={landascape} />
        </>
        : <Loading />
        }
    </Screen>
    
    )
}



