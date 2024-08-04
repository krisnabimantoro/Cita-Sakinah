import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dataKeg } from "../../../../data/datakeg";
import NotFoundPage from "../../../notfound";
import { LuClipboardCheck } from "react-icons/lu";
import { FaRegBuilding } from "react-icons/fa";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Download, Zoom } from "yet-another-react-lightbox/plugins";

const DetailKegPage = () => {
  const { id } = useParams();
  const kegiatan = dataKeg.find((keg) => keg.id === parseInt(id));
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    document.title = `Cita Sakinah | Detail Kegiatan #${id}`;
  }, [id]);

  if (!kegiatan) {
    return <NotFoundPage />;
  }

  const handleOpenLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      <section className="mx-[50px] md:mx-[120px] mb-[150px]">
        <div className="mt-[135px] flex flex-col md:flex-row gap-10">
          <div className="md:w-[60%] flex flex-col gap-10">
            <img
              src={kegiatan.img[0]}
              alt={`img-detail-0`}
              className="rounded-2xl w-full cursor-pointer"
              onClick={() => handleOpenLightbox(0)}
            />
            <div className="flex gap-5 flex-col">
              <div className="flex mb-2 text-white font-semibold sm:text-lg gap-4">
                <span className="bg-button px-2 py-1 rounded-md flex gap-2 items-center capitalize">
                  <LuClipboardCheck />
                  {kegiatan.tagUtama}
                </span>
                <span className="bg-button px-2 py-1 rounded-md flex items-center gap-2 capitalize">
                  <FaRegBuilding /> {kegiatan.tagSekolah}
                </span>
              </div>
              <div>
                <h1 className="font-bold text-main text-2xl sm:text-4xl">
                  {kegiatan.titleCard}
                </h1>
                <h3 className="text-abugelap font-medium text-lg">
                  {kegiatan.tanggal}
                </h3>
              </div>
              <p className="text-abugelap text-base text-justify">
                {kegiatan.detail}
              </p>
            </div>
          </div>

          <div className="md:w-[40%] grid grid-cols-2 gap-5 h-fit">
            {kegiatan.img.slice(1).map((src, index) => (
              <img
                key={index + 1}
                src={src}
                alt={`img-detail-${index + 1}`}
                className="rounded-2xl w-full cursor-pointer"
                onClick={() => handleOpenLightbox(index + 1)}
              />
            ))}
          </div>
        </div>
        {isOpen && (
          <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            index={currentIndex}
            slides={kegiatan.img.map((src) => ({ src }))}
            plugins={[Download, Zoom]}
          />
        )}
      </section>
    </>
  );
};

export default DetailKegPage;
