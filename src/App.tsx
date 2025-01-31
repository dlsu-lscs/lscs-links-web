import { Layout } from "./layout/Layout";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
    const clientID =
        (import.meta.env.REACT_APP_CLIENT_ID as string) ||
        "631323246333-a20r4lll1rs1k93viaobh6f2neushf2t.apps.googleusercontent.com";

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
