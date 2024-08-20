import express from "express";
const app = express();
const router = express.Router();
import sekolahController from "./controllers/sekolah.controller";

import testController from "./controllers/test.controller";
import kegiatanConctroller from "./controllers/kegiatan.controller";
import authController from "./controllers/auth.controller";

router.post("/test", testController.createSchool);
router.get("/test", testController.displayData);

//Sekolah endpoint
router.get("/sekolah", sekolahController.displayData);
router.patch("/sekolah/:id", sekolahController.updateData);

//Kegiatan endpoint
router.post("/kegiatan", kegiatanConctroller.createData);
router.get("/kegiatan", kegiatanConctroller.displayData);
router.get("/kegiatan/sekolah", kegiatanConctroller.filterSekolah);
router.patch("/kegiatan/:id", kegiatanConctroller.updateData);
router.delete("/kegiatan/:id", kegiatanConctroller.deleteData);

//auth
router.post("/user/auth", authController.login);

export default router;
