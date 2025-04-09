import React from "react";
import Sidebar from "../SideBar/SideBar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-grow overflow-auto bg-gray-100">{children}</div>
    </div>
  );
};

export default Layout;
