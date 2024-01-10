import fs from "fs";
import fsAsync from "fs/promises";
import express, { Express, Request, Response } from "express";

const app: Express = express();
const PORT = 3000;

interface FileQuery {
    path?: string
}

app.get("/api/files", async (req: Request, res: Response): Promise<void> => {
    const path = (req.query as FileQuery).path;

    console.log("Path Query:", path);

    if (!path) {
        res.status(400).send("Path not undefined!");
        return;
    }

    const pathExists = fs.existsSync(path);
    if (!pathExists) {
        res.status(400).send(`Path '${path}' does not exist!`);
        return;
    }

    const isDirectory = fs.lstatSync(path).isDirectory();
    if (!isDirectory) {
        res.status(400).send(`Path '${path}' is not a directory!`);
        return;
    }

    const files = await fsAsync.readdir(path);
    res.status(200).json(files)
})

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
    console.log('[server]: Press Ctrl+C to quit.');
});