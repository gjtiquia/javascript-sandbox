import { Request, Response } from "express";

export function profileController(req: Request, res: Response) {
    const userId = req.body.userId;
    console.log("GET /profile => userId:", userId);

    return res.json({ userId: req.body.userId });
}
