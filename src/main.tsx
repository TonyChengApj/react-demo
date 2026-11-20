import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import './index.css'
import App from './App.tsx'

const clientId = import.meta.env.VITE_ENTRA_CLIENT_ID
const tenantId = import.meta.env.VITE_ENTRA_TENANT_ID
const guid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const configured = guid.test(clientId ?? '') && guid.test(tenantId ?? '')

const msal = configured
  ? new PublicClientApplication({
      auth: {
        clientId,
        authority: `https://login.microsoftonline.com/${tenantId}`,
        redirectUri: window.location.origin + import.meta.env.BASE_URL,
        postLogoutRedirectUri: window.location.origin + import.meta.env.BASE_URL,
      },
    })
  : null

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {msal ? (
      <MsalProvider instance={msal}>
        <App />
      </MsalProvider>
    ) : (
      <main>
        <h1>Configuration required</h1>
        <p>Set valid VITE_ENTRA_CLIENT_ID and VITE_ENTRA_TENANT_ID values in .env.local. See the README for setup instructions.</p>
      </main>
    )}
  </StrictMode>,
)
