import sharp from "sharp";
import removeFile from "./remove.file";

const compressImage = async (filePath: any) => {
  sharp(filePath).jpeg({ quality: 50 }).toFile(filePath);
};

export default compressImage;
