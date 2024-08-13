import express from "express";
import bodyParser from "body-parser";
import routes from "./route";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use("/api", routes);


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });