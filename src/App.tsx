import { Layout } from './layout/Layout'
import { BrowserRouter as Router } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from '@/components/ui/toaster'

const App = () => {
  const clientID =
    (import.meta.env.VITE_APP_CLIENT_ID as string) ||
    '722891290777-o8g8kmt2g22omtalfsqfjsd06s8mt9h1.apps.googleusercontent.com'

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
