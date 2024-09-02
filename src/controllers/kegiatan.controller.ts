import { Request, Response } from "express";
import connect from "../utils/database";
import kegiatan from "../models/kegiatan.model";
import { ResultSetHeader } from "mysql2";
import removeFile from "../utils/remove.file";
import * as Yup from "yup";
import compressImage from "../utils/compress.image";

const updateValidationSchema = Yup.object().shape({
  judul: Yup.string().typeError("Inputan untuk 'judul' harus berupa huruf"),
  tanggal: Yup.date().typeError("Inputan untuk 'tanggal' harus berupa tanggal yang valid"),
  deskripsi: Yup.string().typeError("Inputan untuk 'deskripsi' harus berupa huruf"),
  jenisKegiatan: Yup.number().typeError("Inputan untuk 'jenisKegiatan' harus berupa angka"),
  sekolahId: Yup.number().typeError("Inputan untuk 'sekolahId' harus berupa angka"),
});

const createValidationSchema = Yup.object().shape({
  judul: Yup.string().required("Judul wajib diisi").typeError("Inputan untuk 'judul' harus berupa huruf"),
  tanggal: Yup.date().required("Tanggal wajib diisi").typeError("Inputan untuk 'tanggal' harus berupa tanggal yang valid"),
  deskripsi: Yup.string().required("Deskripsi wajib diisi").typeError("Inputan untuk 'deskripsi' harus berupa huruf"),
  jenisKegiatan: Yup.number().required("Jenis kegiatan wajib diisi").typeError("Inputan untuk 'jenisKegiatan' harus berupa angka"),
  sekolahId: Yup.number().required("Sekolah ID wajib diisi").typeError("Inputan untuk 'sekolahId' harus berupa angka"),
});

