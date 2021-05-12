import React from 'react'
import { Title} from 'react-native-paper';
import { FlatList} from 'react-native'

export default function ListItem({data,title,renderItem,column}) {
    return (
        <>
            <Title>{title}</Title>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={column}
                contentContainerStyle={{marginTop:10}}
            />
        </>
    )
}
