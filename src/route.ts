import express from "express";
const app = express();
const router = express.Router();
import sekolahController from "./controllers/sekolah.controller";
// router.post("/computers", (req, res) => {
//   console.log("Request Body:", req.body);
//   const computerData = ({
//     nomor_aset: req.body.nomor_aset,
//     jenis: req.body.jenis,
//     nama: req.body.nama,
//     os: req.body.os,
//     manufaktur: req.body.manufaktur,
//     model: req.body.model,
//     serial_number: req.body.serial_number,
//     garansi: req.body.garansi,
//     status: req.body.status,
//     ram: req.body.ram,
//     harddisk: req.body.harddisk,
//     prosesor: req.body.prosesor,
//     thn_pembelian: req.body.thn_pembelian,
//     nilai_pembelian: req.body.nilai_pembelian,
//     mac: req.body.mac,
//     foto: req.body.foto,
//     deskripsi: req.body.deskripsi,
//   } = req.body);

//   res.json({
//     success: true,
//     message: "Computer added successfully",
//     data: computerData,
//   });
// });

import testController from "./controllers/test.controller";
import test from "node:test";
router.post("/test", testController.createSchool);

router.get("/test", testController.displayData);
export default router;
