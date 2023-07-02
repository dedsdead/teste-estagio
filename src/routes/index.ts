import { Application, Router } from "express";
import { postsRouter } from "./postsRoutes";

export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/posts', postsRouter);

    app.use('/', apiRouter);

}