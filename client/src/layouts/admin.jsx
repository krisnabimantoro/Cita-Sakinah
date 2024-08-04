import React from "react";
import Sidebar from "../components/ui/sidebar";

const AdminLayout = ({ children }) => (
  <div className="flex">
    <Sidebar />
    <div className="flex m-10 transition-all duration-300 overflow-auto">
      {children}
    </div>
  </div>
);

export default AdminLayout;
