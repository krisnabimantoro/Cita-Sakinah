import React from "react";
import Button from "../../../../components/ui/button";

const HeroSection = () => {
  return (
    <section
      className="flex items-center justify-center h-screen bg-main text-white"
      id="hero"
    >
      <div className="flex flex-col gap-[50px] items-center">
        <div className="flex flex-col gap-5 text-center px-[50px] sm:px-[100px] md:px-[400px]">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold">
            Selamat Datang di Website Cita Sakinah
          </h1>
          <span className="text-base opacity-70">
            "Membuka Gerbang Kecerdasan Sejak Dini" – Membuka gerbang dunia
            pendidikan dengan penuh cinta dan kreativitas.
          </span>
        </div>
        <Button name="Mulai" width="w-[267px]" color="bg-button"/>
      </div>
    </section>
  );
};

export default HeroSection;
