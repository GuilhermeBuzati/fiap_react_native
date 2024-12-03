import api from './api';
import { LoginResponse, SignInProps } from '../types/Login';
import Teacher, { TeacherSignUp } from '../types/Teacher';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const saveTeacher = async (teacher: TeacherSignUp): Promise<LoginResponse> => {

    try {
        const result = await api.post("/authors/signup", teacher);

        return result.data;
    } catch (err) {
        console.log(err);
        throw new Error("Erro tentar criar um novo usuário");
    }
};

export const fetchTeachers = async (): Promise<Teacher[]> => {

    try {
        const result = await api.get("/authors/");

        return result.data;
    } catch (err) {
        console.log(err);
        throw new Error("Erro ao buscar os professores");
    }
};

export const editTeacher = async (teacher: Teacher): Promise<Teacher> => {

    try {
        const result = await api.put(`/authors/${teacher.id}`, teacher);

        return result.data;

    } catch (err) {
        console.log(err);
        throw new Error("Erro ao editar o professor por id");
    }
};

export const deleteTeacher = async (teacherId: String): Promise<Teacher> => {

    try {
        const result = await api.delete(`/authors/${teacherId}`);

        return result.data;

    } catch (err) {
        console.log(err);
        throw new Error("Erro ao deletar o professor por id");
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