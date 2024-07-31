import React, { useEffect } from "react";
import HeaderMenu from "../../../components/ui/header";
import HeaderImg from "../../../assets/svg/profil.svg";

const InformasiPage = () => {
  useEffect(() => {
    document.title = "Cita Sakinah | Informasi";
  });

  return (
    <>
      <HeaderMenu
        img={HeaderImg}
        title="Informasi"
        desc="Dapatkan informasi terbaru seputar kegiatan, pengumuman, dan berita penting lainnya yang berkaitan dengan sekolah kami."
      />
    </>
  );
};

export default InformasiPage;
