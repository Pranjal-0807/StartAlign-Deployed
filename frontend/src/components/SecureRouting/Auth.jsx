import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Account from "../Account/Account";
import Layout from "./Layout";
const Auth = () => {
  const user = useSelector((state) => state.auth.user);
  //   const location = useLocation();
  return user ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Account />
    // <Navigate to="/account" state={{ from: location.pathname }} />
  );
};

export default Auth;
