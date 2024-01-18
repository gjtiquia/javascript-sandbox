import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from '../utils/trpc';
import { getAccessToken } from "../utils/auth";

interface AppProvidersProps {
    children: ReactNode
}

export function AppProviders(props: AppProvidersProps) {

    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() => createTrpcClient())

    function createTrpcClient() {

        return trpc.createClient({
            links: [
                httpBatchLink({
                    url: import.meta.env.VITE_API_URL,
                    headers() {
                        return {
                            Authorization: "Bearer " + getAccessToken()
                        };
                    }
                }),
            ],
        })
    }

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {props.children}
            </QueryClientProvider>
        </trpc.Provider>
    )
}
