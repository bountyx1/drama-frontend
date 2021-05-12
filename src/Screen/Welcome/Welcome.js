import React,{useEffect, useState} from 'react'
import { View ,StyleSheet, ImageBackground} from 'react-native'
import { Button, Title } from 'react-native-paper'
import Screen from '../../Components/Screen'
import { useNavigation } from '@react-navigation/native';
import {userInfo} from '../../api/service'
import Loading from '../../Components/Loading';


export const WelcomeView = ({isLoggedIn}) => {
    const navigation = useNavigation();
    const _goTo = (screen) => navigation.navigate(screen);
    
    useEffect(() => {
        isLoggedIn ? _goTo("Home") : null
    })
    return(
        <ImageBackground style={styles.image} source={require('../../assets/drama-cover.png')}>  
            <View style={styles.root}>
                <Title style={styles.title}>Enjoy Dramas & Movies</Title> 
                <Title style={styles.title}>Chat With Friends & Family!</Title>                   
                    <View style="btnContainer">
                        <Button
                        style={styles.Btn} 
                        color="#85c1e5" 
                        labelStyle={styles.BtnText} 
                        mode="contained" 
                        onPress={()=> 
                        _goTo("SignIn")}
                        >
                            Sign in
                        </Button>
                        <Button 
                        style={styles.Btn}  
                        color="#ad6c80" 
                        labelStyle={styles.BtnText}
                        mode="contained" 
                        onPress={()=> _goTo("SignUp")}>
                            Sign Up
                        </Button>   
                    </View>
            </View>
        </ImageBackground>
    )
}


export default function Welcome() {
    const [isLoggedIn,setisLoggedIn] = useState(false)
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        if(!isLoggedIn){
        userInfo().then(res=> res ? setisLoggedIn(true) : setLoading(false))
        }
        else{
            setLoading(false)
        }
    })


    return (
        <Screen>
           {loading ? <Loading /> : <WelcomeView isLoggedIn={isLoggedIn} />}
        </Screen>
    )
}


const styles = StyleSheet.create({
    root:{
        flex:1,
        padding:10,
        justifyContent:"center"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        opacity:0.8
      },
    title:{
        fontSize:26,
        fontWeight:"bold",
        alignSelf:"center",
    },
    Btn:{
        borderRadius:18,
        marginBottom:10,
        height:45,
    },
    BtnText:{
        fontSize:20,
        color:"white",
        fontWeight:"bold"
    }
})
