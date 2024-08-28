import { Request, Response } from "express";
import connect from "../utils/database";
import strukturModel from "../models/struktur.model";
// import fs from "fs";
import { error } from "console";
import removeFile from "../utils/remove.file";
import path from "path";

export default {
  async changeStructure(req: Request, res: Response) {
    const strukturModel: strukturModel = req.body;
    const conn = await connect();
    const [oldImage] = await conn.query<any>(`select imageName from struktur where id = 1`);
    // console.log(oldImage[0].imageName);
    removeFile(oldImage[0].imageName);
    
    const imagePaths = req.file as Express.Multer.File | undefined;
    const imageUrl = imagePaths?.path.replace(/\\/g, "/");
    console.log(imageUrl);

    const result = conn.query("update struktur set imageName = ? where id=1", [imageUrl]);

    res.status(200).json({
      result,
    });
  },
  async getStucture(req: Request, res: Response) {
    const conn = await connect();
    const [result] = await conn.query<any>("select imageName from struktur where id = 1");

    return res.status(200).json({
      file: `${req.protocol}://${req.get("host")}/${result[0].imageName}`,
    });
  },
};
