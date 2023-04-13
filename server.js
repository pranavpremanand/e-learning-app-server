import express from "express";
import cors from "cors";
import "./config/connection.js";
import route from './routes/route.js'
import './config/connection.js'
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/',route)
app.listen(process.env.PORT, () =>
  console.log("Server is running on port :", process.env.PORT)
);

export default app;