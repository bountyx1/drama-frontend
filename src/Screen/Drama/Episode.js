import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View,StyleSheet, Image,FlatList} from 'react-native'
import {  Paragraph,  IconButton, Subheading } from 'react-native-paper'


const EpisodeBox = ({episode})=>{
    const {description,thumbnailLink,title,video,header} = episode.item
    let {index} = episode
    const navigation = useNavigation();

    const _goToVideo = (video,header) => {
        navigation.navigate(
            'Player',{
                video,
                header
            }
        )
    }
    return(
        <View>
            <View style={styles.episodeMiniContainer}>

                <Image 
                style={styles.thumbNail} 
                source={{uri:thumbnailLink||"https://dj9qbnzzr9kvd.cloudfront.net/prev_cache/02e6769a51f6af7c436aaae949685bc8c702af30.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kajlxYm56enI5a3ZkLmNsb3VkZnJvbnQubmV0L3ByZXZfY2FjaGUvMDJlNjc2OWE1MWY2YWY3YzQzNmFhYWU5NDk2ODViYzhjNzAyYWYzMC5wbmciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODM3OTI5ODN9fX1dfQ__&Signature=ckMZWBnrE~N2-JLsNI37XS2AxL1E5-m0TXuqGHsfFdtZY54ya3UBi~6s~35aqRoZN0wu9Idj2GPXRrlxsZuj6PGFSiDTA7qRVuugx2agxR-xwnci6HVP90yXff9KvIQzLrZJkr05R9xBojhcq6uRf6FADcCZg9U8L66hC0TVpCc_&Key-Pair-Id=APKAIO477MYVHURLGJSA" }} 
                />

                <IconButton 
                onPress={()=>_goToVideo(video,header)} 
                color="white"  
                icon="play-circle-outline" 
                size={40} 
                style={styles.episodePlayBtn} 
                />

                <Subheading style={styles.episodeTitle}>
                   {index+1}. {title}
                </Subheading>
            </View>
            
            <Paragraph
            style={styles.episodedescription} 
            numberOfLines={3}
            >
                {description}
            </Paragraph>
        </View>
    )
}


const EpisodeList = ({episode,children}) => {
    

    const renderItem = (item,index) => (
        <EpisodeBox episode={item} index={index}/>
    )
    return(
        <View style={{paddingHorizontal:12}}>
        <FlatList
        ListHeaderComponent={
            <View>
            {children}
            <Subheading>Season 1</Subheading>
            <Subheading>Episodes</Subheading>
            </View>
        }
        data={episode}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        />
        
        </View>
    )
}


const styles = StyleSheet.create({
    episodeTitle:{
        fontSize:13,
        fontWeight:"bold",
        flex:1,
    },
    episodedescription:{
        opacity:0.7,
        fontSize:12,
    },
    episodePlayBtn:{
        position:'absolute',
        opacity:0.7,
        left:35,
        top:10
    },
    thumbNail:{
        width:150,
        height:100,
        resizeMode:"cover",
        borderRadius:5

    },
    episodeMiniContainer:{
        flex:1,
        flexDirection:"row",
        marginTop:12
    }
  });

  export default React.memo(EpisodeList)