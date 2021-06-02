import {ListItem,ModalBox,CardBox} from '../../Components';
import React from 'react'


const SearchResult = ({data}) => {
    const renderItem = ({item})=>  (
        <ModalBox item={item} >
            <CardBox img={item.img} />
        </ModalBox>)
    return(
        <ListItem data={data} renderItem={renderItem} title="Tv Shows and Movies"  column={3} />
    )
}

export default SearchResult;