import React, { useState, useEffect, useRef } from "react";
import Button from "../../../components/ui/button";
import { FaRegEdit } from "react-icons/fa";
import ImgStruktur from "../../../assets/svg/struktur.svg";
import Modal from "../../../components/modal/modal";
import { IoMdImages } from "react-icons/io";
import ImageUploadForm from "../../../components/form/imageupload";

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

        <Modal
          isOpen={isModalOpen}
          onConfirm={closeModal}
          onCancel={closeModal}
          confirm="Simpan"
        >
          <ImageUploadForm
            title="Gambar Struktur"
            fileInputRef={fileInputRef}
            handleImageUpload={handleImageUpload}
            previewImage={previewImage}
          />
        </Modal>
      </div>
    </>
  );
};

export default StrukturPage;
