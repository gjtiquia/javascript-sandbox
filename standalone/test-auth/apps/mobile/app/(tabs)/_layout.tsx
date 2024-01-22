import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from '@/lib/trpc';
import { TabLayout } from '../../components/TabLayout';
import { getAccessToken } from "@/lib/accessToken";

interface AppProvidersProps {
  children: ReactNode
}

const url = "http://192.168.50.188:3000";
// const url = "http://localhost:3000";

function AppProviders(props: AppProvidersProps) {

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => createTrpcClient())

  function createTrpcClient() {

    return trpc.createClient({
      links: [
        httpBatchLink({
          url: url,
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

export default function WrappedTabLayout() {
  return (
    <AppProviders>
      <TabLayout />
    </AppProviders>
  )
}