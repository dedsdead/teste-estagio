import sqlite3 from "sqlite3";

const database = process.env.DATABASE_FILE;

if (!database) {
    throw new Error("Database não registrada!");
}

export const connection = () => {
    let db = new sqlite3.Database(database);
    db.run(`CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome VARCHAR(127) NOT NULL,
        descricao VARCHAR(255) NOT NULL,
        categoria VARCHAR(127) NOT NULL
    )`);
    return db;
}

export const dbQuery = (query: string, params?: any[]) => {
    let db = connection();
    return new Promise<any[]>((resolve, reject) => {
        db.all(query, params, (error, rows) => {
            if (error) {
                reject(error);
            } else {
                resolve(rows);
            }
        });
        
    }).finally(() => {
        db.close();
    });
}