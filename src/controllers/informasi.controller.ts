import { Request, Response } from "express";
import connect from "../utils/database";
import informasiModel from "../models/informasi.model";
import imageInformasi from "../models/imageInformasi.model";
import removeFile from "../utils/remove.file";
import { ResultSetHeader } from "mysql2";

export default {
  async createData(req: Request, res: Response) {
    const conn = await connect();
    const data: informasiModel = req.body;

    const files = req.files as Express.Multer.File[] | undefined;
    const imagePaths = files ? files.map((file) => file.path.replace(/\\/g, "/")) : [];
    console.log(imagePaths);

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
      message: "Kegiatan berhasil dibuat!",
      insertData,
      imagePaths,
    });
  },
  async updateData(req: Request, res: Response) {
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
    console.log(imageUrl);

    let updateImageInformasi;
    if (imagePaths?.filename) {
      console.log("cek");
      updateImageInformasi = await conn.query(`UPDATE  imageInformasi set  fileName =? WHERE informasiId  = ? and idImage=?`, [
        imageUrl,
        informasiId,
        idImage,
      ]);
    }

    const updateKegiatan = await conn.query(`UPDATE  informasi set ? WHERE id = ?`, [data, informasiId]);
    // await removeFile()

    return res.json({
      message: "Kegiatan berhasil diupdated!",
      updateKegiatan,
      updateImageKegiatan: updateImageInformasi,
    });
  },
  async deleteData(req: Request, res: Response) {
    const conn = await connect();
    const id = req.params.id;

    const [imagePath] = await conn.query<any>(`select fileName from imageInformasi where informasiId = ?`, [id]);

    for (const imageDelete of imagePath) {
      removeFile(imageDelete.fileName);
    }

    const deleteImage = await conn.query(`DELETE FROM imageInformasi  WHERE informasiId = ?`, [id]);
    const result = await conn.query(`DELETE FROM informasi  WHERE id = ?`, [id]);
    return res.json({
      message: "Kegiatan berhasil dihapus!",
      result,
      deleteImage,
    });
  },
};
