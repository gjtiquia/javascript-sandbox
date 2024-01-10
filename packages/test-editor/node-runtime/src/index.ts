import express, { Express, Request, Response } from "express";

const app: Express = express();
const PORT = 3000;

interface FileQuery {
    path?: string
}

app.get("/api/files", (req: Request, res: Response) => {
    const path = (req.query as FileQuery).path;
    console.log("Path Query:", path);

    res.status(200).json({ path })
})

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
    console.log('[server]: Press Ctrl+C to quit.');
});