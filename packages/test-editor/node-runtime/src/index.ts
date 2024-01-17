import express, { Express } from "express";
import * as trpcExpress from '@trpc/server/adapters/express';
import z from "zod";
import { createContext, publicProcedure, router } from "./trpc";
import { getFilesAsync } from "./getFiles";

const appRouter = router({
    getFiles: publicProcedure
        .input(z.string())
        .query(async (opts) => {
            const { input } = opts;

            const files = await getFilesAsync(input);
            return files;
        })
});

const app: Express = express();
const PORT = 3000;

app.use('/api', trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
}));

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
    console.log('[server]: Press Ctrl+C to quit.');
});

export type AppRouter = typeof appRouter;