import { dbQuery } from "../services/storage";

export type Post = {
    id: number;
    nome: string;
    descricao: string;
    categoria: string;
}

const createPost = async (post: Post) => {
    await dbQuery(`INSERT INTO posts(nome, descricao, categoria) VALUES (?, ?, ?)`, [post.nome, post.descricao, post.categoria]);
    let resposta = await dbQuery(`SELECT id FROM posts WHERE nome = ?`, [post.nome]);
    return postById(resposta[0].id);
}

const listPosts = async () => {
    let resposta = await dbQuery(`SELECT * FROM posts`);
    return resposta as Post[];
}

const postById = async (id: number) => {
    let resposta = await dbQuery(`SELECT * FROM posts WHERE id = ?`, [id]);
    return resposta[0] as Post | undefined;
}

const updatePost = async (post: Post) => {
    await dbQuery(`UPDATE posts SET nome = ?, descricao = ?, categoria = ? WHERE id = ?`, [post.nome, post.descricao, post.categoria, post.id]);
    return postById(post.id);
}

const deletePost = async (id: number) => {
    let resposta = await dbQuery(`DELETE FROM posts WHERE id = ?`, [id]);
    return resposta;
}



export const postModel = {
    createPost, listPosts, postById, updatePost, deletePost
}