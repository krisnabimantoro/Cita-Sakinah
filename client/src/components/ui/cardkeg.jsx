import React from "react";
import { FaRegBuilding } from "react-icons/fa";
import { LuClipboardCheck } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const CardKeg = ({ id, img, title, detail, date, tagUtama, tagSekolah }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/kegiatan/${id}`);
  };

  return (
    <div
      className="bg-white w-full md:w-[375px] rounded-xl mb-6 border border-abugelap border-opacity-30 shadow-md cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative">
        {img.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`img-card-${index}`}
            draggable="false"
            className={`rounded-t-xl object-cover w-full ${
              index > 0 ? "hidden" : ""
            }`}
          />
        ))}
      </div>
      <div className="p-5 flex flex-col h-[206px]">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-3">
            <div className="flex mb-2 text-white font-semibold text-[13px] gap-2">
              <span className="bg-button px-2 py-1 rounded-md flex gap-2 items-center capitalize">
                <LuClipboardCheck />
                {tagUtama}
              </span>
              <span className="bg-button px-2 py-1 rounded-md flex items-center gap-2 capitalize">
                <FaRegBuilding /> {tagSekolah}
              </span>
            </div>
            <div className="flex flex-col text-main">
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="mb-2 truncate">{detail}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="text-abugelap font-semibold text-sm">{date}</p>
            <button
              onClick={handleClick}
              className="text-button text-sm font-semibold"
            >
              Lihat Selengkapnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardKeg;
