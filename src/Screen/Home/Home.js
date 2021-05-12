import React, { useState,useEffect} from 'react'
import { View, StyleSheet,Image ,FlatList} from 'react-native';
import {Title,IconButton,Button} from 'react-native-paper'
import ModalBox from '../../Components/ModalBox';
import {getDrama,getDramas} from '../../api/service';
import Screen from '../../Components/Screen'
import IconBtn,{WatchList} from '../../Components/Btns';
import CardBox from '../../Components/CardBox'

const HighLight = ({id}) => {
    const [drama,setDrama] = useState({})

    useEffect(() => {
        getDrama(id).then(drama=> setDrama(drama))
    }, [])
   
 

    return(
    <View style={styles.HighLightContainer}>
        <Image style={styles.poster} source={{uri:drama.poster}} />
        <View style={styles.btnContainer}>
               <WatchList id={id} />
                <Button icon="play" color="white" mode="contained">
                Play
                </Button>
                <ModalBox item={drama} >
                    <IconBtn  size={35} icon="information-outline"  name="info" />
                </ModalBox>
                    
        </View>
    </View>
    )}


const CardBoxList = ({category}) => {

    const [dramas,setDramas] = useState(false)

    useEffect(() => {
        getDramas(category).then(dramas=> setDramas(dramas))
    }, [])

    const renderItem = ({item}) => (
                <ModalBox item={item} >
                  <CardBox img={item.img} />
                </ModalBox>)

    return (
    <View>
        <Title style={{fontSize:23,fontWeight:"bold"}}>{category}</Title>
        <FlatList
        horizontal
        data={dramas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        />
    </View>)
}

const CategoryList = () => {
    const category =  ["Comedy","Adventure","Action","Romance","Crime"]

    const renderItem = ({item}) => (
        <CardBoxList  category={item} />
    )
    return(
        <View>
        <FlatList
        ListHeaderComponent={
        <HighLight id={12}  />
        }
        data={category}
        renderItem={renderItem}
        keyExtractor={(index)=>index.toString()}
        />
        </View>
        )
}

const Home = () => {
    return (
    <Screen>
        <CategoryList />
    </Screen>
    )
}

const styles = StyleSheet.create({
    HighLightContainer:{
        height:490,
    },
    btnContainer:{
        flexDirection:"row",
        position:"absolute",
        bottom:0,
        alignItems:"center",
        alignSelf:"center",
        width:"100%",
        justifyContent:"space-evenly"

    },
    poster:{
        width:"100%",
        height:490,
        resizeMode:"cover",
        opacity:0.8
    }
  });

export default Home