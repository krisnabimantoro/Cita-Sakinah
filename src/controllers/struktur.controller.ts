import { Request, Response } from "express";
import connect from "../utils/database";
import strukturModel from "../models/struktur.model";

export default {
  async changeStructure(req: Request, res: Response) {
    const strukturModel: strukturModel = req.body;
    const conn = await connect();

    const fileName = req.file?.filename || "";

    const result = conn.query("update struktur set imageName = ? where id=1", [fileName]);

    res.status(200).json({
      result,
    });
  },
  async getStucture(req: Request, res: Response) {
    const conn = await connect();
    const [result] = await conn.query<any>("select imageName from struktur where id = 1");

    res.status(200).json({
      file: `${req.protocol}://${req.get("host")}/storage/uploads/${result[0].imageName}`,
    });
  },
};
