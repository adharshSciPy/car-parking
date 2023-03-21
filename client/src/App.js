import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./scenes/main/Register";
import Login from "./scenes/main/Login";
import NavBar from "./scenes/main/NavBar";
import SnackBar from "./scenes/main/Snackbar";
import Slot from "./scenes/main/Slot";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <SnackBar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/slot" element={<Slot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
