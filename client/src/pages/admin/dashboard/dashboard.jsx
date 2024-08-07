import React, { useState, useEffect } from "react";
import StatDashboard from "../../../components/ui/statdashboard";
import { dataStatistic } from "../../../data/datastatistic";
import Modal from "../../../components/modal/modal";
import InputField from "../../../components/form/inputfield";

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditData, setCurrentEditData] = useState(null);
  const [formData, setFormData] = useState({
    poinTpa: "",
    poinKb: "",
    poinTk: "",
    nameTpa: "",
    nameKb: "",
    nameTk: "",
  });

  useEffect(() => {
    document.title = "Cita Sakinah | Admin - Dashboard";
  }, []);

  useEffect(() => {
    if (currentEditData) {
      setFormData({
        poinTpa: currentEditData.poinTpa,
        poinKb: currentEditData.poinKb,
        poinTk: currentEditData.poinTk,
        nameTpa: currentEditData.nameTpa,
        nameKb: currentEditData.nameKb,
        nameTk: currentEditData.nameTk,
      });
    }
  }, [currentEditData]);

  const handleEditClick = (data) => {
    setCurrentEditData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEditData(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitModal = () => {
    setIsModalOpen(false);
    alert("Data edited successfully");
    window.location.reload();
  };

  return (
    <div className="flex flex-col gap-7">
      <h1 className="text-main font-bold text-2xl">Dashboard</h1>
      <div className="flex flex-col gap-5">
        {dataStatistic.map((stat, index) => (
          <StatDashboard
            key={index}
            poinTpa={stat.poinTpa}
            poinKb={stat.poinKb}
            poinTk={stat.poinTk}
            nameTpa={stat.nameTpa}
            nameKb={stat.nameKb}
            nameTk={stat.nameTk}
            nameTotal={stat.nameTotal}
            onEdit={() => handleEditClick(stat)}
          />
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onConfirm={submitModal}
        onCancel={closeModal}
        confirm="Simpan"
      >
        <div className="flex flex-col gap-6">
          <InputField
            label={formData.nameTpa}
            type="number"
            name="poinTpa"
            value={formData.poinTpa}
            onChange={handleInputChange}
            placeholder={formData.nameTpa}
          />
          <InputField
            label={formData.nameKb}
            type="number"
            name="poinKb"
            value={formData.poinKb}
            onChange={handleInputChange}
            placeholder={formData.nameKb}
          />
          <InputField
            label={formData.nameTk}
            type="number"
            name="poinTk"
            value={formData.poinTk}
            onChange={handleInputChange}
            placeholder={formData.nameTk}
          />
        </div>
      </Modal>
    </div>
  );
};

export default DashboardPage;
