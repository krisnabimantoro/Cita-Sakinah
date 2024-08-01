import React, { useEffect, useState } from "react";
import HeaderMenu from "../../../components/ui/header";
import HeaderImg from "../../../assets/svg/profil.svg";
import StrukturImg from "../../../assets/svg/struktur.svg";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Download, Zoom } from "yet-another-react-lightbox/plugins";

const StrukturPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.title = "Cita Sakinah | Struktur";
  });

  return (
    <>
      <HeaderMenu
        img={HeaderImg}
        title="Struktur Kepengurusan"
        desc="Struktur kepengurusan kami yang menggambarkan hierarki dan tanggung jawab setiap posisi dalam organisasi dan memastikan setiap bagian dari organisasi berfungsi dengan efisien."
      />

      <section className="mx-[50px] md:mx-[120px] my-[90px] flex justify-center">
        <img
          src={StrukturImg}
          alt="struktur-citasakinah"
          draggable="false"
          className="object-cover cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
        {isOpen && (
          <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            slides={[
              {
                src: StrukturImg,
                downloadFilename: "Struktur Organisasi",
              },
            ]}
            plugins={[Download, Zoom]}
          />
        )}
      </section>

      {/* <section className="mx-[50px] md:mx-[120px] my-[90px] flex justify-center">
        <a href={StrukturImg} target="_blank" rel="noopener noreferrer">
          <img
            src={StrukturImg}
            alt="struktur-citasakinah"
            draggable="false"
            className="object-cover"
          />
        </a>
      </section> */}
    </>
  );
};

export default StrukturPage;
