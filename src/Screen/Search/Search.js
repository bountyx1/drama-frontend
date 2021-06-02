import React,{useEffect,useState} from 'react'
import { View,StyleSheet ,Image} from 'react-native'
import { Searchbar} from 'react-native-paper';
import { searchDrama } from '../../api/service';
import {Screen} from '../../Components';
import SearchResult from './SearchResult';
import PopularSearch from './PopularSearch'


const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [drama,setDrama] = useState(false);

    const onChangeSearch = query => {
        setSearchQuery(query)    
    };

    useEffect(()=>{
        searchDrama(searchQuery).then(
            data =>{
                setDrama(data.results)
                console.log(drama)
            })
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
  });



export default Search