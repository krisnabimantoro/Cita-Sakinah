import { Request, Response } from "express";
import connect from "../utils/database";
import kegiatan from "../models/kegiatan.model";
import jenisKegiatan from "../models/kategoriKegiatan.model";
import Sekolah from "../models/sekolah.model";
import userModei from "../models/user.model";
import { ResultSetHeader } from "mysql2";

export default {
  async displayData(req: Request, res: Response) {
    const conn = await connect();
    const result = await conn.query(
      `SELECT k.*, kk.namaKegiatan, s.namaSekolah FROM kegiatan k JOIN kategoriKegiatan kk ON k.jenisKegiatan = kk.id JOIN sekolah s ON k.sekolahId = s.id`
    );
    return res.json(result[0]);
  },
  async createData(req: Request, res: Response) {
    const data: kegiatan = req.body;
    // const userData: userModei = ;
    const conn = await connect();
    const files = req.files as Express.Multer.File[] | undefined;

    // Safely use the files
    const imagePaths = files ? files.map((file) => file.path) : [];

    // console.log(data);
    const [insertData] = await conn.query<ResultSetHeader>(`INSERT INTO kegiatan set ?`, [data]);

    const kegiatanId = insertData.insertId;
    // console.log(kegiatanId);

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
    const id = req.params.id;
    const data: kegiatan = req.body;
    const conn = await connect();
    const result = await conn.query(`UPDATE  kegiatan set  ? WHERE id = ?`, [data, id]);
    return res.json({
      message: "Kegiatan berhasil diupdated!",
      result,
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
