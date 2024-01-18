import z from "zod";
import { publicProcedure, router } from "../trpc";
import { getProfileAsync } from "../routes/getProfile";
import { TRPCError } from "@trpc/server";
import { setBioAsync } from "./setBio";

export const appRouter = router({
    getProfile: publicProcedure
        .query(async (opts) => {
            const { ctx } = opts;

            const userId = ctx.response.locals.userId;
            if (!userId)
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "No valid user ID!"
                })

            return await getProfileAsync(userId);
        }),

    setBio: publicProcedure
        .input(z.string())
        .mutation(async (opts) => {
            const { input, ctx } = opts;

            const userId = ctx.response.locals.userId;
            if (!userId)
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "No valid user ID!"
                })

            return await setBioAsync(userId, input);
        })
});

export type AppRouter = typeof appRouter;