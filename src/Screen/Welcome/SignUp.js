import React,{useState} from 'react'
import {View,StyleSheet,Image, Text} from 'react-native'
import {TextInput,Button} from 'react-native-paper'
import Screen from '../../Components/Screen'
import {signUp,Login} from '../../api/service'
import { useNavigation } from '@react-navigation/native';

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [errors,setErrors] = useState('')
    const navigation = useNavigation();

    const _goToHome = () => {
        navigation.navigate('Home')
    }

    

    const _signUp = (username,password,email,fname,lname) => {
        signUp(username,password,email,fname,lname).then(res=> {
            if(res.success){
                Login(username,password).then(
                    msg => {
                        (msg) ? _goToHome() : console.log("test")
                    }
                )
            }
            else{
            
                setErrors(res.errors)
                
            }
        })
    }

    const Error  = (err) => errors[err].map( (msg,index)=> <Text key={index} style={{fontSize:13,color:"red"}}>{msg}</Text>)
   
    return (
        <Screen>
            <View style={styles.container}>
           
            <Image source={require('../../assets/signup.gif')} style={{height:200,width:200,alignSelf:"center"}} />
                <View style={{flexDirection:"row",paddingTop:10}}>
                    <View style={[styles.inputContainer,{width:"50%",paddingRight:8}]}>
                                <TextInput
                                    style={styles.input}
                                    underlineColor="transparent" 
                                    label="First Name "
                                    value={fname}
                                    onChangeText={fname => setFname(fname)}
                                    />
                    </View>
                    <View style={[styles.inputContainer,{width:"50%"}]}>
                                <TextInput
                                    style={styles.input}
                                    underlineColor="transparent" 
                                    label="Last Name "
                                    value={lname}
                                    onChangeText={lname => setLname(lname)}
                                    />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                underlineColor="transparent" 
                                label="Username "
                                value={username}
                                onChangeText={username => setUsername(username)}
                                />
                </View>
                {errors.username && Error("username")}
                <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                underlineColor="transparent" 
                                label="Email "
                                value={email}
                                onChangeText={email => setEmail(email)}
                                />
                                
                </View>
                {errors.email && Error("email")}
                <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                underlineColor="transparent" 
                                label="Password "
                                value={password}
                                onChangeText={password => setPassword(password)}
                                />
                </View>
                {errors.password && Error("password")}
                <Button 
                    mode="outlined" 
                    labelStyle={{fontSize:24}} 
                    uppercase={false} 
                    style={styles.signinBtn} 
                    color="white" 
                    onPress={()=> _signUp(username,password,email,fname,lname)}
                    > 
                        Sign Up
                    </Button>
                    

              </View>
        </Screen>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:8,
     },
     inputContainer: {
         borderRadius: 4,
         height: 55,
         overflow: 'hidden',
         marginBottom:13
     },
     input: {
         height: 60,
         overflow: 'hidden',
         fontSize:20
     },
     signUpBtn:{
         borderColor:"white",
         height:55,
     }
   });