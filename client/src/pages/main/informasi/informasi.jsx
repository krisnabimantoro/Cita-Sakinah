import React, { useEffect, useState } from "react";
import HeaderMenu from "../../../components/ui/header";
import HeaderImg from "../../../assets/svg/profil.svg";
import CardInfor from "../../../components/ui/cardinfor";
import LoadingCard from "../../../components/loading/loadingcard";
import { dataInfor } from "../../../data/datainfor";
import Button from "../../../components/ui/button";
import { LuFilter } from "react-icons/lu";
import DropdownFilter from "../../../components/ui/dropdownfilter";

const InformasiPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Cita Sakinah | Informasi";
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleSelect = (option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };

  const filteredData =
    selectedOptions.length === 0
      ? dataInfor
      : dataInfor.filter((item) =>
          item.tagSekolah.some((school) =>
            selectedOptions.some((selected) =>
              school.startsWith(selected.split(" ")[0])
            )
          )
        );

  return (
    <>
      <HeaderMenu
        img={HeaderImg}
        title="Informasi"
        desc="Dapatkan informasi terbaru seputar kegiatan, pengumuman, dan berita penting lainnya yang berkaitan dengan sekolah kami."
      />
      <section className="mx-[50px] md:mx-[120px] mb-[150px] flex flex-col gap-8">
        <div className="flex justify-end">
          <div className="relative">
            <Button
              color="bg-button"
              width="w-[300px]"
              name="Pilih Sekolah"
              justify="justify-between"
              padding="px-5"
              rounded="rounded-full"
              icon2={<LuFilter size={24} />}
              onClick={() => setIsOpen(!isOpen)}
            />
            <DropdownFilter
              isOpen={isOpen}
              options={["TPA Cita Sakinah", "KB 'Aisyiyah 24", "TK ABA 33"]}
              selectedOptions={selectedOptions}
              onSelect={handleSelect}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-10">
          {filteredData.map((item, index) =>
            isLoading ? (
              <LoadingCard key={index} />
            ) : (
              <CardInfor
                key={index}
                id={item.id}
                img={item.img}
                title={item.title}
                detail={item.detail}
                date={item.date}
                tagSekolah={item.tagSekolah}
              />
            )
          )}
        </div>
      </section>
    </>
  );
};

export default InformasiPage;
