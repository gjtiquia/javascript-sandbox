// References:
// - https://trpc.io/docs/quickstart#1-create-a-router-instance
// - https://trpc.io/docs/server/adapters/express#3-use-the-express-adapter

import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { CommonRequest, CommonResponse } from './types';

// created for each request
export const createContext = (opts: trpcExpress.CreateExpressContextOptions) => {
    return {
        request: opts.req as CommonRequest,
        response: opts.res as CommonResponse
    }
};

type Context = Awaited<ReturnType<typeof createContext>>;

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;