import { ActivityIndicator, Colors } from 'react-native-paper';
import React from 'react'
import { View,Image} from 'react-native';

export const VideoLoading = ({isLoading}) => {
    return(
          <>
         { isLoading ? 
         <View style={{flexDirection:"row",justifyContent:"center"}}>

         <ActivityIndicator 
          animating={true} 
          color={Colors.red800} 
          size="large"/>
          </View>  
          : null }
          </>
          
          )
        }


export default function Loading() {
    return (
        
        <>
            <Image
            source={require('../assets/loading.gif')}
            style={{height:400,width:400,alignSelf:"center"}} 
            /> 
            <ActivityIndicator 
            animating={true} 
            color={Colors.red800} 
            size="large" 
            />
        </>
    )
}
