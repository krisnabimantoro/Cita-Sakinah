import { Request, Response } from "express";
import connect from "../utils/database";
import userModel from "../models/user.model";
import { RowDataPacket } from "mysql2/promise";
import jwt from "jsonwebtoken";
import { encrypt, decrypt } from "../utils/encryption";
import * as Yup from "yup";

const validateLoginSchema = Yup.object().shape({
  username: Yup.string().required("Username harus diisi"),
  password: Yup.string().required("Password harus diisi"),
});

export default {
  async register(req: Request, res: Response) {
    const userModel: userModel = req.body;
    const conn = await connect();

    const SECRET: string = process.env.SECRET || "";
    const encryptPassword = encrypt(SECRET, userModel.password);
    const result = await conn.query(
      `insert into users (username,password,role,noHandphone, sekolahId) values(?,?,?,?,?)
      `,
      [userModel.username, encryptPassword, userModel.role, userModel.noHandphone, userModel.sekolahId]
    );
    // console.log(result);
    res.status(201).json({
      message: "User registered",
      result,
    });
  },
  async login(req: Request, res: Response) {
    // const { username, password } = req.body;

    try {
      await validateLoginSchema.validate(req.body);
      const userModel: userModel = req.body;

      const conn = await connect();

      const SECRET: string = process.env.SECRET || "";
      const [PASSWORD] = await conn.query<any>(`SELECT PASSWORD FROM users WHERE username=? `, [userModel.username]);

      if (PASSWORD.length < 1) return res.json({ message: "User tidak ditemukan" });

      const passwordValue = PASSWORD[0].PASSWORD;
      const decryptPassword = decrypt(SECRET, passwordValue);

      if (decryptPassword !== userModel.password) return res.json({ message: "Password salah" });

      const [result] = await conn.query<RowDataPacket[]>(`SELECT * FROM users  WHERE username = ? AND password = ?`, [
        userModel.username,
        passwordValue,
      ]);

      // console.log(result);
      if (result.length > 0) {
        const token = jwt.sign({ id: userModel.id, sekolahId: userModel.sekolahId, role: userModel.role }, process.env.SECRET || "", {
          expiresIn: "2h",
        });

        res.status(200).json({
          message: "login berhasil",

          token,
        });
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal login",
      });
    }
  },
};
