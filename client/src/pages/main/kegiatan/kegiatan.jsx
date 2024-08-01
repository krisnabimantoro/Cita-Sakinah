import React, { useState, useEffect } from "react";
import HeaderMenu from "../../../components/ui/header";
import HeaderImg from "../../../assets/svg/profil.svg";
import CardKeg from "../../../components/ui/cardkeg";
import FilterButtons from "../../../components/ui/filterbutton";
import kegData from "../../../data/datakeg";

const KegiatanPage = () => {
  const [filter, setFilter] = useState("Semua Aktivitas");

  useEffect(() => {
    document.title = "Cita Sakinah | Kegiatan";
  }, []);

  const filteredData =
    filter === "Semua Aktivitas"
      ? kegData
      : kegData.filter((item) => item.tagUtama === filter);

  return (
    <>
      <HeaderMenu
        img={HeaderImg}
        title="Kegiatan"
        desc="Jelajahi beragam kegiatan ekstrakurikuler dan program menarik yang dirancang untuk mengembangkan minat dan bakat siswa."
      />
      <section className="mx-[50px] md:mx-[120px] mb-[150px]">
        <FilterButtons currentFilter={filter} onFilterChange={setFilter} />

        <div className="flex flex-wrap gap-10">
          {filteredData.map((item, index) => (
            <CardKeg
              key={index}
              id={index}
              img={item.img}
              title={item.titleCard}
              detail={item.detail}
              date={item.tanggal}
              tagUtama={item.tagUtama}
              tagSekolah={item.tagSekolah}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default KegiatanPage;
