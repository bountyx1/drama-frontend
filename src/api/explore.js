import axios from "axios";
import {getToken} from '../store/login'
import {API_CODE,BACKEND} from './constants'




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


export async function api (url, paramOptions) {
    const options = paramOptions || {};
    const {data, headers} = options;
    try {
    let response = await client(url, {
      headers: headers || {'Content-Type': 'application/json'},
      ...options,
      data: data || {}
    })
    return apiCheckStatus(response, url, options)
  }
  catch(err){
    // Create a function to handle errors
    console.log(`${url}---->`,err)
    return false
  }
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

export async function  apiAuth(url,method,params){
         let token =  await getToken()
         let response = await api(
          url,
          {
            method:method || "get",
            data:params || {},
            headers:{"Authorization":`Bearer ${token}`},
          })
          return response
            
}


export async function apiPostAuth(url,params){
  let response = await apiAuth(url,"post", params);
  return response
}


export async function apiDeleteAuth(url,params){
  return await apiAuth(
    url, {method: 'delete', data: params || {}}
  );

}