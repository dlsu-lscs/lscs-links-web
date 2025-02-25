import { Layout } from './layout/Layout'
import { BrowserRouter as Router } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from '@/components/ui/toaster'

const App = () => {
  const clientID =
    (import.meta.env.VITE_APP_CLIENT_ID as string) ||
    '700092127262-f74kc32n1f6hd9opj0o5dgklc266ljsc.apps.googleusercontent.com'

  return (
    <>
      <CookiesProvider>
        <GoogleOAuthProvider clientId={clientID}>
          <Router>
            <Layout></Layout>
            <Toaster />
          </Router>
        </GoogleOAuthProvider>
      </CookiesProvider>
    </>
  )
}

export default App
