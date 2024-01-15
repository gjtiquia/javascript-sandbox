import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface RequestHeader {
    authorization?: string;
}
export function authenticateToken(req: Request, res: Response, next: NextFunction) {

    const authHeader = (req.headers as RequestHeader).authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: "No access token!" });


    const jwtSecret = process.env.AUTH_JWT_SECRET as string;
    jwt.verify(token, jwtSecret, (error, payload) => {

        if (error) {
            console.log(error);
            return res.status(403).json({ message: error.message });
        }

        req.body.userId = (payload as JwtPayload).sub;
        next();
    });
}
