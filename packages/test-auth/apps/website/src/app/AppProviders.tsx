import { ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from '../utils/trpc';

interface AppProvidersProps {
    accessToken?: string,
    children: ReactNode
}

export function AppProviders(props: AppProvidersProps) {

    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient, setTrpcClient] = useState(() => createTrpcClient(props.accessToken))

    // Update the trpc client with a new authorization header everytime the access token changes
    // A workaround because the state does not re-initialize when props change
    useEffect(() => {
        setTrpcClient(() => createTrpcClient(props.accessToken))
    }, [props.accessToken])

    function createTrpcClient(accessToken?: string) {
        return trpc.createClient({
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
