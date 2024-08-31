import { Request, Response } from "express";
import connect from "../utils/database";
import fasilitasModel from "../models/fasilitas.model";
import removeFile from "../utils/remove.file";
import * as Yup from "yup";

const createValidationSchema = Yup.object().shape({
  namaFasilitas: Yup.string().required("Nama fasilitas harus diisi").typeError("Inputan untuk 'namaFasilitas' harus berupa huruf"),
  imageName: Yup.string().required("Nama gambar harus diisi").typeError("Inputan untuk 'imageName' harus berupa huruf"),
  // sekolahId: Yup.number().required("Sekolah ID harus diisi").typeError("Inputan untuk 'sekolahId' harus berupa angka"),
});
const updateValidationSchema = Yup.object().shape({
  namaFasilitas: Yup.string().typeError("Inputan untuk 'namaFasilitas' harus berupa huruf"),
  imageName: Yup.string().typeError("Inputan untuk 'imageName' harus berupa huruf"),
  sekolahId: Yup.number().typeError("Inputan untuk 'sekolahId' harus berupa angka"),
});

export default {
  async createData(req: Request, res: Response) {
    try {
      // await createValidationSchema.validate(req.body);
      const conn = await connect();
      const dataModel: fasilitasModel = req.body;
      const sekolahId = req.query.sekolahId;

      const imagePaths = req.file as Express.Multer.File | undefined;
      const imageUrl = imagePaths?.path.replace(/\\/g, "/");

      if (!imageUrl) return res.status(500).json({ message: "Input gambar kosong" });

      const [insertData] = await conn.query(`insert into fasilitas (namaFasilitas, imageName,sekolahId) values (?,?,?)`, [
        dataModel.namaFasilitas,
        imageUrl,
        sekolahId,
      ]);

      res.status(201).json({
        message: "Fasilitas Berhasil dibuat",
        insertData,
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal membuat data Fasilitas!",
      });
    }
  },
  async updateData(req: Request, res: Response) {
    try {
      await updateValidationSchema.validate(req.body);
      const conn = await connect();
      const dataModel: fasilitasModel = req.body;
      const id = req.params.id;

      const [oldImage] = await conn.query<any>("select imageName from fasilitas where id = ?", [id]);

      const imagePaths = req.file as Express.Multer.File | undefined;
      const imageUrl = imagePaths?.path.replace(/\\/g, "/");

      let updateWithImage;
      if (imageUrl) {
        removeFile(oldImage[0].imageName);
        // console.log(oldImage[0].imageName);
        console.log("cek");
        updateWithImage = await conn.query(`update fasilitas set  imageName=? where id = ?`, [imageUrl, id]);
      }
      let updateFasilitas;
      if (dataModel.namaFasilitas) {
        [updateFasilitas] = await conn.query(`update fasilitas set namaFasilitas = ? where id = ?`, [dataModel.namaFasilitas, id]);
      }

      return res.status(200).json({
        message: "Fasilitas berhasil diubah",
        updateFasilitas,
        updateWithImage,
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal update data fasilitas!",
      });
    }
  },

  async deleteData(req: Request, res: Response) {
    try {
      const conn = await connect();
      const id = req.params.id;

      const [imagePath] = await conn.query<any>(`select imageName from fasilitas where id = ?`, [id]);

      removeFile(imagePath[0].imageName);

      const deleteFasiltas = await conn.query(`delete from fasilitas where id = ?`, [id]);

      return res.status(200).json({ message: "Fasilitas dihapus", deleteFasiltas });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal menghapus data fasilitas!",
      });
    }
  },
  async displayData(req: Request, res: Response) {
    try {
      const conn = await connect();
      const display = await conn.query(`select f.*,s.namaSekolah from fasilitas f join sekolah s on f.sekolahId = s.id`);
      return res.status(200).json(display[0]);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal menampilkan data fasilitas!",
      });
    }
  },
};
