import React, { useState, useEffect } from "react";
import HeaderMenu from "../../../components/ui/header";
import HeaderImg from "../../../assets/svg/profil.svg";
import CardKeg from "../../../components/ui/cardkeg";
import FilterButtons from "../../../components/ui/filterbutton";
import { dataKeg } from "../../../data/datakeg";
import { LuFilter } from "react-icons/lu";
import Button from "../../../components/ui/button";
import DropdownFilter from "../../../components/ui/dropdownfilter";

const KegiatanPage = () => {
  const [filter, setFilter] = useState("Semua Aktivitas");
  const [schoolFilter, setSchoolFilter] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    document.title = "Cita Sakinah | Kegiatan";
  }, []);

  const handleSchoolFilterChange = (school) => {
    setSchoolFilter((prev) =>
      prev.includes(school)
        ? prev.filter((s) => s !== school)
        : [...prev, school]
    );
  };

  const filteredData = dataKeg.filter(
    (item) =>
      (filter === "Semua Aktivitas" || item.tagUtama === filter) &&
      (schoolFilter.length === 0 ||
        schoolFilter.some((selected) =>
          item.tagSekolah.startsWith(selected.split(" ")[0])
        ))
  );

  return (
    <>
      <HeaderMenu
        img={HeaderImg}
        title="Kegiatan"
        desc="Jelajahi beragam kegiatan ekstrakurikuler dan program menarik yang dirancang untuk mengembangkan minat dan bakat siswa."
      />
      <section className="mx-[50px] md:mx-[120px] mb-[150px] flex flex-col gap-8">
        <div className="flex flex-wrap justify-between relative gap-4">
          <FilterButtons currentFilter={filter} onFilterChange={setFilter} />
          <div className="relative">
            <Button
              color="bg-button"
              width="w-[300px]"
              name="Pilih Sekolah"
              justify="justify-between"
              padding="px-5"
              rounded="rounded-full"
              icon2={<LuFilter size={24} />}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            <DropdownFilter
              isOpen={isDropdownOpen}
              onClose={() => setIsDropdownOpen(false)}
              options={["TPA Cita Sakinah", "KB 'Aisyiyah 24", "TK ABA 33"]}
              selectedOptions={schoolFilter}
              onSelect={handleSchoolFilterChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-10">
          {filteredData.map((item, index) => (
            <CardKeg
              key={index}
              id={item.id}
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
