import { Router } from "express";
import { postController } from "../controllers/postsController";

const postsRouter = Router();
postsRouter.post('/', postController.createPost);
postsRouter.get('/', postController.listPosts);
postsRouter.get('/:id', postController.postById);

postsRouter.put('/:id', postController.updatePost);

postsRouter.delete('/:id', postController.deletePost);

export {
    postsRouter
}