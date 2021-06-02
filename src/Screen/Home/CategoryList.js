

import React from 'react'
import { FlatList} from 'react-native';
import HighLight from './HighLight'
import Category from './Category'

export default CategoryList = () => {
    const category =  ["Comedy","Adventure","Action","Romance","Crime","Kdrama"]

    const renderItem = ({item}) => (
        <Category  category={item} />
    )
    return(
        <FlatList
            ListHeaderComponent={
            <HighLight id={24}  />
            }
            data={category}
            renderItem={renderItem}
            keyExtractor={(index)=>index.toString()}
        />
        )
}