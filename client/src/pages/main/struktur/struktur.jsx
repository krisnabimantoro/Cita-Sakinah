import React, { useEffect, useState } from "react";
import HeaderMenu from "../../../components/ui/header";
import HeaderImg from "../../../assets/svg/profil.svg";
import StrukturImg from "../../../assets/svg/struktur.svg";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Download, Zoom } from "yet-another-react-lightbox/plugins";
import LoadingStruktur from "../../../components/loading/loadingstruktur";

const StrukturPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Cita Sakinah | Struktur";
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <HeaderMenu
        img={HeaderImg}
        title="Struktur Kepengurusan"
        desc="Struktur kepengurusan kami yang menggambarkan hierarki dan tanggung jawab setiap posisi dalam organisasi dan memastikan setiap bagian dari organisasi berfungsi dengan efisien."
      />

      <section className="mx-[50px] md:mx-[120px] my-[90px] flex justify-center">
        {isLoading ? (
          <LoadingStruktur />
        ) : (
          <img
            src={StrukturImg}
            alt="struktur-citasakinah"
            draggable="false"
            className="object-cover cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        )}
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
    </>
  );
};

export default StrukturPage;
