import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiBaseUrl = 'http://192.168.18.3:5000';

let axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    console.log(token);
    return token ? token : '';
  } catch (error) {
    console.log('Error retrieving token from AsyncStorage: ', error);
    return '';
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    config.headers['x-auth-token'] = token;
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';

export default axiosInstance;
