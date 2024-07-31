import React from "react";

const StatisticSection = () => {
  return (
    <section className="bg-button text-white">
      <div className="mx-[50px] md:mx-[120px] py-[60px] flex justify-center">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-20 sm:gap-[100px] md:gap-[180px] text-start font-bold">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl">Total Anak</h1>
            <span className="text-6xl">59</span>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl">Total Guru</h1>
            <span className="text-6xl">59</span>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl">Total Kelas</h1>
            <span className="text-6xl">59</span>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl">Jam Pulang</h1>
            <span className="text-6xl">16.00</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticSection;
