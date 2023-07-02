import { Response } from "express";

export const ok = (res: Response) => res.sendStatus(200);

export const badRequest = (res: Response, error: string) => {
    res.status(400).json({
        error
    });
}

export const notFound = (res: Response) => res.sendStatus(404);

export const internalError = (res: Response, error: Error) => {
    res.status(500).json({
        error: error.message
    });
}