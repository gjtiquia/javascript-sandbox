import { CommonRequest, CommonResponse } from "../types";

export function profileController(req: CommonRequest, res: CommonResponse) {
    const userId = res.locals.userId;

    console.log("GET /profile => userId:", userId);

    return res.json({ userId: userId });
}
