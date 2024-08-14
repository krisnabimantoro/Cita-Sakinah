import React, { useEffect, useState } from "react";
import HeaderMenu from "../../../../components/ui/header";
import HeaderImg from "../../../../assets/svg/profil.svg";
import CardFasilitas from "../../../../components/ui/cardfasilitas";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { dataFasilitas } from "../../../../data/datafasilitas";
import LoadingCardFasilitas from "../../../../components/loading/loadingcardfasilitas";

const FasilitasPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Cita Sakinah | Profil - Fasilitas";
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const sections = [
    {
      school: "Taman Kanak-Kanak",
      bg: "bg-main",
      text: "text-button",
      garis: "border-main",
      facilities: dataFasilitas.filter(
        (facility) => facility.school === "Taman Kanak-Kanak"
      ),
    },
    {
      school: "Kelompok Bermain",
      bg: "bg-button",
      text: "text-main",
      garis: "border-button",
      facilities: dataFasilitas.filter(
        (facility) => facility.school === "Kelompok Bermain"
      ),
    },
    {
      school: "Tempat Penitipan Anak",
      bg: "bg-second",
      text: "text-main",
      garis: "border-button",
      facilities: dataFasilitas.filter(
        (facility) => facility.school === "Tempat Penitipan Anak"
      ),
    },
  ];

  const renderSwiperSlides = (facilities, textColor, borderColor) => {
    return facilities.map((facility, index) => (
      <SwiperSlide key={index}>
        {isLoading ? (
          <LoadingCardFasilitas />
        ) : (
          <CardFasilitas
            img={facility.img}
            title={facility.title}
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
        {sections.map((section, index) => (
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
                  section.facilities,
                  section.text,
                  section.garis
                )}
              </Swiper>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default FasilitasPage;
