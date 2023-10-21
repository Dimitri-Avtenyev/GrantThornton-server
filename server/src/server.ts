import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import fileHandleRoute from "./routes/fileHandler.route";
// demo test rates
import exchangeRateService from "./services/exr.service";
import { connectionString } from "./db";
import datastorageService from "./services/datastorage.service";

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


app.listen(app.get("port"), async () => {
  // demo test rates on start
  let rates = await exchangeRateService.getEurRates(new Date("2023-10-20"), "2023-10-20");
  await datastorageService.saveDbData(rates);

  connectionString("mongodb+srv://<username>:<password>@cluster0.b4g2p.mongodb.net/?retryWrites=true&w=majority")
  const locationStart:string = `---> http://localhost:${app.get("port")} <---`;
  console.log(`---/ server started at port: ${app.get("port")} \\---`);
  console.log(`    ${"*".repeat(locationStart.length)}\n    ${locationStart}\n    ${"*".repeat(locationStart.length)}`);
});