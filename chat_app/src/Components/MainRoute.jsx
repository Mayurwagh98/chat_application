import React from "react";
import { Routes, Route } from "react-router-dom";
import { JoinPage } from "../pages/JoinPage/JoinPage";
import { Chatpage } from "../pages/ChatPage/ChatPage";

let MainRoute = () => {
  return (
    <>
      {/* <h1>Workig</h1> */}
      <Routes>
        <Route exact path="/" element={<JoinPage />} />
        <Route path="/chat" element={<Chatpage />} />
      </Routes>
    </>
  );
};

export { MainRoute };
