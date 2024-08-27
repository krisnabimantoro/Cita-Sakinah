import React, { useEffect, useRef, useState } from "react";
import TableDashboard from "../../../components/ui/tabledashboard";
import Button from "../../../components/ui/button";
import InputField from "../../../components/form/inputfield";
import ImageUploadForm from "../../../components/form/imageupload";
import Modal from "../../../components/modal/modal";
import { dataFasilitas } from "../../../data/dataadmin";
import { FaRegTrashAlt, FaPlus } from "react-icons/fa";
import { LuPen } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import Pagination from "../../../components/ui/pagination";

const FasilitasPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(dataFasilitas);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFasilitas, setSelectedFasilitas] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    sekolah: "",
    gambar: "",
    tanggal: "",
  });
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    document.title = "Cita Sakinah | Admin - Fasilitas ";

    setFilteredData(
      dataFasilitas.filter((fasilitas) =>
        fasilitas.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setCurrentPage(1);
  }, [searchQuery]);

  const handleAddClick = () => {
    setFormData({ title: "", sekolah: "", gambar: "", tanggal: "" });
    setPreviewImage("");
    setIsEdit(false);
    setIsModalOpen(true);
  };

  const handleEditClick = (fasilitas) => {
    setFormData(fasilitas);
    setPreviewImage(fasilitas.gambar);
    setSelectedFasilitas(fasilitas);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (fasilitas) => {
    setSelectedFasilitas(fasilitas);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setFilteredData(filteredData.filter((item) => item !== selectedFasilitas));
    setSelectedFasilitas(null);
    setIsDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedFasilitas(null);
  };

  const handleSaveFasilitas = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    if (isEdit) {
      setFilteredData(
        filteredData.map((item) =>
          item === selectedFasilitas
            ? { ...formData, tanggal: currentDate, id: item.id }
            : item
        )
      );
    } else {
      setFilteredData([
        ...filteredData,
        { ...formData, id: Date.now().toString(), tanggal: currentDate },
      ]);
    }
    setIsModalOpen(false);
    setSelectedFasilitas(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({ ...formData, gambar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const schoolOptions = [
    { label: "TPA Cita Sakinah", value: "TPA Cita Sakinah" },
    { label: "KB 'Aisyiyah 24", value: "KB 'Aisyiyah 24" },
    { label: "TK ABA 33", value: "TK ABA 33" },
  ];

  const columnsFasilitas = [
    { header: "Judul", field: "title", truncate: 20, width: "w-[20%]" },
    { header: "Gambar", field: "gambar", truncate: 0, width: "w-[20%]" },
    {
      header: "Tanggal Diubah",
      field: "tanggal",
      truncate: 15,
      width: "w-[20%]",
    },
    { header: "Sekolah", field: "sekolah", truncate: 20, width: "w-[20%]" },
    { header: "Aksi", field: "action", truncate: 0, width: "w-[10%]" },
  ];

  const dataReal = filteredData.map((fasilitas) => ({
    ...fasilitas,
    action: (
      <div className="flex gap-3 items-center">
        <LuPen
          className="text-second"
          onClick={() => handleEditClick(fasilitas)}
          size={20}
        />
        <FaRegTrashAlt
          className="text-button"
          onClick={() => handleDeleteClick(fasilitas)}
          size={20}
        />
      </div>
    ),
  }));

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = dataReal.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-main font-bold text-2xl">Fasilitas</h1>
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
              onClick={handleAddClick}
            />
          </div>
        </div>
        <TableDashboard columns={columnsFasilitas} data={paginatedData} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        confirm="Hapus"
        width="w-[377px]"
        justify="justify-center"
      >
        <h2 className="text-2xl font-semibold text-main text-center">
          Apakah Anda Yakin Ingin Menghapus?
        </h2>
      </Modal>

      <Modal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleSaveFasilitas}
        confirm="Simpan"
        width="w-[500px]"
        justify="justify-center"
      >
        <div className="flex flex-col gap-4">
          <InputField
            label="Judul"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Masukkan Judul"
          />
          <InputField
            label="Nama Sekolah"
            id="sekolah"
            name="sekolah"
            value={formData.sekolah}
            onChange={handleInputChange}
            placeholder="Pilih Sekolah"
            dropdown
            options={schoolOptions}
          />
          <ImageUploadForm
            title="Upload Gambar Fasilitas"
            fileInputRef={fileInputRef}
            handleImageUpload={handleImageUpload}
            previewImages={previewImage}
            isMultiple={false}
          />
        </div>
      </Modal>
    </>
  );
};

export default FasilitasPage;
