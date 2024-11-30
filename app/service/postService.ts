import api from './api';
import Post from '../types/Post'; 


export const fetchData = async (): Promise<Post[]> => {

    try {
        const result = await api.get("/posts/");

        return result.data;
    } catch (err) {
        console.log(err);
        throw new Error("Erro ao buscar os posts");
    }
};

export const savePost = async (newPost: Partial<Post>): Promise<void> => {

    try {
        await api.post("/posts/", newPost);

    } catch (err) {
        console.log(err);
        throw new Error("Erro ao salvar o post");
    }
};
