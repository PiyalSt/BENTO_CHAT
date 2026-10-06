import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register";
import Chatbox from "./pages/Chatbox";
import Welcome from "./pages/Welcome";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<Chatbox />} />
        </Routes>
      </BrowserRouter>

      {/* React Hot Toaster */}
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
