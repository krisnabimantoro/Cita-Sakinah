import React, { useEffect } from "react";

const DashboardPage = () => {
  useEffect(() => {
    document.title = "Cita Sakinah | Admin - Dashboard ";
  });

  return (
    <>
      <div>
        <h1 className="text-main font-bold text-2xl">Dashboard</h1>
      </div>
    </>
  );
};

export default DashboardPage;
