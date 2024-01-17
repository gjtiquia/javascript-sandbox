import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client';
import App from './App.tsx'
import './index.css'
import { trpc } from './utils/trpc'

const accessToken = "asd"; // TODO : lift up the auth state, such that trpc client has access to it

const queryClient = new QueryClient()
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_API_URL,
      headers() {
        return {
          Authorization: "Bearer " + accessToken
        }
      }
    }),
  ],
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </trpc.Provider>
  </React.StrictMode>,
)
