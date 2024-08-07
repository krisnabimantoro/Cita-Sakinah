import React, { useEffect, useState } from "react";
import TableDashboard from "../../../components/ui/tabledashboard";
import Button from "../../../components/ui/button";
import ModalConfirm from "../../../components/modal/modalconfirm"; // Adjust the import path as necessary
import { dataInformasi } from "../../../data/dataadmin";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuPen } from "react-icons/lu";
import { FaPlus } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

const InformasiPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(dataInformasi);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInformasi, setSelectedInformasi] = useState(null);

  useEffect(() => {
    document.title = "Cita Sakinah | Admin - Informasi ";
  }, []);

  useEffect(() => {
    setFilteredData(
      dataInformasi.filter((informasi) =>
        informasi.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  const handleDeleteClick = (informasi) => {
    setSelectedInformasi(informasi);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsModalOpen(false);
    setFilteredData(filteredData.filter((item) => item !== selectedInformasi));
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setSelectedInformasi(null);
  };

  const columnsInformasi = [
    { header: "Judul", field: "title", truncate: 20 },
    { header: "Gambar", field: "gambar", truncate: 0 },
    { header: "Deskripsi", field: "desc", truncate: 20 },
    { header: "Tanggal Diubah", field: "tanggal", truncate: 15 },
    { header: "Sekolah", field: "sekolah", truncate: 20 },
    { header: "Aksi", field: "action", truncate: 0 },
  ];

  const dataReal = filteredData.map((informasi) => ({
    ...informasi,
    action: (
      <div className="flex gap-3 items-center">
        <LuPen className="text-second" onClick={() => {}} size={20} />
        <FaRegTrashAlt
          className="text-button"
          onClick={() => handleDeleteClick(informasi)}
          size={20}
        />
      </div>
    ),
  }));

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-main font-bold text-2xl">Informasi</h1>
          <div className="flex items-center gap-5">
            <div className="relative w-[280px]">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <IoIosSearch className="text-main" size={24} />
              </div>
              <input
                type="text"
                placeholder="Search..."
                name="search"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-main rounded-full px-[14px] py-[10px] pl-10"
              />
            </div>

            <Button
              color="bg-main"
              name="Tambah"
              icon={<FaPlus size={24} />}
              rounded="rounded-full"
              width="w-[150px]"
            />
          </div>
        </div>
        <TableDashboard columns={columnsInformasi} data={dataReal} />
      </div>
      <ModalConfirm
        isOpen={isModalOpen}
        desc="Apakah Anda Yakin Ingin Menghapus?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirm="Hapus"
      />
    </>
  );
};

export default InformasiPage;
