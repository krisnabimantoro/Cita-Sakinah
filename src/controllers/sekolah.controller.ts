import { Request, Response } from "express";
import connect from "../utils/database";
import Sekolah from "../models/sekolah.model";
import * as Yup from "yup";

const updateValidationSchema = Yup.object().shape({
  namaSekolah: Yup.string().typeError("Inputan untuk 'Nama Sekolah' harus berupa huruf"),
  jamPulang: Yup.string().typeError("Inputan untuk 'Jam Pulang' harus berupa huruf"),
  jumlahAnak: Yup.number().typeError("Inputan untuk 'Jumlah Anak' harus berupa angka"),
  jumlahPengajar: Yup.number().typeError("Inputan untuk 'Jumlah Pengajar' harus berupa angka"),
  jumlahRuangan: Yup.number().typeError("Inputan untuk 'Jumlah Ruangan' harus berupa angka"),
});

export default {
  async displayData(req: Request, res: Response) {
    try {
      const conn = await connect();
      const result = await conn.query("SELECT * FROM sekolah");
      return res.status(200).json(result[0]);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal menampilkan data sekolah!",
      });
    }
  },
  async updateData(req: Request, res: Response) {
    try {
      await updateValidationSchema.validate(req.body);
      const id = req.params.id;
      const updateSekolah: Sekolah = req.body;
      const conn = await connect();

       await conn.query("UPDATE sekolah SET ? WHERE id = ?", [updateSekolah, id]);
      return res.status(200).json({
        message: "Data sekolah berhasil di update",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal update data sekolah!",
      });
    }
  },
};
