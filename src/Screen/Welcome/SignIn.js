import React,{useState} from 'react'
import { TextInput,Button, Title } from 'react-native-paper';
import { View ,StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Login } from '../../api/service';
import Screen from '../../Components/Screen'

export default function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
     
    const _goToHome = () => {
        navigation.navigate('Home')
    }

    const _login =  (username,password) => {
        Login(username,password).then(
            res => {
                (res) ? _goToHome() : alert("Invalid Username or Passwored")
            }
        )
    } 

    return (
            <Screen>
                <View style={styles.container}>
                    <Title style={styles.title}>SignIn</Title>
                    <Image source={require('../../assets/logo-2.gif')}  style={{height:200,width:200,alignSelf:"center"}}  />
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            underlineColor="transparent" 
                            label="Username "
                            value={username}
                            onChangeText={username => setUsername(username)}
                            />
                        </View>
                <View style={{padding:8}}/>
                <View style={styles.inputContainer}>
                <TextInput
                   style={styles.input}
                   underlineColor="transparent" 
                    label="Password"
                    value={password}
                    onChangeText={password => setPassword(password)}
                />
                </View>
                <View style={{padding:8}}/>

                    <Button 
                    mode="outlined" 
                    labelStyle={{fontSize:24}} 
                    uppercase={false} 
                    style={styles.signinBtn} 
                    color="white" 
                    onPress={()=> _login(username,password)}
                    > 
                        Sign In 
                    </Button>
                    <View style={{padding:8}}/>
                    <Button
                    mode="text"
                    uppercase={false}
                    color="white">
                        ForgotPassword ? 
                    </Button>

                    <View style={{padding:8}}/>
                    <Button
                    mode="text"
                    uppercase={false}
                    color="white">
                        New to Navideo ? 
                        Sign Up Now.
                    </Button>
                </View>
            </Screen>
    )
}



const styles = StyleSheet.create({
   container:{
       flex:1,
       padding:20
    },
    title:{
        fontSize:35,
        paddingTop:10
    },
    inputContainer: {
        borderRadius: 4,
        height: 65,
        overflow: 'hidden',
    },
    input: {
        height: 70,
        overflow: 'hidden',
        fontSize:20
    },
    signinBtn:{
        borderColor:"white",
        height:55,
    }
  });