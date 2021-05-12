import React from 'react'
import {View} from 'react-native'


export default function Container({children,show,style}) {
    return (
        <>
        {
        show ?
        <View style={style}>
        {children}
        </View>
        : null}
        </>
    )
}
