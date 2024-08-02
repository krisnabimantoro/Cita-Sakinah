import React from "react";
import { FaRegBuilding } from "react-icons/fa";
import { LuClipboardCheck } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const CardInfor = ({ id, img, title, detail, date, tagSekolah }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/informasi/${id}`);
  };

  return (
    <div className="bg-white w-full md:w-[375px] rounded-xl mb-6 border border-abugelap border-opacity-30 shadow-md">
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
      <div className="p-5 flex flex-col gap-3">
        <div className="flex mb-2 text-white font-semibold text-[13px] gap-2">
          {tagSekolah.map((tag, index) => (
            <span
              key={index}
              className="bg-button px-2 py-1 rounded-md flex items-center gap-2 capitalize"
            >
              <FaRegBuilding /> {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-col justify-between h-full gap-5">
          <div className="flex flex-col text-main">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="mb-2 truncate">{detail}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-abugelap font-semibold text-sm">{date}</p>
            <button
              onClick={handleClick}
              className="text-button text-sm font-semibold"
            >
              See More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardInfor;
