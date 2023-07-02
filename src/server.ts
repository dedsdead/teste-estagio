import express, { Request, Response } from "express";

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.json({
        msg: 'ok'
    });
});

app.listen(8081, () => console.log("Servidor iniciado - PORTA 8081"));