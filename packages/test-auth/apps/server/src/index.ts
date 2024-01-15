import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import { authenticateToken } from "./middlewares/authenticateToken";
import { profileController } from "./controllers/profileController";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: [
        // Note: Do not add an extra backslash at the end
        process.env.SITE_URL as string
    ]
}))

app.use(express.json());
app.use(authenticateToken); // Every request is authenticated

// Routes
app.get('/profile', profileController)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`[server]: Server is running at: http://localhost:${PORT}`);
    console.log(`[server]: Allowing CORS from site URL:`, process.env.SITE_URL);
    console.log('[server]: Press Ctrl+C to quit.');
});
