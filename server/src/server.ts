import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import readInput from "./routes/fileHandler.route";

const app = express();

// middleware
app.use(express.json({limit: "1mb"}));
app.use(express.urlencoded({extended: true}));
app.use(cors( {
  origin: [],
  credentials: true
}));

app.set("port", process.env.PORT || 3000);

// router middleware
app.use("/uploadfile", readInput);


app.listen(app.get("port"), () => {
  console.log(`--- server started at port: ${app.get("port")} ---`);
});