import express, { Express, Request, Response } from "express";
import path from "path";

const app: Express = express();
const PORT = 3000;

app.use("/", express.static(path.join(__dirname, '../../frontend')));

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
    console.log('[server]: Press Ctrl+C to quit.');
});