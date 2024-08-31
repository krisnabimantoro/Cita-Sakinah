import { Request, Response } from "express";
import connect from "../utils/database";
import Sekolah from "../models/sekolah.model";

export default {
  async createSchool(req: Request, res: Response) {
    const newPost: Sekolah = req.body;
    const conn = await connect();
    const result = await conn.query(`INSERT INTO test set ?`, [newPost]);
    return res.json({
      message: "Sekolah created",
      result,
    });
  },
  async displayData(req: Request, res: Response) {
    const conn = await connect();
    const result = await conn.query("SELECT * FROM test");
    return res.json(result[0]);
  },
};