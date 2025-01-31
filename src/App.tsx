import { Layout } from "./layout/Layout";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  const clientID =
    (import.meta.env.VITE_APP_CLIENT_ID as string) ||
    "274365900184-jnvam3k9ce4o4i1bi00c0rmdrqcmtmf9.apps.googleusercontent.com";

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
    );
};

export default App;
