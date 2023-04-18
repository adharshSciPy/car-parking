import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./scenes/main/Register";
import Login from "./scenes/main/Login";
import NavBar from "./scenes/main/NavBar";
import SnackBar from "./scenes/main/Snackbar";
import Slot from "./scenes/main/Slot";
import { loggeduser, isConnected, isNotConnected, loginRole } from './store/loginedUserSlice';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import ProtectedRoute from './componet/ProtectedRoute';
import ForceRedirect from './componet/ForceRedirect';

function App() {

  const dispatch = useDispatch()
  const active = useSelector((state) => state.loginedUser.isConnected)

  const checkUserToken = () => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user-token"));
      if (user) {
        const data = { token: user }
        const verifyUser = async () => {
          axios
            .post("http://localhost:5000/user/auth", data)
            .then((response) => {
              const X = response.data;
              // Save token to localStorage
              dispatch(loggeduser(X._id))
             
              console.log(X)
              // setIsconnected(true);
              dispatch(isConnected())
            })
            .catch((err) => {
              console.log(err.response.data)
              localStorage.clear();
            });
        }
        verifyUser();
      } else {
        // setIsconnected(false);
        dispatch(isNotConnected())
      }
    }
  };
  useEffect(() => {
    checkUserToken();
  }, [active]);

  const Logout = () => {
    if (localStorage.getItem("user-token")) {
      localStorage.clear();
      // s
    }
  };
  return (
    <BrowserRouter>
      <NavBar />
      <SnackBar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<ForceRedirect user={active}> <Login /> </ForceRedirect>} />
        <Route path="/slot" element={<ProtectedRoute user={active}> <Slot /> </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


