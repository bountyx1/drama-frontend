import React,{useState,useEffect} from 'react'
import {addToList,delList,addLike,delLike} from '../api/service';
import { View} from 'react-native';
import {IconButton,Snackbar,Text,Portal} from 'react-native-paper'


export const Popup = ({visible,message,style}) => {

    return(
        <Portal>
            <Snackbar
            style={{backgroundColor:"#252525",alignSelf:"center",width:"50%"}}
            onDismiss={()=> console.log("Dissmiss")}
            visible={visible}
            duration={5800}
            >
                <View style={style}>
                    <Text >{message}</Text>
                </View>

            </Snackbar>
            </Portal>
        )
}

const IconBtn = ({name,icon,size,onPress}) => {
    return(
        <View>
            <IconButton icon={icon} size={size} onPress={onPress} />
            <Text style={{bottom:14,textAlign:"center"}} >{name}</Text>
        </View>)
} 

export function Like({id}) {
    const [rate,setRate] = useState(false)
    const [like,setLike] = useState(false)
    const [visible,setVisible] = useState(false)

    const _addLike = () =>
    {
        addLike({"drama":id}).then(res=>{
            setLike(true)
            setRate(true)
            setVisible(true)
        })

    }
    const _delLike = () => {
        delLike(id).then(res=>
            {
                setLike(false)
                setRate(false)
                setVisible(true)
                
            }
        )
    }

    useEffect(() => {
        setTimeout(()=>{
            if(visible){
                setVisible(false)
            }
        },2000)
    }, [visible])


    const btns = (icon,size,method,name) => (<IconBtn size={size} name={name} icon={icon} onPress={method} />)
    return(
        <>
    
        { (rate) ? (like) ? btns("thumb-down",33,_delLike,"Rated") : btns("thumb-up",33,_addLike,"Rated") : btns("thumb-up-outline",33,_addLike,"Rate") }
        {like ? <Popup style={{paddingLeft:50}}  message="Liked" visible={visible}/>: <Popup style={{paddingLeft:45}} message="Disliked" visible={visible}/>}
        </>
    )
}

export  function WatchList({id}) {
    const [watchList,setWatchList] = useState(false);
    const [visible,setVisible] = useState(false)

    const _addWatch = () =>
    {
        addToList({"drama":id}).then(res=>setWatchList(true))
        setVisible(true)
    }
    const _delWatch = () => {
        delList(id).then(res=>setWatchList(false))
        setVisible(true)
    }

    const btns = (icon,size,method,name) => (<IconBtn size={size} name={name} icon={icon} onPress={method} />)

    useEffect(() => {
        setTimeout(()=>{
            if(visible){
                setVisible(false)
            }
        },2000)
    }, [watchList])


    return (
        <>
            { 
            watchList ? btns("check",33,_delWatch,"My List") : btns("plus",33,_addWatch,"My List")
            }
           
           {watchList ? <Popup style={{paddingLeft:20}} message="Added to WatchList" visible={visible}/>: <Popup style={{paddingLeft:0}}  message="Removed from WatchList" visible={visible}/>}

        </>
    )
}


export default IconBtn