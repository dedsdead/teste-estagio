import { Request, Response } from "express";
import { badRequest, internalError, notFound, ok } from "../services/utils";
import { Post, postModel } from "../models/post";

const createPost = (req: Request, res: Response) => {
    let post = req.body.post;
    if (!post) {
        return badRequest(res, "Produto inválido!");
    }
    if (!post.nome) {
        return badRequest(res, "Informe o nome do post!");
    }
    if(!post.categoria){
        return badRequest(res, "Informe a categoria do post!");
    }

    post = req.body.post as Post;
    return postModel.createPost(post)
        .then(post => {
            res.json({
                post
            });
        })
        .catch(error => internalError(res, error));
    
}

const listPosts = (req: Request,res: Response) => {
    return postModel.listPosts()
        .then(posts => {
            res.json(posts);
        })
        .catch(error => internalError(res, error));
    
}

const postById = (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
        return badRequest(res, "Informe o id do post!");
    }

    if(!parseInt(id)){
        return badRequest(res, "Id inválido!");
    } 
    
    return postModel.postById(parseInt(id))
        .then(post => {
            if (post) {
                res.json(post);
            } else {
                return notFound(res);
            }
            
        })
        .catch(error => internalError(res, error));
    
}

const updatePost = async (req: Request, res: Response) => {
    const id = req.params.id;
    let oldPost = await postModel.postById(parseInt(id));

    if (!oldPost) {
        return notFound(res);
    }

    if (!id) {
        return badRequest(res, "Informe o id do post!");
    }

    if(!parseInt(id)){
        return badRequest(res, "Id inválido!");
    } 
    
    const post = req.body.post as Post;

    if(post.nome) oldPost.nome = post.nome;
    if(post.descricao) oldPost.descricao = post.descricao;
    if(post.categoria) oldPost.categoria = post.categoria;

    return postModel.updatePost(oldPost)
        .then((post) => {
            res.json(post)
        })
        .catch(error => internalError(res, error));
    
}

const deletePost = (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
        return badRequest(res, "Informe o id do post!");
    }

    if(!parseInt(id)){
        return badRequest(res, "Id inválido!");
    } 
    
    return postModel.deletePost(parseInt(id))
        .then(() => {
            ok(res);
        })
        .catch(error => internalError(res, error));
    
}

export const postController = {
    createPost, listPosts, postById, updatePost, deletePost
}