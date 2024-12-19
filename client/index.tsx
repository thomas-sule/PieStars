import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Auth0Provider } from '@auth0/auth0-react'

import App from './components/App.tsx'

const queryClient = new QueryClient()

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain="manaia-roa-2024-thomas-s.au.auth0.com"
      clientId="t46WO1m38ivYSBtRecIjtx6LjaAWfAqv"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'https://pies/api',
      }}
    >
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Auth0Provider>,
  )
})
