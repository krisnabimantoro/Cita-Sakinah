import { Request, Response } from "express";
import connect from "../utils/database";
import Sekolah from "../models/sekolah.model";

export default {
  async displayData(req: Request, res: Response) {
    const conn = await connect();
    const result = await conn.query("SELECT * FROM sekolah");
    return res.json(result[0]);
  },
  async updateData(req: Request, res: Response) {
    const id = req.params.id;
    const updateSekolah: Sekolah = req.body;
    const conn = await connect();

    const result = await conn.query("UPDATE sekolah SET ? WHERE id = ?", [updateSekolah, id]);
    return res.json({
      message: "Sekolah updated",
      result,
    });
  },
};
