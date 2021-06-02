import React from 'react'
import {View,StyleSheet} from 'react-native'
import ShareExample from '../Share'
import SendMessage from './SendMessage'
import RecieveMessage from './RecieveMessage'

export default function Chat({room})
{
    console.log(room)
        return (

            <View style={styles.container}>
                <RecieveMessage />
                <ShareExample message={`Hi I am watching http://143.110.245.147:19401/api/redirect?rdr=${room}`} />

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