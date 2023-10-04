import * as dotenv from "dotenv";
dotenv.config();

import express, { Response } from "express";
import cors from "cors";

const app = express();

// middleware
app.use(express.json({limit: "1mb"}));
app.use(express.urlencoded({extended: true}));
app.use(cors( {
  origin: [],
  credentials: true
}));

app.set("port", process.env.PORT || 3000);

// quick example sending json on route '/'
app.get("/", async (req, res):Promise<Response> => {
  const servermsg = {server : "hello"};

  return res.status(200).json(servermsg);
});
//

app.listen(app.get("port"), () => {
  console.log(`--- server started at port: ${app.get("port")} ---`);
});