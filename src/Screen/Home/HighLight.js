import React, { useState,useEffect} from 'react'
import { View,StyleSheet,Image} from 'react-native';
import {Button} from 'react-native-paper'
import {getDrama} from '../../api/service';
import {WatchList,ModalBox,IconBtn} from '../../Components/'

const HighLight = ({id}) => {
    const [drama,setDrama] = useState(false)
    
    useEffect(() => {
        getDrama(id).then(drama=> setDrama(drama))
    }, [])
   
    return(
    <View style={styles.HighLightContainer}>
        <Image style={styles.poster} source={{uri:drama.poster}} />
        <View style={styles.btnContainer}>
            <WatchList id={id} />
                <Button icon="play" color="white" mode="contained">
                Play
                </Button>
                <ModalBox item={drama} >
                    <IconBtn  size={35} icon="information-outline"  name="info" />
                </ModalBox>
                    
        </View>
    </View>
    )}




const styles = StyleSheet.create({
    HighLightContainer:{
        height:490,
    },
    btnContainer:{
        flexDirection:"row",
        position:"absolute",
        bottom:0,
        alignItems:"center",
        alignSelf:"center",
        width:"100%",
        justifyContent:"space-evenly"

    },
    poster:{
        width:"100%",
        height:490,
        resizeMode:"cover",
        opacity:0.8
    }
  });

export default React.memo(HighLight)
