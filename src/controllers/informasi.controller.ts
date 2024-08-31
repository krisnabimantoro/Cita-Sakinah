import { Request, Response } from "express";
import connect from "../utils/database";
import informasiModel from "../models/informasi.model";
import removeFile from "../utils/remove.file";
import { ResultSetHeader } from "mysql2";
import * as Yup from "yup";

const updateValidationSchema = Yup.object().shape({
  judul: Yup.string().typeError("Inputan untuk 'judul' harus berupa huruf"),
  tanggal: Yup.date().typeError("Inputan untuk 'tanggal' harus berupa tanggal yang valid"),
  deskripsi: Yup.string().typeError("Inputan untuk 'deskripsi' harus berupa huruf"),
  sekolahId: Yup.number().typeError("Inputan untuk 'sekolahId' harus berupa angka"),
});

const createValidationSchema = Yup.object().shape({
  judul: Yup.string().required("Judul harus diisi").typeError("Inputan untuk 'judul' harus berupa huruf"),
  tanggal: Yup.date().required("Tanggal harus diisi").typeError("Inputan untuk 'tanggal' harus berupa tanggal yang valid"),
  deskripsi: Yup.string().required("Deskripsi harus diisi").typeError("Inputan untuk 'deskripsi' harus berupa huruf"),
  sekolahId: Yup.number().required("Sekolah ID harus diisi").typeError("Inputan untuk 'sekolahId' harus berupa angka"),
});

export default {
  async createData(req: Request, res: Response) {
    try {
      await createValidationSchema.validate(req.body);
      const conn = await connect();
      const data: informasiModel = req.body;

      const files = req.files as Express.Multer.File[] | undefined;
      const imagePaths = files ? files.map((file) => file.path.replace(/\\/g, "/")) : [];
      //   console.log(imagePaths);
      if (imagePaths.length < 1) return res.status(500).json({ message: "Input gambar kosong" });

      const [insertData] = await conn.query<ResultSetHeader>(`INSERT INTO informasi (judul,tanggal,deskripsi,sekolahId) values (?,?,?,?)`, [
        data.judul,
        data.tanggal,
        data.deskripsi,
        data.sekolahId,
      ]);

      const informasiId = insertData.insertId;

      for (const imagePath of imagePaths) {
        await conn.query("INSERT INTO imageInformasi (informasiId, fileName) VALUES (?, ?)", [informasiId, imagePath]);
      }
      return res.status(201).json({
        message: "Informasi berhasil dibuat!",
        insertData,
        imagePaths,
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal membuat informasi!",
      });
    }
  },
  async updateData(req: Request, res: Response) {
    try {
      await updateValidationSchema.validate(req.body);
      const informasiId = req.params.id;
      const idImage = req.query.idImage;
      const data: informasiModel = req.body;
      // const imgKegiatan:
      const conn = await connect();

      if (idImage) {
        const [oldImage] = await conn.query<any>(`select fileName from imageInformasi where idImage = ? and informasiId = ?`, [
          idImage,
          informasiId,
        ]);
        removeFile(oldImage[0].fileName);
      }
      const imagePaths = req.file as Express.Multer.File | undefined;
      const imageUrl = imagePaths?.path.replace(/\\/g, "/");
      //   console.log(imageUrl);

      let updateImageInformasi;
      if (imagePaths?.filename) {
        console.log("cek");
        updateImageInformasi = await conn.query(`UPDATE  imageInformasi set  fileName =? WHERE informasiId  = ? and idImage=?`, [
          imageUrl,
          informasiId,
          idImage,
        ]);
      }

      const updateInformasi = await conn.query(`UPDATE  informasi set ? WHERE id = ?`, [data, informasiId]);
      // await removeFile()

      return res.status(200).json({
        message: "Kegiatan berhasil diupdated!",
        updateKegiatan: updateInformasi,
        updateImageKegiatan: updateImageInformasi,
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal update data informasi!",
      });
    }
  },
  async deleteData(req: Request, res: Response) {
    try {
      const conn = await connect();
      const id = req.params.id;

      const [imagePath] = await conn.query<any>(`select fileName from imageInformasi where informasiId = ?`, [id]);

      for (const imageDelete of imagePath) {
        removeFile(imageDelete.fileName);
      }

      const deleteImage = await conn.query(`DELETE FROM imageInformasi  WHERE informasiId = ?`, [id]);
      const result = await conn.query(`DELETE FROM informasi  WHERE id = ?`, [id]);
      return res.status(200).json({
        message: "Kegiatan berhasil dihapus!",
        result,
        deleteImage,
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal hapus data informasi!",
      });
    }
  },
  async displayData(req: Request, res: Response) {
    try {
      const conn = await connect();
      const [rows] = await conn.query(
        `select i.*, group_concat(ii.fileName) as fileName, s.namaSekolah from informasi i left join imageInformasi ii on i.id = ii.informasiId left join sekolah s on i.sekolahId = s.id group by i.id`
      );
      const result = (rows as any[]).map((row) => ({
        id: row.id,
        judul: row.judul,
        tanggal: row.tanggal,
        deskripsi: row.deskripsi,
        fileName: row.fileName ? row.fileName.split(",") : [],
        namaSekolah: row.namaSekolah,
      }));
      return res.json({ result });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal menampilkan data informasi!",
      });
    }
  },
  async filterData(req: Request, res: Response) {
    try {
      const sekolahId = req.query.sekolahId;
      const conn = await connect();

      console.log("cek");
      if (sekolahId) {
        const [rows] = await conn.query(
          `select i.*, group_concat(ii.fileName) as fileName, s.namaSekolah from informasi i left join imageInformasi ii on i.id = ii.informasiId left join sekolah s on i.sekolahId = s.id where i.sekolahId = ? group by i.id `,
          [sekolahId]
        );
        const result = (rows as any[]).map((row) => ({
          id: row.id,
          judul: row.judul,
          tanggal: row.tanggal,
          deskripsi: row.deskripsi,
          fileName: row.fileName ? row.fileName.split(",") : [],
          namaSekolah: row.namaSekolah,
        }));
        return res.json(result);
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal menampilkan data informasi!",
      });
    }
  },
};
