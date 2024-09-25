import { Layout } from "./layout/Layout";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

const App = () => {
  return (
    <>
      <CookiesProvider>
        <Router>
          <Layout></Layout>
        </Router>
      </CookiesProvider>
    </>
  );
};

export default App;
