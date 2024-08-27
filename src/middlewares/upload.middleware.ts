import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./storage/uploads");
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter(_, file, callback) {
    const allowedMimes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error(`Permitted ${file.mimetype}. Only JPEG and PNG files are allowed.`));
    }
  },
});

export const single = upload.single("file");
export const multiple = upload.array("files", 10);

export default {
  single,
  multiple,
};
