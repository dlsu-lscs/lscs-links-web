import { Layout } from "./layout/Layout";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
<<<<<<< HEAD
  const clientID =
    (import.meta.env.VITE_APP_CLIENT_ID as string) ||
    "274365900184-jnvam3k9ce4o4i1bi00c0rmdrqcmtmf9.apps.googleusercontent.com";
=======
    const clientID =
        (import.meta.env.REACT_APP_CLIENT_ID as string) ||
        "631323246333-a20r4lll1rs1k93viaobh6f2neushf2t.apps.googleusercontent.com";
>>>>>>> 1cf46c4602c3d775fb5be9e08c4e1e9f8c03de18

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
