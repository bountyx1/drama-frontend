import React,{useState,useEffect} from 'react'
import { View,StyleSheet, Image,FlatList} from 'react-native'
import { Button, Paragraph, Title,Text, IconButton, Divider, Subheading } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import Screen from '../../Components/Screen'
import { getDrama, getEpisodes } from '../../api/service'
import IconBtn,{WatchList,Like} from '../../Components/Btns';



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
               
                <Image style={styles.thumbNail} source={{uri:thumbnailLink}} />
                <IconButton onPress={()=>_goToVideo(video,header)} color="white"  icon="play-circle-outline" size={40} style={{position:'absolute',opacity:0.7,left:35,top:10}} />
                <Subheading style={{fontSize:13,fontWeight:"bold",alignSelf:"center",paddingLeft:5 }}>
                   {index+1}. {title}
                </Subheading>
                <IconButton color="white" icon="dots-vertical" style={{position:"absolute",right:0,top:18}} size={28} />
            </View>
            <Paragraph style={{opacity:0.7,fontSize:12}} numberOfLines={3}>
                {description}
            </Paragraph>
        </View>
    )
}


const EpisodeList = ({id,children}) => {
    const [episode,setEpisode] = useState(false)
    
    useEffect(() => {
        getEpisodes(id).then(
            data => setEpisode(data)
            )
        },[])

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

const DramaDetail = ({id}) => {
    const [drama,setDrama]  = useState({})
    const {title,description,year,seasons,ua} = drama
    useEffect(() => {
        getDrama(id).then(drama => setDrama(drama))
    }, [])

return(
    <View>
    <View style={styles.detailContainer}>
        <Title style={{fontSize:28,fontWeight:"bold"}}>{title}</Title>

        <View style={styles.detailMiniContainer}>
            <Text style={{color:"green",fontWeight:"bold"}}> 97% Match </Text>
            <Text>{year}</Text>
            <View style={{backgroundColor:"#252525"}}>
                <Text> {ua} </Text>
            </View>
           
            <Text> {seasons} Seasons </Text>
        </View>

        <Button icon="play" color="white" mode="contained" uppercase={false}>
            Play
        </Button>

        <Paragraph numberOfLines={4}>
            {description}
        </Paragraph>

        <View style={{...styles.detailMiniContainer,...{paddingLeft:8}}}>
            <WatchList id={id} />
            <Like id={id} />
            <IconBtn icon="share-variant" name="Share" size={33} />
        </View>
        
    </View>
    <Divider style={{height:4}}/>
    </View>
    )
}

const Drama = ({route}) => {
    const {id} = route.params
    return (
        <Screen>
            <EpisodeList id={id} >
                <DramaDetail  id={id} />
            </EpisodeList>
        </Screen>
    )
}

const styles = StyleSheet.create({
    detailContainer:{
        flex:0,
        flexDirection:"column",
        paddingHorizontal:6,
    },
    detailMiniContainer:{
        flex:0,
        flexDirection:"row",
        width:250,
        justifyContent:"space-between",
        marginVertical:7
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



export default Drama;