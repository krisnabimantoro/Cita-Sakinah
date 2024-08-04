import React, { useEffect } from "react";

const FasilitasPage = () => {
  useEffect(() => {
    document.title = "Cita Sakinah | Admin - Fasilitas ";
  });

  return (
    <>
      <div>
        <h1 className="text-main font-bold text-2xl">Fasilitas</h1>
      </div>
    </>
  );
};

export default FasilitasPage;
