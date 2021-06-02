import React from 'react'
import { View,StyleSheet} from 'react-native'
import { Button, Paragraph, Title,Text,  Divider } from 'react-native-paper'
import {IconBtn,WatchList,Like} from '../../Components/'
import colors from '../../styles/colors'

const DramaDetail = ({drama,id}) => {
    const {title,description,year,seasons,ua} = drama
return(
    <>
    <View style={styles.detailContainer}>
        
        <Title style={{fontSize:28,fontWeight:"bold"}}>{title}</Title>
        
        <View style={styles.detailMiniContainer}>
            <Text style={{color:"green",fontWeight:"bold"}}> 97% Match </Text>
            <Text>{year}</Text>
            <View style={{backgroundColor:colors.lightDark}}>
                <Text> {ua} </Text>
            </View>
            <Text> {seasons} Seasons </Text>
        </View>

        <Button
        icon="play"
        color="white"
        mode="contained"
        uppercase={false}>
            Play
        </Button>

        <Paragraph numberOfLines={4}>
            {description}
        </Paragraph>

        <View style={{...styles.detailMiniContainer,...{paddingLeft:8}}}>
            <WatchList id={id} />
            <Like id={id} />
            <IconBtn 
            icon="share-variant" 
            name="Share" 
            size={33} 
            />
        </View>

    </View>
    <Divider style={{height:4}}/>
    </>
    )
}



const styles = StyleSheet.create({
    detailContainer:{
        flexDirection:"column",
        paddingHorizontal:6,
    },
    detailMiniContainer:{
        flexDirection:"row",
        width:"78%",
        justifyContent:"space-between",
        marginVertical:7
    },
  });


  export default React.memo(DramaDetail)