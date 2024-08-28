import { Request, Response } from "express";
import connect from "../utils/database";
import fasilitasModel from "../models/fasilitas.model";
import removeFile from "../utils/remove.file";

export default {
  async createData(req: Request, res: Response) {
    try {
      const conn = await connect();
      const dataModel: fasilitasModel = req.body;
      const sekolahId = req.query.sekolahId;

      const imagePaths = req.file as Express.Multer.File | undefined;
      const imageUrl = imagePaths?.path.replace(/\\/g, "/");

      const [insertData] = await conn.query(`insert into fasilitas (namaFasilitas, imageName,sekolahId) values (?,?,?)`, [
        dataModel.namaFasilitas,
        imageUrl,
        sekolahId,
      ]);

      res.status(201).json({
        message: "Fasilitas Berhasil dibuat",
        insertData,
      });
    } catch (error) {}
  },
  async updateData(req: Request, res: Response) {
    const conn = await connect();
    const dataModel: fasilitasModel = req.body;
    const id = req.params.id;

    const [oldImage] = await conn.query<any>("select imageName from fasilitas where id = ?", [id]);

    const imagePaths = req.file as Express.Multer.File | undefined;
    const imageUrl = imagePaths?.path.replace(/\\/g, "/");

    let updateWithImage;
    if (imageUrl) {
      console.log(oldImage[0].imageName);
      removeFile(oldImage[0].imageName);
      console.log("cek");
      updateWithImage = await conn.query(`update fasilitas set namaFasilitas = ?, imageName=? where id = ?`, [
        dataModel.namaFasilitas,
        imageUrl,
        id,
      ]);
      return res.json({ message: "Fasilitas berhasil diubah", updateWithImage });
    }

    const [updateFasilitas] = await conn.query(`update fasilitas set namaFasilitas = ? where id = ?`, [dataModel.namaFasilitas, id]);

    return res.status(200).json({
      message: "Fasilitas berhasil diubah",
      updateFasilitas,
    });
  },

  async deleteData(req: Request, res: Response) {
    try {
      const conn = await connect();
      const id = req.params.id;

      const deleteFasiltas = await conn.query(`delete from fasilitas where id = ?`, [id]);

      return res.status(200).json({ message: "Fasilitas dihapus", deleteFasiltas });
    } catch (error) {}
  },
  async displayData(req: Request, res: Response) {
    try {
      const conn = await connect();
      const display = await conn.query(`select f.*,s.namaSekolah from fasilitas f join sekolah s on f.sekolahId = s.id`);
      return res.status(200).json(display[0]);
    } catch (error) {}
  },
};
