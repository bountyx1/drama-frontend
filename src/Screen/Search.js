import React,{useEffect,useState} from 'react'
import { View,StyleSheet ,Image} from 'react-native'
import { Searchbar ,Title,Surface, IconButton} from 'react-native-paper';
import { popularDrama, searchDrama } from '../api/service';
import CardBox from '../Components/CardBox';
import Screen from '../Components/Screen'
import ModalBox from '../Components/ModalBox'
import ListItem from '../Components/ListItem';




const SearchResult = ({data}) => {
    const renderItem = ({item})=>  (
        <ModalBox item={item} >
            <CardBox img={item.img} />
        </ModalBox>)
    return(
        <ListItem data={data} renderItem={renderItem} title="Tv Shows and Movies"  column={3} />
    )
}

const PlayBox = ({img,title}) => {
    return(
    <View style={styles.PlayBoxContainer}>
            <Surface style={styles.surface}>
                <Image style={styles.playBoxImg} source={{uri:img}} />
                <View style={{alignItems:"center",flex:1,flexDirection:"row"}}>
                    <Title style={{fontSize:13,paddingLeft:10}}>{title}</Title>
                    <IconButton style={{position:"absolute",right:0}} icon="play-circle-outline" size={30} />
                </View>
            </Surface>
    </View>
    )
}

const PopularSearch = () => {
    const [popular,setPopular] = useState(false)

    useEffect(()=>{
        popularDrama().then(data=>setPopular(data))
    },[])

    const renderItem =  ({item}) => (
        <ModalBox item={item}>
            <PlayBox title={item.title} img={item.img} />
        </ModalBox>
        )

    return(
        <ListItem title="Top Searches" renderItem={renderItem} data={popular} column={0} />
        ) 
}

const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [drama,setDrama] = useState(false);

    const onChangeSearch = query => {
        setSearchQuery(query)    
    };

    useEffect(()=>{
        searchDrama(searchQuery).then(
            data =>setDrama(data)
            )
    },[searchQuery])

    return (
        <Screen>
                <Searchbar
                placeholder="Search For show,movie,genre etc"
                onChangeText={onChangeSearch}
                value={searchQuery}
                />
                <View style={styles.searchContainer}>
                    { searchQuery ? <SearchResult data={drama} /> :  <PopularSearch />}
                </View>
        </Screen>
    )
}


const styles = StyleSheet.create({
    searchContainer:{
        padding:10
    },
    surface:{
        height:81,
        width: "100%",
        elevation: 3,
        flex:1,
        flexDirection:"row"
    },
    playBoxImg:{
        width:130,
        height:80,
        resizeMode:"cover",
        marginTop:1,
        borderRadius:5
    },
    PlayBoxContainer:{
        flex:1,
        paddingVertical:3
    }
  });



export default SearchScreen