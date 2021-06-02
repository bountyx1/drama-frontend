import { storeRefresh, storeToken } from '../store/login'
import {apiAuth, apiPost, apiPostAuth,apiDeleteAuth} from './explore'

export const getDrama =  (id) => {
    let url = `/api/dramas/${id}/?format=json&query={id,description,title,img,poster,ua,year,seasons}`
    return apiAuth(url)
}

export const getDramas =  (category) => {
    let url = `/api/dramas/?format=json&category=${category}&query={id,description,title,img}`
    return apiAuth(url)
}


export const searchDrama = (searchQuery) => {
    let url = `/api/dramas/?format=json&search=${searchQuery}`
    return apiAuth(url)
}


export const popularDrama = () => {
    let url = `/api/dramas/?format=json&limit=15&offset=16000`
    return apiAuth(url)
}


export const getEpisodes = (dramaid) => {
    let url = `/api/episodes/?dramaid=${dramaid}&format=json`
    return apiAuth(url)
}


export const addToList =  (params) => {
    let url = `/api/watchlist/?format=json`
    return apiPostAuth(url,params).then(res => 
        {
            return (res.id) ? true : false
        })
}

export const delList =  (id) => {
    let url = `/api/watchlist/${id}/?format=json`
    return apiDeleteAuth(url).then(res => 
        {
            return (res.id) ? true : false
        })
}

export const addLike =  (params) => {
    let url = `/api/likes/?format=json`
    return apiPostAuth(url,params).then(res => 
        {
            return (res.id) ? true : false
        })
}

export const delLike =  (id) => {
    let url = `/api/likes/${id}/?format=json`
    return apiDeleteAuth(url).then(res => 
        {
            return (res.id) ? true : false
        })
}

export const Login = (username,password) => {
    const params = {}
    params.username = username
    params.password = password
    return apiPost("/api/token/",params).then(res => 
        {
             if(res.access) {
                storeToken(res.access)
                storeRefresh(res.refresh)
                return true 
            }
            else{
                return false
            }
        }).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            });
}


export const signUp = (username,password,email,fname,lname) => {
    const params = {}
    params.username = username
    params.password = password
    params.email = email
    params.first_name = fname
    params.last_name  = lname
    return apiPost("/api/users/",params).then(res => 
        {
             if(res.success) {
                return res
            }
            else{
                return res
            }
        }).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            });
}

export const userInfo = async () => {
    let url = `/api/users/`
    let response = await apiAuth(url)
    return response
}

export const getUser =  () => {
    let url = `/api/users/`
    return apiAuth(url).then(res => 
        {
         return res[0]
        }).catch(error => console.log(error));
}

export const createRoom = (params) => {
    let url = `/api/rooms/`
    return apiPostAuth(url,params)
}

export const getRoom = (id) => {
    let url = `/api/rooms/?room=${id}&format=json`
    return apiAuth(url)
}

export const JoinChatRoom = (socket,profile,room) => socket.emit("joinRoom",{profile,room})
export const SendChatMessage =  (socket,msg) => socket.emit("chat",msg)
export const SendPlayerEvent =  (socket,msg) => socket.emit("player",msg)