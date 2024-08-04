import React, { useEffect } from "react";

const InformasiPage = () => {
  useEffect(() => {
    document.title = "Cita Sakinah | Admin - Informasi ";
  });

  return (
    <>
      <div>
        <h1 className="text-main font-bold text-2xl">Informasi</h1>
      </div>
    </>
  );
};

export default InformasiPage;
