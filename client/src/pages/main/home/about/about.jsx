import React from "react";
import AboutImg from "../../../../assets/svg/about.svg";

const AboutSection = () => {
  return (
    <section
      className="mx-[50px] md:mx-[120px] mt-[100px] mb-[120px] md:mb-[160px]"
      id="about"
    >
      <div className="grid md:grid-cols-2 gap-10 md:gap-20">
        <img
          src={AboutImg}
          alt="about-img"
          draggable="false"
          className="rounded-xl w-full"
        />
        <div className="flex flex-col gap-3">
          <h1 className="text-main text-4xl sm:text-5xl font-bold">
            Tentang Kami
          </h1>
          <span className="text-base font-medium text-abugelap text-justify">
            Selamat datang di PAUD Kami, tempat di mana pendidikan awal anak
            menjadi fondasi yang kokoh untuk masa depan mereka. Kami memiliki
            tiga sekolah unggulan yang dirancang untuk memenuhi kebutuhan
            pendidikan anak-anak pada setiap tahap perkembangan mereka: Taman
            Penitipan Anak (TPA), Kelompok Bermain (KB), dan Taman Kanak-Kanak
            (TK)
          </span>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
