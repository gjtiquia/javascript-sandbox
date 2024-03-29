import express from "express"
import cors from "cors";
import { authenticateToken } from "./middlewares/authenticateToken";
import { env } from "./environment";
import { trpcAppRouter } from "./middlewares/trpcAppRouter";

const app = express();
const PORT = env.PORT;

// Middleware
app.use(cors({
    origin: [
        // Note: Do not add an extra backslash at the end
        env.SITE_URL
    ]
}))

app.use(express.json());
app.use(authenticateToken); // Every request is authenticated

// Router
app.use(trpcAppRouter)

app.listen(PORT, () => {
    console.log(`[server]: Server is running at: http://localhost:${PORT}`);
    console.log(`[server]: Allowing CORS from site URL:`, env.SITE_URL);
    console.log('[server]: Press Ctrl+C to quit.');
});
