import { useState } from 'react'
import { InteractionStatus } from '@azure/msal-browser'
import { useMsal } from '@azure/msal-react'
import './App.css'

function App() {
  const { instance, accounts, inProgress } = useMsal()
  const [error, setError] = useState('')
  const account = accounts[0]

  async function signIn() {
    setError('')
    try {
      await instance.loginRedirect({ scopes: ['openid', 'profile'] })
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Sign-in failed.')
    }
  }

  async function signOut() {
    setError('')
    try {
      await instance.logoutRedirect({ account })
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Sign-out failed.')
    }
  }

  return (
    <main>
      <h1>React + Microsoft Entra ID</h1>
      {inProgress !== InteractionStatus.None ? (
        <p>Loading authentication...</p>
      ) : account ? (
        <>
          <p>Signed in as {account.name || account.username}.</p>
          <button type="button" onClick={signOut}>Sign out</button>
        </>
      ) : (
        <>
          <p>Sign in with your Microsoft Entra ID account.</p>
          <button type="button" onClick={signIn}>Sign in</button>
        </>
      )}
      {error && <p role="alert">{error}</p>}
    </main>
  )
}

export default App
