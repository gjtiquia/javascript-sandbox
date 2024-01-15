import express from "express"
import dotenv from "dotenv";
import { authenticateToken } from "./middlewares/authenticateToken";
import { profileController } from "./controllers/profileController";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(authenticateToken); // Every request is authenticated

// Routes
app.get('/profile', profileController)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
    console.log('[server]: Press Ctrl+C to quit.');
});
