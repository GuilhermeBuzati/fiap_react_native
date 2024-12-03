import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3IiOiJ7XCJpZFwiOlwiODYxMTgzZmItZDFlMC00N2ZmLWI0NDAtYzkxMzcwZTZiNDFjXCIsXCJlbWFpbFwiOlwiZXhhbXBsZUBleGFtcGxlLmNvbVwiLFwidXNlcm5hbWVcIjpcIkpvaG4gRG9lXCJ9IiwiaWF0IjoxNzMzMTg0NjE1LCJleHAiOjE3MzMxODY0MTV9.sRilfH3WXqgAr7avCvLKxUuQvRh5dwZ3jKOVJmHRNBk',
  },
});


api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('@auth_token');
      // if (token) {
      //   console.log(token)
      //   config.headers.Authorization = `Bearer ${token}`;
      // }

    } catch (error) {
      console.error('Erro ao recuperar o token:', error);
    }
    return config;
  },
  (error) => {
    // Lidar com erros no interceptor
    return Promise.reject(error);
  }
);

export default api;
