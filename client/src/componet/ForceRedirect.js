import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

const ForceRedirect = ({ user, children }) => {
  const active = useSelector((state) => state.loginedUser.role)
  console.log(user, "user")
  console.log(active ,"active");

  if (user === true) {
    return <Navigate to="/slot" replace /> 
  }
  
  return children;
};

export default ForceRedirect;