import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LinkShortener } from "@/pages/linkShortener";
import { LogIn } from "@/pages/Login";

export const PageRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LinkShortener></LinkShortener>}></Route>
          <Route path="/login" element={<LogIn></LogIn>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
