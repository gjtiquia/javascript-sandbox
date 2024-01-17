import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from '../utils/trpc';

const accessToken = "asd"; // TODO : lift up the auth state, such that trpc client has access to it

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: import.meta.env.VITE_API_URL,
            headers() {
                return {
                    Authorization: "Bearer " + accessToken
                };
            }
        }),
    ],
});
interface AppProvidersProps {
    children: ReactNode;
}
export function AppProviders(props: AppProvidersProps) {
    return <>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {props.children}
            </QueryClientProvider>
        </trpc.Provider>
    </>;
}
