import React from "react";
import Sidebar from "../components/ui/sidebar";

const AdminLayout = ({ children }) => (
  <div className="flex">
    <Sidebar />
    <div className="flex transition-all duration-300 overflow-auto w-full m-10">
      {children}
    </div>
  </div>
);

export default AdminLayout;
