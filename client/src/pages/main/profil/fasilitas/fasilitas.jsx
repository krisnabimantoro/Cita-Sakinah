import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderMenu from "../../../../components/ui/header";
import HeaderImg from "../../../../assets/svg/profil.svg";
import CardFasilitas from "../../../../components/ui/cardfasilitas";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import LoadingCardFasilitas from "../../../../components/loading/loadingcardfasilitas";

const FasilitasPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataFasilitas, setDataFasilitas] = useState([]);

  useEffect(() => {
    document.title = "Cita Sakinah | Profil - Fasilitas";

    const fetchFasilitas = async () => {
      try {
        const response = await axios.get("/api/fasilitas");
        setDataFasilitas(response.data);
      } catch (error) {
        console.error("Error fetching facilities data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFasilitas();
  }, []);

  const sections = [
    {
      school: "Taman Kanak-Kanak",
      alias: "TK",
      bg: "bg-main",
      text: "text-button",
      garis: "border-main",
    },
    {
      school: "Kelompok Bermain",
      alias: "KB",
      bg: "bg-button",
      text: "text-main",
      garis: "border-button",
    },
    {
      school: "Tempat Penitipan Anak",
      alias: "TPA",
      bg: "bg-second",
      text: "text-main",
      garis: "border-button",
    },
  ];

  const renderSwiperSlides = (facilities, textColor, borderColor) => {
    return facilities.map((facility, index) => (
      <SwiperSlide key={index}>
        {isLoading ? (
          <LoadingCardFasilitas />
        ) : (
          <CardFasilitas
            img={`${import.meta.env.VITE_API_URL}/storage/uploads/${
              facility.imageName
            }`}
            title={facility.namaFasilitas}
            textColor={textColor}
            borderColor={borderColor}
          />
        )}
      </SwiperSlide>
    ));
  };

  return (
    <>
      <HeaderMenu
        img={HeaderImg}
        title="Fasilitas"
        desc="Temukan berbagai fasilitas unggulan yang kami sediakan untuk mendukung proses belajar dan mengajar yang efektif dan nyaman."
      />
      <section className="mx-[50px] md:mx-[120px] mb-[150px]">
        {sections.map((section, index) => {
          const filteredFacilities = dataFasilitas.filter((facility) =>
            facility.namaSekolah
              .toLowerCase()
              .startsWith(section.alias.toLowerCase())
          );
          return (
            <div
              key={index}
              className={`${section.bg} px-7 sm:px-[60px] py-[30px] rounded-[18px] flex flex-col gap-[30px] mt-[50px]`}
            >
              <h1
                className={`text-center font-bold text-2xl sm:text-4xl text-white`}
              >
                {section.school}
              </h1>
              <div>
                <Swiper
                  modules={[Pagination]}
                  pagination={{ clickable: true }}
                  spaceBetween={60}
                  slidesPerView={1}
                  className="pb-10"
                  breakpoints={{
                    640: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 4,
                    },
                  }}
                >
                  {renderSwiperSlides(
                    filteredFacilities,
                    section.text,
                    section.garis
                  )}
                </Swiper>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default FasilitasPage;
