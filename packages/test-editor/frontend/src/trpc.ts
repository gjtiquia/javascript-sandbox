import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from "@test-editor/node-runtime";

export const trpc = createTRPCReact<AppRouter>();