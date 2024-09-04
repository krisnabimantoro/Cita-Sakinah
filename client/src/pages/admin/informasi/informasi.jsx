import React, { useEffect, useState } from "react";
import TableDashboard from "../../../components/ui/tabledashboard";
import Button from "../../../components/ui/button";
import InputField from "../../../components/form/inputfield";
import ImageUploadForm from "../../../components/form/imageupload";
import Modal from "../../../components/modal/modal";
import { FaRegTrashAlt, FaPlus } from "react-icons/fa";
import { LuPen } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import Pagination from "../../../components/ui/pagination";
import axios from "axios";
import { toast } from "react-hot-toast";
// import { useAuth } from "../../../hooks/useAuth";

const InformasiPage = () => {
  // const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedInformasi, setSelectedInformasi] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [previewImage, setPreviewImage] = useState([]);
  const [dataInformasi, setDataInformasi] = useState([]);
  const [schoolOptions, setSchoolOptions] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    tanggal: "",
    desc: "",
    sekolah: [],
    sekolahId: [],
    gambar: [],
  });

  useEffect(() => {
    document.title = "Cita Sakinah | Admin - Informasi ";

    const fetchData = async () => {
      try {
        const [informasiRes, sekolahRes] = await Promise.all([
          axios.get("/api/informasi"),
          axios.get("/api/sekolah"),
        ]);

        const formattedData = informasiRes.data.map((item) => ({
          id: item.id,
          title: item.judul,
          tanggal: item.tanggal,
          desc: item.deskripsi,
          sekolah: item.namaSekolah,
          gambar: item.image.map((img) => ({
            idImage: img.idImage,
            fileName: img.fileName,
          })),
        }));

        setFilteredData(formattedData);
        setDataInformasi(formattedData);

        setSchoolOptions(
          sekolahRes.data.map((school) => ({
            label: school.namaSekolah,
            value: school.namaSekolah,
            id: school.id,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = searchQuery
      ? dataInformasi.filter((informasi) =>
          informasi.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : dataInformasi;

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchQuery, dataInformasi]);

  const handleAddClick = () => {
    setFormData({
      title: "",
      tanggal: "",
      desc: "",
      sekolah: [],
      sekolahId: [],
      gambar: [],
    });
    setPreviewImage([]);
    setIsEdit(false);
    setIsEditModalOpen(true);
  };

  const handleEditClick = (informasi) => {
    setFormData({
      title: informasi.title,
      desc: informasi.desc,
      tanggal: informasi.tanggal,
      sekolah: [],
      sekolahId: [],
      gambar: informasi.gambar.map((img) => ({
        idImage: img.idImage,
        fileName: img.fileName,
      })),
    });

    setPreviewImage(
      informasi.gambar.map((img) => ({
        idImage: img.idImage,
        url: `${import.meta.env.VITE_API_URL}/storage/uploads/${img.fileName}`,
      }))
    );

    setSelectedInformasi(informasi);
    setIsEdit(true);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (informasi) => {
    setSelectedInformasi(informasi);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `/api/informasi/${selectedInformasi.id}`
      );
      setFilteredData(
        filteredData.filter((item) => item.id !== selectedInformasi.id)
      );
      toast.success(response.data.message);
      setIsDeleteModalOpen(false);
      setSelectedInformasi(null);
    } catch (error) {
      console.error("Error deleting informasi: ", error);
      toast.error("Failed to delete informasi");
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedInformasi(null);
  };

  const handleSaveInformasi = async () => {
    if (formData.sekolah.length === 0) {
      toast.error("Harus memilih minimal 1 sekolah");
      return;
    }

    const formDataToSend = new FormData();

    formDataToSend.append("judul", formData.title);
    formDataToSend.append("deskripsi", formData.desc);
    formDataToSend.append("tanggal", formData.tanggal);
    formDataToSend.append("sekolahId", formData.sekolahId.join(","));

    formData.gambar.forEach((file) => {
      if (!file.idImage) {
        formDataToSend.append("files", file.file);
      }
    });

    try {
      let response;
      const deleteParams =
        imagesToDelete.length > 0 ? `idImage=${imagesToDelete.join(",")}` : "";

      if (isEdit) {
        response = await axios.patch(
          `/api/informasi/${selectedInformasi.id}?${deleteParams}`,
          formDataToSend,
          {
            headers: {
              // Authorization: `Bearer ${user}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post("/api/informasi", formDataToSend, {
          headers: {
            // Authorization: `Bearer ${user}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }
      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          isEdit ? error.response.data.message : error.response.data.message
        );
      }
      console.error("Error saving informasi: ", error);
    } finally {
      setIsEditModalOpen(false);
      setSelectedInformasi(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "sekolah") {
      const selectedSchool = schoolOptions.find(
        (option) => option.value === value
      );
      setFormData({
        ...formData,
        sekolah: value,
        sekolahId: selectedSchool?.id
          ? [...formData.sekolahId, selectedSchool.id]
          : [],
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (formData.gambar.length + files.length > 5) {
      toast.error("Pilihan maksimal 5 foto");
      return;
    }

    const newPreviewImages = files.map((file) => ({
      idImage: null,
      url: URL.createObjectURL(file),
    }));

    setPreviewImage((prev) => [...prev, ...newPreviewImages]);
    setFormData((prevFormData) => ({
      ...prevFormData,
      gambar: [
        ...prevFormData.gambar,
        ...files.map((file) => ({ idImage: null, file })),
      ],
    }));
  };

  const handleDeleteImage = (index) => {
    const deletedImage = formData.gambar[index];

    if (deletedImage.idImage) {
      setImagesToDelete((prev) => [...prev, deletedImage.idImage]);
    }

    setPreviewImage((prevImages) => prevImages.filter((_, i) => i !== index));
    setFormData((prevFormData) => ({
      ...prevFormData,
      gambar: prevFormData.gambar.filter((_, i) => i !== index),
    }));
  };

  const handleSchoolChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prevFormData) => {
      const selectedSchool = schoolOptions.find(
        (school) => school.label === value
      );

      if (!selectedSchool) return prevFormData;

      const updatedSekolah = checked
        ? [...(prevFormData.sekolah || []), value]
        : (prevFormData.sekolah || []).filter((school) => school !== value);

      const updatedSekolahId = checked
        ? [...(prevFormData.sekolahId || []), selectedSchool.id]
        : (prevFormData.sekolahId || []).filter(
            (id) => id !== selectedSchool.id
          );

      return {
        ...prevFormData,
        sekolah: updatedSekolah,
        sekolahId: updatedSekolahId,
      };
    });
  };

  const columnsInformasi = [
    { header: "Judul", field: "title", truncate: 20, width: "w-[15%]" },
    { header: "Gambar", field: "gambar", truncate: 10, width: "w-[10%]" },
    { header: "Deskripsi", field: "desc", truncate: 35, width: "w-[20%]" },
    {
      header: "Tanggal Informasi",
      field: "tanggal",
      truncate: 20,
      width: "w-[15%]",
    },
    { header: "Sekolah", field: "sekolah", truncate: 20, width: "w-[15%]" },
    { header: "Aksi", field: "action", truncate: 0, width: "w-[10%]" },
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
    gambar:
      informasi.gambar.length > 0 ? informasi.gambar[0].fileName : "No Image",

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
        <TableDashboard columns={columnsInformasi} data={paginatedData} />
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
            label="Upload Gambar Informasi (max 5)"
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
