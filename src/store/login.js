import { AsyncStorage } from 'react-native';

export const _storeData =  (key,value) => {
    try {
    AsyncStorage.setItem(key,value);
    } catch (error) {
      console.log(error)
    }
  };


export const _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
          return value
      }
    } catch (error) {
        console.log(error)
    }
  };

export const storeToken = (value) => _storeData("token",value)
export const storeRefresh = (value) => _storeData("refresh",value)
export const getToken = () => _retrieveData("token")
export const getRefresh = () => _retrieveData("refresh")
