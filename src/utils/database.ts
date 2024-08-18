import { createPool } from "mysql2/promise";

const connect = async () => {
  try {
    const connection = await createPool({
      host: "localhost",
      user: "root",
      database: "cita_sakinah",
      password: "krisnabmntr201_",
    });

    console.log("Connected to the MySQL database.");
    return connection;
  } catch (error) {
    console.error("Error connecting to the MySQL database:", error);
    throw error;
  }
};
export default connect;
