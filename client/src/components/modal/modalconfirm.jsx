import React from "react";
import Modal from "../form/modal";

const ModalConfirm = ({ desc, isOpen, onConfirm, onCancel, confirm }) => {
  return (
    <Modal isOpen={isOpen}>
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-main">{desc}</h2>
        <div className="flex gap-4 justify-center items-center">
          <button
            className="rounded-2xl border border-main text-main font-medium text-base py-2 px-10"
            onClick={onCancel}
          >
            Batal
          </button>
          <button
            className="rounded-2xl bg-main text-white font-medium text-base py-2 px-10"
            onClick={onConfirm}
          >
            {confirm}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
