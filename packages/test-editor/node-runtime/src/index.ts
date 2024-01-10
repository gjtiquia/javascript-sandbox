import express, { Express, Request, Response } from "express";

const app: Express = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
    console.log('[server]: Press Ctrl+C to quit.');
});