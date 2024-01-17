import type { NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import type { CommonRequest, CommonResponse } from "../types";
import { env } from "../environment";


export function authenticateToken(req: CommonRequest, res: CommonResponse, next: NextFunction) {

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: "No access token!" });

    const jwtSecret = env.AUTH_JWT_SECRET;
    jwt.verify(token, jwtSecret, (error, payload) => {

        if (error) {
            console.log(error);
            return res.status(403).json({ message: error.message });
        }

        res.locals.userId = (payload as JwtPayload).sub;
        next();
    });
}
