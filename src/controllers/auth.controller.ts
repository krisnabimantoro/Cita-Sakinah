import { Request, Response } from "express";
import connect from "../utils/database";
import userModel from "../models/user.model";
import { RowDataPacket } from "mysql2/promise";
import jwt from "jsonwebtoken";
import { encrypt, decrypt } from "../utils/encryption";
import * as Yup from "yup";
import Sekolah from "../models/sekolah.model";

export const blacklistedTokens = new Set<string>();
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

      if (PASSWORD.length < 1) return res.status(404).json({ message: "User tidak ditemukan" });

      const passwordValue = PASSWORD[0].PASSWORD;
      const decryptPassword = decrypt(SECRET, passwordValue);

      if (decryptPassword !== userModel.password) return res.status(401).json({ message: "Password salah" });

      const [result] = await conn.query<RowDataPacket[]>(
        `SELECT u.id, u.sekolahId, u.role, s.namaSekolah
         FROM users u
         JOIN sekolah s ON u.sekolahId = s.id
         WHERE u.username = ? AND u.password = ?`,
        [userModel.username, passwordValue]
      );

      // console.log(result);
      if (result.length > 0) {
        const token = jwt.sign(
          { id: result[0].id, sekolahId: result[0].sekolahId, role: result[0].role, namaSekolah: result[0].namaSekolah },
          process.env.SECRET || "",
          {
            expiresIn: "6h",
          }
        );

        res.status(200).json({
          message: "Login Berhasil",
          token,
        });
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal Login",
      });
    }
  },
  async logout(req: Request, res: Response) {
    try {
      const authorizationHeader = req.headers.authorization;

      if (!authorizationHeader) {
        return res.status(400).json({
          message: "Logout failed: No token provided",
        });
      }

      const [prefix, accessToken] = authorizationHeader.split(" ");

      if (prefix !== "Bearer" || !accessToken) {
        return res.status(400).json({
          message: "Logout failed: Invalid token format",
        });
      }

      console.log(accessToken);
      // Blacklist the token
      blacklistedTokens.add(accessToken);

      res.status(200).json({
        message: "Logout Sukses",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal Logout",
      });
    }
  },
  async kontak(req: Request, res: Response) {
    try {
      const conn = await connect();
      const sekolahId = req.params.sekolahId;

      const [result] = await conn.query<any>(
        `select u.id, u.username, u.role, u.noHandphone, u.sekolahId,s.namaSekolah from users u join sekolah s on u.sekolahId = s.id  where sekolahId = ?`,
        [sekolahId]
      );

      res.status(200).json({ result });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal Menampilkan Data Kontak",
      });
    }
  },
};