import express from "express";
import cors from "cors";
import route from "./routes/route.js";
import dotenv from "dotenv";
dotenv.config();
import dbConnection from "./config/dbConnection.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", route);
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port :${process.env.PORT}`)
);

export default app;
