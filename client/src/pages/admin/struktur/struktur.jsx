import React, { useState, useEffect, useRef } from "react";
import Button from "../../../components/ui/button";
import { FaRegEdit } from "react-icons/fa";
import ImgStruktur from "../../../assets/svg/struktur.svg";
import Modal from "../../../components/form/modal";
import { IoMdImages } from "react-icons/io";

const StrukturPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    document.title = "Cita Sakinah | Admin - Struktur ";
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-7 w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-main font-bold text-2xl">Struktur</h1>
          <Button
            name="Edit"
            icon={<FaRegEdit />}
            color="bg-main"
            width="w-[127px]"
            rounded="rounded-full"
            onClick={openModal}
          />
        </div>
        <div className="border border-main rounded-lg h-full flex justify-center items-center p-20">
          <img src={ImgStruktur} alt="img-struktur" draggable="false" />
        </div>

        <Modal isOpen={isModalOpen}>
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-main">Foto Struktur</h2>
            <div
              className="border border-main rounded-lg flex flex-col items-center justify-center text-abu py-[31px] cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              {!previewImage ? (
                <>
                  <IoMdImages size={100} className="mb-4" />
                  <p className="text-lg">Tambahkan Gambar</p>
                </>
              ) : (
                <img
                  src={previewImage}
                  alt="Uploaded Preview"
                  className="w-40 mb-4 rounded-lg border border-gray-300"
                />
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              hidden
            />

            <div className="flex gap-4 justify-center items-center">
              <button
                className="rounded-2xl border border-main text-main font-medium text-base py-2 px-10"
                onClick={closeModal}
              >
                Batal
              </button>
              <button
                className="rounded-2xl bg-main text-white font-medium text-base py-2 px-10"
                onClick={closeModal}
              >
                Simpan
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default StrukturPage;
