import React,{useState,useEffect} from 'react'
import {Screen} from '../../Components/'
import EpisodeList from './Episode'
import DramaDetail from './DramaDetail'
import { getDrama,getEpisodes} from '../../api/service'


const Drama = ({route}) => {
    const {id} = route.params
    const [episode,setEpisode] = useState(false)
    const [drama,setDrama]  = useState(false)

    useEffect(() => {
        getDrama(id).then(drama => setDrama(drama))
        getEpisodes(id).then(data => setEpisode(data.results))
        },[])
    
    
    return (
        <Screen>
            <EpisodeList episode={episode} >
                <DramaDetail  id={id} drama={drama} />
            </EpisodeList>
        </Screen>
    )
}



export default Drama;