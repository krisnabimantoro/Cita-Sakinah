import React, { useEffect } from "react";
import HeaderMenu from "../../../components/ui/header";
import HeaderImg from "../../../assets/svg/profil.svg";

const KegiatanPage = () => {
  useEffect(() => {
    document.title = "Cita Sakinah | Kegiatan";
  });

  return (
    <>
      <HeaderMenu
        img={HeaderImg}
        title="Kegiatan"
        desc="Jelajahi beragam kegiatan ekstrakurikuler dan program menarik yang dirancang untuk mengembangkan minat dan bakat siswa."
      />
    </>
  );
};

export default KegiatanPage;
