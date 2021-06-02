import {CardBox,ModalBox} from '../../Components'
import {Title} from 'react-native-paper'
import { FlatList} from 'react-native';
import {getDramas} from '../../api/service';
import React, { useState,useEffect} from 'react'

const Category = ({category}) => {
    const [dramas,setDramas] = useState(false)

    useEffect(() => {
        getDramas(category).then(dramas=>{ 
            setDramas(dramas.results)
        })
    }, [])

    const renderItem = ({item}) => (
                <ModalBox item={item} >
                  <CardBox img={item.img} />
                </ModalBox>)

    return (
        <>
            <Title 
            style={{fontSize:23,fontWeight:"bold"}}
            >{category}
            </Title>
            <FlatList
                horizontal
                data={dramas}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </>)
}

export default React.memo(Category)