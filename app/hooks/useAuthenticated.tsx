import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('@auth_token');
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  return isAuthenticated;
}
