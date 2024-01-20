import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from "@test-auth/server";

export const trpc = createTRPCReact<AppRouter>();