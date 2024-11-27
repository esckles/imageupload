import express, { Application } from "express";
import cors from "cors";
import { dbConfig } from "./utils/dbConfig";
import env from "dotenv";
import { mainApp } from "./mainApp";
env.config();
const port = process.env.PORT;
const app: Application = express();

app.use(express.json());
app.use(cors());
mainApp(app);

app.listen(port, () => {
  dbConfig();
});
