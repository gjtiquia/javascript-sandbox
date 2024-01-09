import express, { Express, Request, Response } from "express";
import path from "path";

const app: Express = express();
const PORT = 3000;

// TODO : Probably... no need to serve frontend via express, can probably just serve frontend and backend separately on different ports and just connect frontend to backend using REST api calls
// TODO : That way, frontend just need to concern with hosting itself (can use stuff like Vite for Hot Module Replacement), backend just need to concern with file system stuff.

app.use("/", express.static(path.join(__dirname, '../../frontend')));

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
    console.log('[server]: Press Ctrl+C to quit.');
});