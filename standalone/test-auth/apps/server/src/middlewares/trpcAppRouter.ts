import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext } from "../trpc";
import { appRouter } from '../routes';

export const trpcAppRouter = trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
});
