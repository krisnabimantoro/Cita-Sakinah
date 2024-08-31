import multer from "multer";
import path from "path";
import { encryptImage } from "../utils/encryption";
import sharpCompression from "sharp";


const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./storage/uploads");
  },
  filename(req, file, callback) {
    const KEY_UPLOAD: string = process.env.SECRET || "";
    const hash = encryptImage(KEY_UPLOAD, file.originalname);
    const ext = path.extname(file.originalname);
    callback(null, `${file.fieldname}-${hash}${ext}`);
  },
});

const handleMulterError = (err: any, req: any, res: any, next: Function) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      console.log(req.file);
      // return res.status(400).json({ error: err.message });
    }
    // Handle other Multer errors
    return res.status(400).json({ error: err.message });
  }
  next(err); // Pass other errors to the default error handler
};

// function compressImage(req: any) {
//   sharp(req.file).jpeg({ quality: 50 });
// }

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 100,
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

// export const single = upload.single("file");
// export const multiple = upload.array("files", 10);

export const single = [upload.single("file"), handleMulterError];
export const multiple = [upload.array("files", 10), handleMulterError];

export default {
  single,
  multiple,
};
