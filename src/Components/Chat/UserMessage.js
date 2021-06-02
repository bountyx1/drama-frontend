
import { Text, Avatar} from 'react-native-paper'
import {View,StyleSheet} from 'react-native'
import React from 'react'


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


const styles = StyleSheet.create({
    messageContainer:{
        flex:1,
        flexDirection:"row",
        alignItems:"center"
        }
    })


export default React.memo(UserMessage)