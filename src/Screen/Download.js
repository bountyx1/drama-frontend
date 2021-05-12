import React from 'react'
import { View,StyleSheet, Image } from 'react-native'
import { Subheading } from 'react-native-paper'
import Marquee from '../Components/Marquee'
import Screen from '../Components/Screen'

export default function Download() {
    const title = "Goblin Episode 1"
    const url = "https://www.sbs.com.au/popasia/sites/sbs.com.au.popasia/files/goblinpointing.gif"
    return (
        <Screen>
            <View style={styles.container}>
                    <Image source={{uri:url}} style={styles.image} />
                    <Subheading>{title}</Subheading>
            </View>

            <Marquee>
                Hello world
            </Marquee>
        </Screen>
    )
}

const styles = StyleSheet.create({
container:{
    flexDirection:"row",
    height:120,
    borderRadius:50,
    backgroundColor:"#252525",
    margin:10
},
image:{
    height:120,
    width:"40%",
    borderTopLeftRadius:50,
    borderBottomLeftRadius:50,
    overlayColor:"black"
}
  });