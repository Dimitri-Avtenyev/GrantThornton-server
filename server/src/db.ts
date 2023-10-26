import { MongoClient } from "mongodb";
import datastorageService from "./services/datastorage.service";
import exrService from "./services/exr.service";
import { ExchangeRateDict } from "./types";

// replace with YOUR credentials in .env file -> MONGODB_USR and MONGODB_PSW
// replace uri with copy from mongodb driver connectionstring, keep <username>:<password>

// ---------------------------------------------------------------------------------------------------------- \\\
const uri:string = `mongodb+srv://<username>:<password>@cluster0.b4g2p.mongodb.net/?retryWrites=true&w=majority`; // <-- replace
// ---------------------------------------------------------------------------------------------------------- \\\





export const connectionString = (uri:string) => {
  return uri.replace("<username>", `${process.env.MONGODB_USR}`).replace("<password>", `${process.env.MONGODB_PSW}`);;
}

connectionString(uri)
export const dbClient = new MongoClient(connectionString(uri));



// populate db 
let populateddDb:boolean = false; //run only once on startup

export const populateDB = async():Promise<boolean> => {
  if(populateddDb) {
    return false
  }
  return true;
}

export const populateLocalDB = async():Promise<boolean> => {
  if(populateddDb) {
    return false
  }

  const endPeriod:Date = new Date();
  const startPeriod:Date = new Date();
  startPeriod.setFullYear(startPeriod.getFullYear() -1);
  
  let rates:ExchangeRateDict = await exrService.getEurRates(startPeriod, endPeriod);
  await datastorageService.saveLocalData(rates);
  populateddDb = true;
  
  return true;
}