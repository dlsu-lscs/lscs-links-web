import { Layout } from "./layout/Layout";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Layout></Layout>
      </Router>
    </>
  );
};

export default App;
