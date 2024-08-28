import { unlink } from "fs";
import { promisify } from "util";

const unlinkAsync = promisify(unlink);

async function removeFile(filePath: string): Promise<void> {
  try {
    await unlinkAsync(filePath);
    // console.log(`File at ${filePath} was deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting file at ${filePath}:`, error);
  }
}

export default removeFile;
// Example usage
// removeFile("path/to/your/file.txt");
