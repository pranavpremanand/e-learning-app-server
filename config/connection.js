import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL);
const connection = mongoose.connection;
connection.on("connected", () => console.log("Database connection successful"));
connection.on("error", (err) =>
  console.log("Database connection error :", err)
);

export default mongoose;
