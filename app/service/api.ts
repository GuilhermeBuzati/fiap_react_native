import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3IiOiJ7XCJpZFwiOlwiOGU2ZjNlOWUtYWY1Ny00ZWRjLTk3MmQtNjcxYzQyZDQ4NGExXCIsXCJlbWFpbFwiOlwiZ3VpbGhlcm1lQGdtYWlsLmNvbVwiLFwidXNlcm5hbWVcIjpcIkd1aWxoZXJtZVwifSIsImlhdCI6MTczMzE4NjYzNSwiZXhwIjoxNzMzMTg4NDM1fQ._I_fE07WeMZC7tswQo2wYLbYq6yvgTmy3rCmSI0IZCs',
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
