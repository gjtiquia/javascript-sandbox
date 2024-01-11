import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client';
import { trpc } from './trpc';
import App from './App.tsx'
import './index.css'

const queryClient = new QueryClient()
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: '/api', // proxy set up in vite.config.ts
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