export default {
  async displayData(req: Request, res: Response) {
    try {
      const conn = await connect();
      const [rows] = await conn.query(
        `
        select 
          k.*, group_concat(ik.fileName) as fileName, kk.namaKegiatan, s.namaSekolah FROM kegiatan k 
        LEFT JOIN
          kategorikegiatan kk ON k.jenisKegiatan = kk.id
        LEFT JOIN 
          imageKegiatan ik ON k.id = ik.kegiatanId 
        left JOIN
          sekolah s ON k.sekolahId = s.id 
        GROUP BY 
          k.id 
        `
      );

      const result = (rows as any[]).map((row) => ({
        id: row.id,
        judul: row.judul,
        tanggal: row.tanggal,
        deskripsi: row.deskripsi,
        namaKegiatan: row.namaKegiatan,
        namaSekolah: row.namaSekolah,
        fileName: row.fileName ? row.fileName.split(",") : [],
      }));

      console.log(result[0].fileName);
      return res.json(result);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal menampilkan data kegiatan!",
      });
    }
  },
  async createData(req: Request, res: Response) {
    try {
      await createValidationSchema.validate(req.body);
      const conn = await connect();
      const data: kegiatan = req.body;

      let files: any = req.files as Express.Multer.File[] | undefined;

      const imagePaths = files ? files.map((file: { filename: string }) => file.filename) : [];

      // for (const imagePath of imagePaths) {
      //   compressImage(`./${imagePath}`);

      //   // console.log(cek);
      // }
      // console.log(files[0]);
      // if (files[0].size > 5000) {
      //   imagePaths = compressImage(`./${imagePaths}`);
      // }
      // console.log(imagePaths);

      // const imageUrl =
      if (imagePaths.length < 1) return res.status(500).json({ message: "Input gambar kosong" });

      const [insertData] = await conn.query<ResultSetHeader>(`INSERT INTO kegiatan set ?`, [data]);

      const kegiatanId = insertData.insertId;

      for (const imagePath of imagePaths) {
        await conn.query("INSERT INTO imageKegiatan (kegiatanId, fileName) VALUES (?, ?)", [kegiatanId, imagePath]);
      }
      return res.status(201).json({
        message: "Kegiatan berhasil dibuat!",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal membuat kegiatan!",
      });
    }
  },
  async updateData(req: Request, res: Response) {
    try {
      await updateValidationSchema.validate(req.body);
      const kegiatanId = req.params.id;
      const idImage = req.query.idImage;
      const data: kegiatan = req.body;
      // const imgKegiatan:
      const conn = await connect();

      if (idImage) {
        const idImageArray = (idImage as string).split(","); // Split comma-separated IDs
        const [oldImages] = await conn.query<any>(`SELECT fileName FROM imageKegiatan WHERE idImage IN (?) AND kegiatanId = ?`, [
          idImageArray,
          kegiatanId,
        ]);
        for (const img of oldImages) {
          // console.log(img.fileName)
          removeFile(img.fileName);
        }
        await conn.query(`DELETE FROM imageKegiatan WHERE idImage IN (?) AND kegiatanId = ?`, [idImageArray, kegiatanId]);
      }

      const files = req.files as Express.Multer.File[] | undefined;
      const imagePaths = files ? files.map((file: { filename: string }) => file.filename) : [];
      // console.log(imagePaths)

      for (const imagePath of imagePaths) {
        await conn.query(`INSERT INTO imageKegiatan (kegiatanId, fileName) VALUES (?, ?)`, [kegiatanId, imagePath]);
      }

      if (data.deskripsi || data.jenisKegiatan || data.judul || data.sekolahId || data.tanggal) {
        await conn.query(`UPDATE  kegiatan set ? WHERE id = ?`, [data, kegiatanId]);
      }

      return res.status(200).json({
        message: "Kegiatan berhasil diupdated!",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal update data kegiatan!",
      });
    }
  },
  async deleteData(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const conn = await connect();

      const [imagePath] = await conn.query<any>(`select fileName from imageKegiatan where kegiatanId = ?`, [id]);

      for (const imageDelete of imagePath) {
        removeFile(imageDelete.fileName);
      }

      const deleteImage = await conn.query(`DELETE FROM imageKegiatan  WHERE kegiatanId = ?`, [id]);
      const result = await conn.query(`DELETE FROM kegiatan  WHERE id = ?`, [id]);
      return res.json({
        message: "Kegiatan berhasil dihapus!",
        result,
        deleteImage,
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal menghapus kegiatan!",
      });
    }
  },
  async filterDisplay(req: Request, res: Response) {
    const sekolahId = req.query.sekolahId;
    const jenisKegiatan = req.query.jenisKegiatan;
    const conn = await connect();

    function displayResult(rows: any) {
      return (rows as any[]).map((row) => ({
        id: row.id,
        judul: row.judul,
        tanggal: row.tanggal,
        deskripsi: row.deskripsi,
        namaKegiatan: row.namaKegiatan,
        namaSekolah: row.namaSekolah,
        fileName: row.fileName ? row.fileName.split(",") : [],
      }));
    }

    if (jenisKegiatan && sekolahId) {
      console.log("cek");
      const result = await conn.query(
        `    
        select 
          k.*, group_concat(ik.fileName) as fileName, kk.namaKegiatan, s.namaSekolah FROM kegiatan k 
        LEFT JOIN
          kategorikegiatan kk ON k.jenisKegiatan = kk.id
        LEFT JOIN 
          imageKegiatan ik ON k.id = ik.kegiatanId 
        left JOIN
          sekolah s ON k.sekolahId = s.id 
        where 
          sekolahId=? && jenisKegiatan=?
        GROUP BY 
          k.id  `,
        [sekolahId, jenisKegiatan]
      );
      return res.json(displayResult(result[0]));
    } else if (!sekolahId) {
      const result = await conn.query(
        `select 
          k.*, group_concat(ik.fileName) as fileName, kk.namaKegiatan, s.namaSekolah FROM kegiatan k 
        LEFT JOIN
          kategorikegiatan kk ON k.jenisKegiatan = kk.id
        LEFT JOIN 
          imageKegiatan ik ON k.id = ik.kegiatanId 
        left JOIN
          sekolah s ON k.sekolahId = s.id 
        where 
          jenisKegiatan=?
        GROUP BY 
          k.id `,
        [jenisKegiatan]
      );
      return res.json(displayResult(result[0]));
    } else {
      const result = await conn.query(
        `select 
          k.*, group_concat(ik.fileName) as fileName, kk.namaKegiatan, s.namaSekolah FROM kegiatan k 
        LEFT JOIN
          kategorikegiatan kk ON k.jenisKegiatan = kk.id
        LEFT JOIN 
          imageKegiatan ik ON k.id = ik.kegiatanId 
        left JOIN
          sekolah s ON k.sekolahId = s.id 
        where 
          sekolahId=?
        GROUP BY 
          k.id `,
        [sekolahId]
      );
      return res.json(displayResult(result[0]));
    }
  },
  async selected(req: Request, res: Response) {
    try {
      const conn = await connect();
      const id = req.params.id;

      const [rows] = await conn.query(
        `
        select 
          k.*, group_concat(ik.fileName) as fileName, kk.namaKegiatan, s.namaSekolah FROM kegiatan k 
        LEFT JOIN
          kategorikegiatan kk ON k.jenisKegiatan = kk.id
        LEFT JOIN 
          imageKegiatan ik ON k.id = ik.kegiatanId 
        left JOIN
          sekolah s ON k.sekolahId = s.id 
        where 
          k.id = ?
        GROUP BY 
          k.id 
        `,
        [id]
      );

      const result = (rows as any[]).map((row) => ({
        id: row.id,
        judul: row.judul,
        tanggal: row.tanggal,
        deskripsi: row.deskripsi,
        namaKegiatan: row.namaKegiatan,
        namaSekolah: row.namaSekolah,
        fileName: row.fileName ? row.fileName.split(",") : [],
      }));
      if (!result || result.length === 0) {
        console.log("No data found for the given id");
        return res.status(404).json({ message: "No data found" });
      }
      return res.json(result);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal menampilkan data kegiatan!",
      });
    }
  },
};
