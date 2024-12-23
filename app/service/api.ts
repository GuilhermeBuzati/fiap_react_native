import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json'
  },
});


api.interceptors.request.use(
  async (config) => {
    try {
        const token = await AsyncStorage.getItem('@auth_token');
    
        if (!token) {
          config.headers['Authorization'] = '';
        } else {
          config.headers['Authorization'] = 'Bearer ' + token;
        }

    } catch (error) {
      console.error('Erro ao recuperar o token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
