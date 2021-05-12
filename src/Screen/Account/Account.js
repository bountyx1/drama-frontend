import AsyncStorage from '@react-native-async-storage/async-storage'
import React,{useState,useEffect} from 'react'
import {StyleSheet,View,TouchableHighlight } from 'react-native'
import { Button, Divider ,Avatar, IconButton,Title} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import {getUser} from '../../api/service'
import Screen from '../../Components/Screen'


export default function SettingScreen() {
    const navigation = useNavigation()
    const _signOut= () => {
        AsyncStorage.clear()
        navigation.navigate('Welcome')
    }
    const [profile, setProfile] = useState([])
    const { username , first_name , last_name,email} = profile

    useEffect(() => {
        getUser().then(res => setProfile(res))
    }, [])

    

    const Btn = (name,icon,onPress) => (
        <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#252525"
        onPress={onPress}
        >
            <View style={{flexDirection:"row"}} >
                <IconButton size={40} icon={icon} />
                <Button  
                mode="text"
                style={{alignSelf:"center"}}
                labelStyle={{fontSize:20,opacity:0.8}} 
                color="white"
                uppercase={false}
                >
                    {name}
                </Button>
            </View>
        </TouchableHighlight>)

    return (
        <Screen>
            <View style={styles.root}>
                <View style={styles.profileContainer}>
                    <Avatar.Text size={88} label={first_name && last_name ? first_name.charAt(0)+last_name.charAt(0): "mo"} theme={{colors:{primary:"#1687a7"}}} />
                    <Title style={{alignSelf:"center",paddingHorizontal:14}}>{username}</Title>
                </View>
                <Divider style={{height:3}} />
                <View style={styles.listContainer}>
                    {Btn("My Like","thumbs-up-down")}
                    {Btn("My List","playlist-check")}
                </View>
                
                <Divider style={{height:3}} />
                <View style={styles.accountContainer}>
                    {Btn("Account","account-circle")}
                    {Btn("Help","handshake")}
                    {Btn("Sign Out","logout",_signOut)}
                </View>
            </View>
        </Screen>
    )
}


const styles = StyleSheet.create({
root:{
    flex:1,
    flexDirection:"column"
},
profileContainer:{
    padding:20,
    flexDirection:"row"
},
listContainer:{
},
accountContainer:{
    justifyContent:"flex-start"
}
});