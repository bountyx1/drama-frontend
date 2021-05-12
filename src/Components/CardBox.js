import React from 'react'
import {StyleSheet,Image} from 'react-native'

const CardBox = ({img}) => (
    <Image  style={styles.image} source={{uri:img}} />
)


const styles = StyleSheet.create({
    image:{
        width:110,
        height:150,
        resizeMode:'cover',
        borderRadius:6,
        margin:4
    }
  });


export default CardBox;