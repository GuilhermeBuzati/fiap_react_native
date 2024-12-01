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

export const editPost = async (post: Post): Promise<Post> => {

    try {

        console.log(api.defaults.headers);
        const result = await api.put(`/posts/${post.id}`, post);

        return result.data;

    } catch (err) {
        console.log(err);
        throw new Error("Erro ao editar o post por id");
    }
};

export const deletePost = async (postId: String): Promise<Post> => {

    try {
        const result = await api.delete(`/posts/${postId}`);

        return result.data;

    } catch (err) {
        console.log(err);
        throw new Error("Erro ao deletar o post por id");
    }
};

