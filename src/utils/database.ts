import { createPool, Pool } from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

let connection: Pool;

const connect = async () => {
  try {
    connection = createPool({
      host: process.env.HOST_DB || "",
      user: process.env.USER_DB || "",
      database: process.env.DATABASE_NAME || "",
      password: process.env.PASSWORD_DB || "",
      connectionLimit: 120,
    });

    console.log("Connected to the MySQL database.");

    return connection;
  } catch (error) {
    console.error("Error connecting to the MySQL database:", error);
    throw error;
  }
};
export default connect;
