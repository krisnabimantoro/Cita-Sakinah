import { Request, Response } from "express";
import connect from "../utils/database";
import kegiatan from "../models/kegiatan.model";
import jenisKegiatan from "../models/kategoriKegiatan.model";
import Sekolah from "../models/sekolah.model";
import userModei from "../models/user.model";
import { ResultSetHeader } from "mysql2";
import fs from "fs";
import removeFile from "../utils/remove.file";

export default {
  async displayData(req: Request, res: Response) {
    const conn = await connect();
    const [rows] = await conn.query(
      `SELECT k.id AS kegiatanId, k.judul, k.tanggal, k.deskripsi, kk.namaKegiatan, GROUP_CONCAT(ik.fileName) AS fileNames FROM kegiatan k LEFT JOIN kategorikegiatan kk ON k.jenisKegiatan = kk.id LEFT JOIN imageKegiatan ik ON k.id = ik.kegiatanId GROUP BY k.id ;`
    );

    const result = (rows as any[]).map((row) => ({
      kegiatanId: row.kegiatanId,
      judul: row.judul,
      tanggal: row.tanggal,
      deskripsi: row.deskripsi,
      namaKegiatan: row.namaKegiatan,
      fileNames: row.fileNames ? row.fileNames.split(",") : [],
    }));
    return res.json(result);
  },
  async createData(req: Request, res: Response) {
    const data: kegiatan = req.body;

    const conn = await connect();
    const files = req.files as Express.Multer.File[] | undefined;
    const imagePaths = files ? files.map((file) => file.path.replace(/\\/g, "/")) : [];
    // const imageUrl =

    const [insertData] = await conn.query<ResultSetHeader>(`INSERT INTO kegiatan set ?`, [data]);
    // console.log(files);

    const kegiatanId = insertData.insertId;

    for (const imagePath of imagePaths) {
      await conn.query("INSERT INTO imageKegiatan (kegiatanId, fileName) VALUES (?, ?)", [kegiatanId, imagePath]);
    }
    return res.json({
      message: "Kegiatan berhasil dibuat!",
      insertData,
      imagePaths,
    });
  },
  async updateData(req: Request, res: Response) {
    const kegiatanId = req.params.id;
    const idImage = req.query.idImage;
    const data: kegiatan = req.body;
    // const imgKegiatan:
    const conn = await connect();

    const imagePaths = req.file as Express.Multer.File | undefined;
    const imageUrl = imagePaths?.path.replace(/\\/g, "/");

    let updateImageKegiatan;
    if (imagePaths?.filename) {
      console.log("cek")
      updateImageKegiatan = await conn.query(`UPDATE  imageKegiatan set  fileName =? WHERE kegiatanId  = ? and idImage=?`, [
        imageUrl,
        kegiatanId,
        idImage,
      ]);
    }

    const updateKegiatan = await conn.query(`UPDATE  kegiatan set ? WHERE id = ?`, [data, kegiatanId]);
    // await removeFile()

    return res.json({
      message: "Kegiatan berhasil diupdated!",
      updateKegiatan,
      updateImageKegiatan,
    });
  },
  async deleteData(req: Request, res: Response) {
    const id = req.params.id;
    const conn = await connect();
    const result = await conn.query(`DELETE FROM kegiatan  WHERE id = ?`, [id]);
    return res.json({
      message: "Kegiatan berhasil dihapus!",
      result,
    });
  },
  async filterSekolah(req: Request, res: Response) {
    const sekolahId = req.query.sekolahId;
    const jenisKegiatan = req.query.jenisKegiatan;
    const conn = await connect();

    if (jenisKegiatan && sekolahId) {
      const result = await conn.query(
        `SELECT k.*, kk.namaKegiatan, s.namaSekolah  FROM kegiatan k JOIN kategoriKegiatan kk ON k.jenisKegiatan = kk.id JOIN sekolah s ON k.sekolahId = s.id where sekolahId=? && jenisKegiatan=?`,
        [sekolahId, jenisKegiatan]
      );
      return res.json(result[0]);
    } else if (!sekolahId) {
      const result = await conn.query(
        `SELECT k.*, kk.namaKegiatan , s.namaSekolah  FROM kegiatan k JOIN kategoriKegiatan kk ON k.jenisKegiatan = kk.id JOIN sekolah s ON k.sekolahId = s.id where jenisKegiatan=?`,
        [jenisKegiatan]
      );
      return res.json(result[0]);
    } else {
      const result = await conn.query(
        `SELECT k.*, kk.namaKegiatan, s.namaSekolah FROM kegiatan k JOIN kategoriKegiatan kk ON k.jenisKegiatan = kk.id JOIN sekolah s ON k.sekolahId = s.id where sekolahId=? `,
        [sekolahId]
      );
      return res.json(result[0]);
    }
  },
};
