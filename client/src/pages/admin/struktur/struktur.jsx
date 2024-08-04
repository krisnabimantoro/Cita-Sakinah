import React, { useEffect } from "react";

const StrukturPage = () => {
  useEffect(() => {
    document.title = "Cita Sakinah | Admin - Struktur ";
  });

  return (
    <>
      <div>
        <h1 className="text-main font-bold text-2xl">Struktur</h1>
      </div>
    </>
  );
};

export default StrukturPage;
