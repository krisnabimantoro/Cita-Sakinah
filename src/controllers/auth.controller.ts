import { Request, Response } from "express";
import connect from "../utils/database";
import user from "../models/user.model";

export default {
  async login(req: Request, res: Response) {
    const { username, password } = req.body;

    const conn = await connect();
    try {
      const result = await conn.query(`SELECT * FROM users  WHERE username = ? AND password = ?`, [username, password]);
      if (result.length > 0) {
        res.json({
          message: "login berhasil",
          result,
        });
      } else {
        res.json({
          message: "email atau password salah",
        });
      }
    } catch (error) {}
  },
};
