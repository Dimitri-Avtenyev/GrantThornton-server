import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import fileHandleRoute from "./routes/fileHandler.route";

const app = express();

// middleware
app.use(express.json({limit: "1mb"}));
app.use(express.urlencoded({extended: true}));
app.use(cors( {
  origin: ["http://localhost:3001"],
  credentials: true
}));

app.set("port", process.env.PORT || 3000);

// router middleware
app.use("/uploadfile", fileHandleRoute);


app.listen(app.get("port"), () => {
  console.log(`--- server started at port: ${app.get("port")} ---`);
});