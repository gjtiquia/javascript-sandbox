import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

const jwtSecret = process.env.AUTH_JWT_SECRET as string;
const token = "invalid token";

try {
    jwt.verify(token, jwtSecret);
}
catch (e) {
    console.error("Error:", (e as Error).message)
}

