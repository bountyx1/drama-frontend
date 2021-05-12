import React, {  useEffect, useState } from 'react';
import { Animated,  View ,StyleSheet} from 'react-native';
import { Portal ,Text} from 'react-native-paper'

export default function Marquee({children}) {
    const [text,setText] = useState(new Animated.Value(0))

    const _move = ()=> {
        Animated.timing(text, 
            {
            toValue: 1000,
            duration:5000,
            useNativeDriver: true
           },
           ).start()
    }

    useEffect(()=>{
        if(children){
            _move()
        }
       
    },[children])
    
    return (
        <Portal>
           <Animated.View style={{transform:[{translateX:text}]
               }}>
                   
                <Text>{children}</Text>
            </Animated.View>
        </Portal>
       
    )
}



const styles = StyleSheet.create({
})