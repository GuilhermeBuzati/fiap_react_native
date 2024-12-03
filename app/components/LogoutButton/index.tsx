import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Alert } from "react-native";

export function Logout({ navigation }: any) {
    React.useEffect(() => {
      const handleLogout = async () => {
        await AsyncStorage.removeItem('@auth_token');
        Alert.alert('Logout', 'Você saiu com sucesso!');
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginProfessor' }],
        });
      };
  
      handleLogout();
    }, [navigation]);
  
    return null;
  }