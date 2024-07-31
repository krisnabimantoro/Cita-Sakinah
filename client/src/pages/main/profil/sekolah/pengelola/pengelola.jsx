import React from "react";

const PengelolaSection = ({ data }) => {
  return (
    <section className="mx-[50px] md:mx-[120px] mb-[150px] text-white">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-main px-10 sm:px-[60px] py-[36.5px] rounded-2xl flex flex-col gap-5">
          <h1 className="font-bold text-3xl">Identitas Pengelola</h1>
          <div className="font-normal">
            <div className="flex mb-2">
              <h3 className="sm:w-[200px] font-medium">Nama</h3>
              <span>: {data.pengelola[0].nama}</span>
            </div>
            <div className="flex mb-2">
              <h3 className="sm:w-[200px] font-medium">Tempat Lahir</h3>
              <span>: {data.pengelola[0].tempatLahir}</span>
            </div>
            <div className="flex mb-2">
              <h3 className="sm:w-[200px] font-medium">Pendidikan Terakhir</h3>
              <span>: {data.pengelola[0].pendidikan}</span>
            </div>
            <div className="flex mb-2">
              <h3 className="sm:w-[200px] font-medium">Agama</h3>
              <span>: {data.pengelola[0].agama}</span>
            </div>
          </div>
        </div>
        <div className="text-main">MAPS SEKOLAH</div>
      </div>
    </section>
  );
};

export default PengelolaSection;
