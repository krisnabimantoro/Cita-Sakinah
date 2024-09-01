import express from "express";
const app = express();
const router = express.Router();
import sekolahController from "./controllers/sekolah.controller";

import testController from "./controllers/test.controller";
import kegiatanConctroller from "./controllers/kegiatan.controller";
import authController from "./controllers/auth.controller";
import uploadMiddleware from "./middlewares/upload.middleware";
import strukturController from "./controllers/struktur.controller";
import fasilitasController from "./controllers/fasilitas.controller";
import informasiController from "./controllers/informasi.controller";
import authMiddleware from "./middlewares/auth.middleware";

router.post("/test", testController.createSchool);
router.get("/test", testController.displayData);

//Sekolah endpoint
router.get("/sekolah", sekolahController.displayData);
router.patch("/sekolah/:id", sekolahController.updateData);

//Kegiatan endpoint
router.post("/kegiatan", uploadMiddleware.multiple, kegiatanConctroller.createData);
router.get("/kegiatan", kegiatanConctroller.displayData);
router.get("/kegiatan/filter", kegiatanConctroller.filterDisplay);
router.get("/kegiatan/:id", kegiatanConctroller.selected);
router.patch("/kegiatan/:id", uploadMiddleware.multiple, kegiatanConctroller.updateData);
router.delete("/kegiatan/:id", kegiatanConctroller.deleteData);

//informasi
router.post("/informasi", uploadMiddleware.multiple, informasiController.createData);
router.get("/informasi", informasiController.displayData);
router.get("/informasi/:id", authMiddleware, informasiController.selected);
router.get("/informasi/filter", informasiController.filterData);
router.patch("/informasi/:id", uploadMiddleware.multiple, informasiController.updateData);
router.delete("/informasi/:id", uploadMiddleware.single, informasiController.deleteData);

//auth
router.post("/user/auth/login", authController.login);
router.post("/user/auth/register", authController.register);
router.post("/user/logout", authMiddleware, authController.logout);

//struktur
router.put("/struktur", uploadMiddleware.single, strukturController.changeStructure);
router.get("/struktur", strukturController.getStucture);

//fasilitas
router.post("/fasilitas", uploadMiddleware.single, fasilitasController.createData);
router.get("/fasilitas", fasilitasController.displayData);
router.patch("/fasilitas/:id", uploadMiddleware.single, fasilitasController.updateData);
router.delete("/fasilitas/:id", fasilitasController.deleteData);

export default router;
