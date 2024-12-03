import api from './api';
import { SignInProps } from '../types/Login';
import { TeacherSignUp } from '../types/Teacher';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const saveTeacher = async (teacher: TeacherSignUp): Promise<void> => {

    try {
        const result = await api.post("/authors/signup", teacher);

        return result.data;
    } catch (err) {
        console.log(err);
        throw new Error("Erro tentar criar um novo usuário");
    }
};


export const signIn = async (signInProps: SignInProps): Promise<void> => {

    try {
        const result = await api.post("/authors/signin", signInProps);

        if (result) {
            const token = result.data.token;

            await AsyncStorage.setItem('@auth_token', token);
        }
    } catch (err) {
        console.log(err);
        throw new Error("Erro tentar conectar o usuário");
    }
};