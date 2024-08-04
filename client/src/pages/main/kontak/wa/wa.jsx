import React, { useState } from "react";
import InputField from "../../../../components/form/inputfield";
import Button from "../../../../components/ui/button";

const WaSection = () => {
  const [formData, setFormData] = useState({
    namalengkap: "",
    sekolah: "TPA Cita Sakinah",
    pesan: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const schoolNumbers = {
      "TPA Cita Sakinah": "",
      "KB 'Aisyiyah 24": "",
      "TK ABA 33": "",
    };

    const phoneNumber = schoolNumbers[formData.sekolah];
    const message = `Nama Lengkap: ${formData.namalengkap}%0APesan: ${formData.pesan}`;
    const waUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(waUrl, "_blank");
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-main font-bold text-3xl">Yayasan Cita Sakinah</h1>
        <span className="text-abugelap text-base">
          Perum Griya Permata Alam Blok O nomer 5-6 RT.4 RW.11 Ngijo Karangploso
          Malang
        </span>
      </div>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-8">
          <InputField
            label="Nama lengkap"
            type="text"
            placeholder="Masukan Nama Lengkap Anda"
            id="namalengkap"
            name="namalengkap"
            value={formData.namalengkap}
            onChange={handleChange}
          />
          <InputField
            label="Pilihlah Sekolah"
            dropdown={true}
            id="sekolah"
            name="sekolah"
            value={formData.sekolah}
            onChange={handleChange}
            options={[
              { value: "TPA Cita Sakinah", label: "TPA Cita Sakinah" },
              { value: "KB 'Aisyiyah 24", label: "KB 'Aisyiyah 24" },
              { value: "TK ABA 33", label: "TK ABA 33" },
            ]}
          />
        </div>
        <InputField
          textarea={true}
          label="Pesan"
          placeholder="Masukan Pesan Kritik yang ingin anda sampaikan"
          id="pesan"
          name="pesan"
          value={formData.pesan}
          onChange={handleChange}
          rows={4}
        />
        <Button name="Hubungi" width="w-full" color="bg-main" />
      </form>
    </div>
  );
};

export default WaSection;
