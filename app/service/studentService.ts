import Student from '../types/Student';
import api from './api';

export const saveStudent = async (student: Partial<Student>): Promise<void> => {

    try {
        const result = await api.post("/students/", student);

        return result.data;
    } catch (err) {
        console.log(err);
        throw new Error("Erro tentar criar um novo estudante");
    }
};

export const editStudent = async (student: Student): Promise<Student> => {

    try {
        const result = await api.put(`/students/${student.id}`, student);

        return result.data;

    } catch (err) {
        console.log(err);
        throw new Error("Erro ao editar o estudante por id");
    }
};

export const fetchStudents = async (): Promise<Student[]> => {

    try {
        const result = await api.get("/students/");

        return result.data;
    } catch (err) {
        console.log(err);
        throw new Error("Erro ao buscar os estudantes");
    }
};


export const deleteStudent = async (studentId: String): Promise<Student> => {

    try {
        const result = await api.delete(`/students/${studentId}`);

        return result.data;

    } catch (err) {
        console.log(err);
        throw new Error("Erro ao deletar o estudante por id");
    }
};