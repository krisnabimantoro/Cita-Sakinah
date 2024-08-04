import React, { useEffect } from "react";

const KegiatanPage = () => {
  useEffect(() => {
    document.title = "Cita Sakinah | Admin - Kegiatan ";
  });

  return (
    <>
      <div>
        <h1 className="text-main font-bold text-2xl">Kegiatan</h1>
      </div>
    </>
  );
};

export default KegiatanPage;
