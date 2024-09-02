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
});

const createValidationSchema = Yup.object().shape({
  judul: Yup.string().required("Judul harus diisi").typeError("Inputan untuk 'judul' harus berupa huruf"),
  tanggal: Yup.date().required("Tanggal harus diisi").typeError("Inputan untuk 'tanggal' harus berupa tanggal yang valid"),
  deskripsi: Yup.string().required("Deskripsi harus diisi").typeError("Inputan untuk 'deskripsi' harus berupa huruf"),
});

export default {
  async createData(req: Request, res: Response) {
    try {
      await createValidationSchema.validate(req.body);
      const conn = await connect();
      const data: informasiModel = req.body;

      const files = req.files as Express.Multer.File[] | undefined;
      const imagePaths = files ? files.map((file: { filename: string }) => file.filename) : [];

      //   const imagePaths = files ? files.map((file) => `/${file.path.replace(/\\/g, "/")}`) : [];
      //   //   console.log(imagePaths);
      if (imagePaths.length < 1) return res.status(500).json({ message: "Input gambar kosong" });

      const [insertData] = await conn.query<ResultSetHeader>(`INSERT INTO informasi (judul,tanggal,deskripsi) values (?,?,?)`, [
        data.judul,
        data.tanggal,
        data.deskripsi,
      ]);

      const informasiId = insertData.insertId;

      const tagsArray = data.tagSekolah.split(",");

      for (const tagSekolah of tagsArray) {
        // console.log(tagSekolah);
        await conn.query(`insert into tagInformasi(informasiId,sekolahId) values (?,?) `, [informasiId, tagSekolah]);
      }
      // console.log(imagePaths);
      for (const imagePath of imagePaths) {
        await conn.query("INSERT INTO imageInformasi (informasiId, fileName) VALUES (?, ?)", [informasiId, imagePath]);
      }
      return res.status(201).json({
        message: "Informasi Berhasil Dibuat!",
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
      const conn = await connect();

      if (idImage) {
        const idImageArray = (idImage as string).split(","); // Split comma-separated IDs
        const [oldImages] = await conn.query<any>(`SELECT fileName FROM imageInformasi WHERE idImage IN (?) AND informasiId = ?`, [
          idImageArray,
          informasiId,
        ]);
        // console.log
        for (const img of oldImages) {
          removeFile(img.fileName);
        }
        await conn.query(`DELETE FROM imageInformasi WHERE idImage IN (?) AND informasiId = ?`, [idImageArray, informasiId]);
      }

      const files = req.files as Express.Multer.File[] | undefined;
      const imagePaths = files ? files.map((file: { filename: string }) => file.filename) : [];
      for (const imagePath of imagePaths) {
        await conn.query(`INSERT INTO imageInformasi (informasiId, fileName) VALUES (?, ?)`, [informasiId, imagePath]);
      }

      if (data.deskripsi || data.judul || data.tagSekolah || data.tanggal) {
        await conn.query(`UPDATE informasi set ? WHERE id = ?`, [data, informasiId]);
      }

      return res.status(200).json({
        message: "Informasi berhasil diupdate",
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
      if (imagePath.length <= 0) {
        return res.status(404).json({ message: "File not found" });
      }
      for (const imageDelete of imagePath) {
        removeFile(imageDelete.fileName);
      }

      await conn.query(`delete from tagInformasi where informasiId = ?`,[id])
      await conn.query(`DELETE FROM imageInformasi  WHERE informasiId = ?`, [id]);
      await conn.query(`DELETE FROM informasi  WHERE id = ?`, [id]);
      return res.status(200).json({
        message: "Kegiatan berhasil dihapus!",
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
      const [rows] = await conn.query<any>(
        `SELECT 
          i.*, 
          GROUP_CONCAT(DISTINCT ii.fileName ORDER BY ii.fileName ASC) AS fileName, 
          GROUP_CONCAT(DISTINCT ti.sekolahId ORDER BY ti.sekolahId ASC) AS sekolahIds, 
          GROUP_CONCAT(DISTINCT s.namaSekolah ORDER BY s.namaSekolah ASC) AS namaSekolah
        FROM 
          informasi i 
        LEFT JOIN 
          imageInformasi ii ON i.id = ii.informasiId 
        LEFT JOIN
          tagInformasi ti ON i.id = ti.informasiId
        LEFT JOIN 
          sekolah s ON ti.sekolahId = s.id 
        GROUP BY 
          i.id`
      );
      const result = (rows as any[]).map((row) => ({
        id: row.id,
        judul: row.judul,
        tanggal: row.tanggal,
        deskripsi: row.deskripsi,
        fileName: row.fileName ? row.fileName.split(",") : [],
        namaSekolah: row.namaSekolah ? row.namaSekolah.split(",") : [],
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
  async selected(req: Request, res: Response) {
    try {
      const conn = await connect();
      const id = req.params.id;

      const [rows] = await conn.query(
        `SELECT 
          i.*, 
          GROUP_CONCAT(DISTINCT ii.fileName ORDER BY ii.fileName ASC) AS fileName, 
          GROUP_CONCAT(DISTINCT ti.sekolahId ORDER BY ti.sekolahId ASC) AS sekolahIds, 
          GROUP_CONCAT(DISTINCT s.namaSekolah ORDER BY s.namaSekolah ASC) AS namaSekolah
        FROM 
          informasi i 
        LEFT JOIN 
          imageInformasi ii ON i.id = ii.informasiId 
        LEFT JOIN
          tagInformasi ti ON i.id = ti.informasiId
        LEFT JOIN 
          sekolah s ON ti.sekolahId = s.id 
        where
          i.id = ?
        GROUP BY 
          i.id`,
        [id]
      );

      const result = (rows as any[]).map((row) => ({
        id: row.id,
        judul: row.judul,
        tanggal: row.tanggal,
        deskripsi: row.deskripsi,
        fileName: row.fileName ? row.fileName.split(",") : [],
        namaSekolah: row.namaSekolah ? row.namaSekolah.split(",") : [],
      }));
      if (!result || result.length === 0) {
        console.log("No data found for the given id");
        return res.status(404).json({ message: "No data found" });
      }
      return res.json({ result });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal menampilkan data kegiatan!",
      });
    }
  },
};
