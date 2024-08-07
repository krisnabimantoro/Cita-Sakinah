import React from "react";
import { FaPen } from "react-icons/fa";

const StatDashboard = ({
  poinTpa,
  poinKb,
  poinTk,
  nameTpa,
  nameKb,
  nameTk,
  nameTotal,
  onEdit,
}) => {
  const poinTotal = Number(poinTpa) + Number(poinKb) + Number(poinTk);

  return (
    <div className="bg-main rounded-2xl px-[110px] py-[25px] text-white">
      <div className="flex gap-20 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <h2 className="rounded-full bg-button w-20 h-20 flex justify-center items-center text-2xl font-bold">
            {poinTpa}
          </h2>
          <h3 className="font-medium text-center">{nameTpa}</h3>
        </div>
        <div className="flex flex-col items-center gap-4">
          <h2 className="rounded-full bg-button w-20 h-20 flex justify-center items-center text-2xl font-bold">
            {poinKb}
          </h2>
          <h3 className="font-medium text-center">{nameKb}</h3>
        </div>
        <div className="flex flex-col items-center gap-4">
          <h2 className="rounded-full bg-button w-20 h-20 flex justify-center items-center text-2xl font-bold">
            {poinTk}
          </h2>
          <h3 className="font-medium text-center">{nameTk}</h3>
        </div>
        <div className="flex flex-col items-center gap-4">
          <h3 className="font-medium text-center">{nameTotal}</h3>
          <h2 className="text-2xl font-bold">{poinTotal}</h2>
          <button
            className="flex items-center justify-center gap-5 bg-button px-8 py-2 rounded-full"
            onClick={onEdit}
          >
            <FaPen />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatDashboard;
