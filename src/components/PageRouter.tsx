import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import { LinkShortener } from "@/pages/linkShortener";
import { LogIn } from "@/pages/Login";

export const PageRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LinkShortener></LinkShortener>}></Route>
        <Route path="/login" element={<LogIn></LogIn>}></Route>
      </Routes>
    </>
  );
};
