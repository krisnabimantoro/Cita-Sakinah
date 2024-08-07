import React from "react";
import { IoMdImages } from "react-icons/io";

const ImageUploadForm = ({
  title,
  fileInputRef,
  handleImageUpload,
  previewImage,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-semibold text-main">{title}</h2>
      <div
        className="border border-main rounded-lg flex flex-col items-center justify-center text-abu py-4 cursor-pointer h-[134px] overflow-hidden"
        onClick={() => fileInputRef.current.click()}
      >
        {!previewImage ? (
          <>
            <IoMdImages size={100} className="mb-1" />
            <p className="text-base">Tambahkan Gambar</p>
          </>
        ) : (
          <img
            src={previewImage}
            alt="Uploaded Preview"
            className="w-40 rounded-lg border border-gray-300 object-cover"
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
    </div>
  );
};

export default ImageUploadForm;
