import React from 'react'
import { SafeAreaView,StyleSheet, View } from 'react-native';

export default function Screen({children}) {
    return (
       <SafeAreaView style={styles.screen}>
           <View style={styles.container}>
                {children}
           </View>
       </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1
    },
    container:{
        flex:1,
        backgroundColor:"#000000",
    },
  });