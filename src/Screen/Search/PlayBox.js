import React from 'react'
import { View,StyleSheet ,Image} from 'react-native'
import { Title,Surface, IconButton} from 'react-native-paper';

const PlayBox = ({img,title}) => {
    return(
    <View style={styles.PlayBoxContainer}>
            <Surface style={styles.surface}>
                <Image style={styles.playBoxImg} source={{uri:img}} />
                <View style={{alignItems:"center",flex:1,flexDirection:"row"}}>
                    <Title style={{fontSize:13,paddingLeft:7,width:"70%"}}>{title}</Title>
                    <IconButton style={{position:"absolute",right:0}} icon="play-circle-outline" size={30} />
                </View>
            </Surface>
    </View>
    )
}



const styles = StyleSheet.create({
  
    surface:{
        elevation: 3,
        flexDirection:"row"
    },
    playBoxImg:{
        width:130,
        height:80,
        resizeMode:"cover",
        marginTop:1,
        borderRadius:5
    },
    PlayBoxContainer:{
        flex:1,
        paddingVertical:3
    }
  });

export default PlayBox;