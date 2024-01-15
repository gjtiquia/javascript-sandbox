import express, { NextFunction, Request, Response } from "express"
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(express.json());

app.get('/profile', authenticateToken, (req, res) => {

    const userId = req.body.userId;
    console.log("GET /profile => userId:", userId);

    res.json({ userId: req.body.userId })
})

interface RequestHeader {
    authorization?: string
}

function authenticateToken(req: Request, res: Response, next: NextFunction) {

    const authHeader = (req.headers as RequestHeader).authorization;
    const token = authHeader && authHeader.split(' ')[1]
    if (!token)
        return res.status(401).json({ message: "No access token!" });


    const jwtSecret = process.env.AUTH_JWT_SECRET as string;
    jwt.verify(token, jwtSecret, (error, payload) => {

        if (error) {
            console.log(error)
            return res.status(403).json({ message: error.message })
        }

        req.body.userId = (payload as JwtPayload).sub;
        next()
    })
}

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
    console.log('[server]: Press Ctrl+C to quit.');
});