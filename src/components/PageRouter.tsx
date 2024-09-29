import { Route, Routes } from "react-router-dom";

import { LinkShortener } from "@/pages/linkShortener";
import { AccessAccount } from "@/pages/accessAccount";

export const PageRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LinkShortener></LinkShortener>}></Route>
        <Route
          path="/accessAccount"
          element={<AccessAccount></AccessAccount>}
        ></Route>
      </Routes>
    </>
  );
};
