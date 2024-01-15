import type { NextFunction, Request as ExpressRequest, Response as ExpressResponse } from "express";

export interface CommonRequest extends ExpressRequest {
    headers: { authorization?: string }
}

export interface CommonResponse extends ExpressResponse {
    locals: { userId?: string }
}