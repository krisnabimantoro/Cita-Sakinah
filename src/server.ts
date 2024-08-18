import express from "express";
import bodyParser from "body-parser";
import routes from "./route";
import  connect  from "./utils/database";
// import mysql, { PoolOptions, RowDataPacket } from "mysql2";

// const access: PoolOptions = {
//   host: "localhost",
//   user: "root",
//   database: "cita_sakinah",
//   password: "krisnabmntr201_",

// };

// const conn = mysql.createPool(access);

// if (conn) {
//   conn.query<RowDataPacket[]>("SHOW TABLES FROM `test`;", (_err, rows) => {
//     console.log(rows);
//     /**
//      * @rows: [ { Tables_in_test: 'test' } ]
//      */
//   });
// }

// try {
//   async (results: any, fields: any) => {
//     await connection.query('SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45');

//     console.log(results); // results contains rows returned by server
//     console.log(fields);
//   };
//   // fields contains extra meta data about results, if available
// } catch (err) {
//   console.log(err);
// }

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;
  await connect();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
  app.use("/api", routes);
  // async await connect();

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}
startServer()
