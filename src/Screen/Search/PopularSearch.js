import { popularDrama } from '../../api/service';
import {ListItem,ModalBox} from '../../Components';
import React,{useEffect,useState} from 'react'
import PlayBox from './PlayBox'


const PopularSearch = () => {
    const [popular,setPopular] = useState(false)

    useEffect(()=>{
        popularDrama().then(data=>setPopular(data.results))
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

export default PopularSearch;