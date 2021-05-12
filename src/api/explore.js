import axios from "axios";
import socketClient  from "socket.io-client";
import {getToken} from '../store/login'
import {API_CODE,BACKEND} from './constants'



export const socket = socketClient(BACKEND.CHAT);

const client = axios.create({
    baseURL: BACKEND.API,
    timeout: 1000,
    headers: {}
});



async function apiCheckStatus (res) {
  const {status, data, config} = res;
  const {url, method, data: requestData = ''} = config;
  return data;
}


export  function api (url, paramOptions) {
    const options = paramOptions || {};
    const {data, headers} = options;
    return client(url, {
      headers: headers || {'Content-Type': 'application/json'},
      ...options,
      data: data || {}
    })
      .then(response => apiCheckStatus(response, url, options))
  }
  

export function apiPost (url, params) {
    return api(
      url, {method: 'post', data: params || {}}
    );
  }
  
export function apiDelete (url, params) {
    return api(url, {method: 'delete', data: params || {}});
  }

export function apiPut (url, params) {
    return api(url, {method: 'put', data: params || {}});
  }

export function  apiAuth(url,params){
          return getToken().then(token => {
            return api(
              url,{headers:{"Authorization":`Bearer ${token}`},data:params || {} 
              }).then(res => {return res })
          })
}


export function apiPostAuth(url,params){
  return getToken().then(token => {
    return api(
      url,
      {
        method:"post",
        headers:{"Authorization":`Bearer ${token}`},
        data: params || {} 
      }).then(res => {return res })
  })

}


export function apiDeleteAuth(url,params){
  return getToken().then(token => {
    return api(
      url,
      {
        method:"delete",
        headers:{"Authorization":`Bearer ${token}`},
        data: params || {} 
      }).then(res => {return res })
  })

}