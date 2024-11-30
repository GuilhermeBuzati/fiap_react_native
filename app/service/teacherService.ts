import api from './api';
import { TeacherSignUp } from '../types/Teacher';


export const signUp = async (teacher: TeacherSignUp): Promise<void> => {

    try {
        const result = await api.post("/authors/signup", teacher);

        return result.data;
    } catch (err) {
        console.log(err);
        throw new Error("Erro tentar criar um novo usuário");
    }
};
