import express from "express";
const app = express();
const router = express.Router();
import sekolahController from "./controllers/sekolah.controller";

import testController from "./controllers/test.controller";
import kegiatanConctroller from "./controllers/kegiatan.controller";
import authController from "./controllers/auth.controller";
import uploadMiddleware from "./middlewares/upload.middleware";
import strukturController from "./controllers/struktur.controller";

router.post("/test", testController.createSchool);
router.get("/test", testController.displayData);

//Sekolah endpoint
router.get("/sekolah", sekolahController.displayData);
router.patch("/sekolah/:id", sekolahController.updateData);

//Kegiatan endpoint
router.post("/kegiatan", uploadMiddleware.multiple, kegiatanConctroller.createData);
router.get("/kegiatan", kegiatanConctroller.displayData);
router.get("/kegiatan", kegiatanConctroller.filterSekolah);
router.patch("/kegiatan/:id", uploadMiddleware.single, kegiatanConctroller.updateData);
router.delete("/kegiatan/:id", kegiatanConctroller.deleteData);

//auth
router.post("/user/auth/login", authController.login);
router.post("/user/auth/register", authController.register);

//struktur
router.put("/struktur", uploadMiddleware.single, strukturController.changeStructure);
router.get("/struktur", strukturController.getStucture);

export default router;
