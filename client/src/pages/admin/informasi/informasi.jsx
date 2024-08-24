import React, { useEffect, useRef, useState } from "react";
import TableDashboard from "../../../components/ui/tabledashboard";
import Button from "../../../components/ui/button";
import InputField from "../../../components/form/inputfield";
import ImageUploadForm from "../../../components/form/imageupload";
import Modal from "../../../components/modal/modal";
import { dataInformasi } from "../../../data/dataadmin";
import { FaRegTrashAlt, FaPlus } from "react-icons/fa";
import { LuPen } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";

const InformasiPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(dataInformasi);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedInformasi, setSelectedInformasi] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    sekolah: [],
    gambar: [],
  });
  const [previewImage, setPreviewImage] = useState([]);

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

  const handleAddClick = () => {
    setFormData({ title: "", desc: "", sekolah: [], gambar: [] });
    setPreviewImage([]);
    setIsEdit(false);
    setIsEditModalOpen(true);
  };

  const handleEditClick = (informasi) => {
    setFormData(informasi);
    setPreviewImage(informasi.gambar);
    setSelectedInformasi(informasi);
    setIsEdit(true);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (informasi) => {
    setSelectedInformasi(informasi);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setFilteredData((prevData) =>
      prevData.filter((item) => item !== selectedInformasi)
    );
    setIsDeleteModalOpen(false);
    setSelectedInformasi(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedInformasi(null);
  };

  const handleSaveInformasi = () => {
    if (isEdit) {
      setFilteredData((prevData) =>
        prevData.map((item) =>
          item === selectedInformasi ? { ...formData, id: item.id } : item
        )
      );
    } else {
      setFilteredData((prevData) => [
        ...prevData,
        { ...formData, id: Date.now().toString() },
      ]);
    }
    setIsEditModalOpen(false);
    setSelectedInformasi(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.map((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage((prev) => [...prev, reader.result]);
        setFormData((prevFormData) => ({
          ...prevFormData,
          gambar: [...prevFormData.gambar, reader.result],
        }));
      };
      reader.readAsDataURL(file);
      return reader.result;
    });
  };

  const handleDeleteImage = (index) => {
    setPreviewImage((prevImages) => prevImages.filter((_, i) => i !== index));
    setFormData((prevFormData) => ({
      ...prevFormData,
      gambar: prevFormData.gambar.filter((_, i) => i !== index),
    }));
  };

  const handleSchoolChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevFormData) => {
      const updatedSekolah = checked
        ? [...prevFormData.sekolah, value]
        : prevFormData.sekolah.filter((school) => school !== value);
      return { ...prevFormData, sekolah: updatedSekolah };
    });
  };

  const schoolOptions = [
    { label: "TPA Cita Sakinah", value: "TPA Cita Sakinah" },
    { label: "KB 'Aisyiyah 24", value: "KB 'Aisyiyah 24" },
    { label: "TK ABA 33", value: "TK ABA 33" },
  ];

  const columnsInformasi = [
    { header: "Judul", field: "title", truncate: 20 },
    { header: "Gambar", field: "gambar", truncate: 0 },
    { header: "Deskripsi", field: "desc", truncate: 20 },
    { header: "Tanggal Informasi", field: "tanggal", truncate: 15 },
    { header: "Sekolah", field: "sekolah", truncate: 20 },
    { header: "Aksi", field: "action", truncate: 0 },
  ];

  const formatSchools = (schools) => {
    if (schools.length === schoolOptions.length) {
      return "Semua";
    }
    return schools.join(", ");
  };

  const dataReal = filteredData.map((informasi) => ({
    ...informasi,
    sekolah: formatSchools(informasi.sekolah),
    gambar: informasi.gambar[0] || "",
    action: (
      <div className="flex gap-3 items-center">
        <LuPen
          className="text-second"
          onClick={() => handleEditClick(informasi)}
          size={20}
        />
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
              onClick={handleAddClick}
            />
          </div>
        </div>
        <TableDashboard columns={columnsInformasi} data={dataReal} />
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
        isOpen={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onConfirm={handleSaveInformasi}
        confirm="Simpan"
        width="w-[528px]"
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
            label="Deskripsi"
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
            placeholder="Masukkan Deskripsi"
          />
          <InputField
            label="Tanggal Informasi"
            id="tanggal"
            name="tanggal"
            type="date"
            value={formData.tanggal}
            onChange={(e) =>
              setFormData({ ...formData, tanggal: e.target.value })
            }
            placeholder="Masukkan Tanggal Informasi"
          />
          <div className="flex flex-col">
            <label className="text-main font-semibold text-sm mb-2">
              Nama Sekolah
            </label>
            <div className="flex gap-6">
              {schoolOptions.map((option) => (
                <div key={option.value} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={option.value}
                    value={option.value}
                    checked={formData.sekolah.includes(option.value)}
                    onChange={handleSchoolChange}
                    className="mr-2"
                  />
                  <label htmlFor={option.value} className="text-main text-sm">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <ImageUploadForm
            label="Upload Gambar Informasi"
            id="gambar"
            name="gambar"
            onChange={handleImageUpload}
            previewImages={previewImage}
            onDeleteImage={handleDeleteImage}
            isMultiple={true}
          />
        </div>
      </Modal>
    </>
  );
};

export default InformasiPage;
