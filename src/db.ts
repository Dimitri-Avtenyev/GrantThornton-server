import { MongoClient } from "mongodb";
import datastorageService from "./services/datastorage.service";
import exrService from "./services/exr.service";
import { ExchangeRateDict } from "./types";

// replace with YOUR credentials in .env file -> MONGODB_USR and MONGODB_PSW
// replace uri with copy from mongodb driver connectionstring, keep <username>:<password>

// ---------------------------------------------------------------------------------------------------------- \\\
const uri: string = `mongodb+srv://<username>:<password>@cluster0.b4g2p.mongodb.net/?retryWrites=true&w=majority`; // <-- replace
// ---------------------------------------------------------------------------------------------------------- \\\





export const connectionString = (uri: string) => {
  return uri.replace("<username>", `${process.env.MONGODB_USR}`).replace("<password>", `${process.env.MONGODB_PSW}`);;
}

connectionString(uri)
export const dbClient = new MongoClient(connectionString(uri));

export const connectDb = async () => {
  try {
    await dbClient.connect();
    console.log("Connection to db has been established.");
  } catch (err) {
    console.log("Conecting failed, error: " + err);
  }
}
export const closeDb = async () => {
  try {
    await dbClient.close();
    console.log("Connection to the db has been closed.");
  } catch (err) {
    console.log("Closing connection failed, error:" + err);
  }
}

// populate db 
export const populateDB = async () => {
  //test insert one
  // let rates = await exrService.getEurRates(new Date("2023-12-10"));

  // await datastorageService.saveDbData(rates);
  try {
    await dbClient.connect();
    let collectionCount: number = await dbClient.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION!).countDocuments();
   
    let mostRecentDocument = await dbClient.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION!).findOne({}, {sort: {$natural: -1}});
    let dateMostRecentDocument = mostRecentDocument?._id.getTimestamp();
    let today:Date = new Date();
    let threeMonthsAgo:Date = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);
    let documentsNeedRefresh:boolean = false;

    if (dateMostRecentDocument) {
      documentsNeedRefresh = dateMostRecentDocument.getMonth() < threeMonthsAgo.getMonth();
    }
    if (collectionCount === 0 || collectionCount > 700 || documentsNeedRefresh) {
      console.log("Renewing data to more recent one");
      await dbClient.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION!).deleteMany({});
      console.log("Populating db...");
      const endPeriod: Date = new Date();
      const startPeriod: Date = new Date();
      startPeriod.setFullYear(startPeriod.getFullYear() - 1);
  
      let rates: ExchangeRateDict = await exrService.getEurRates(startPeriod, endPeriod);
      await datastorageService.saveDbData(rates);
    }
 
  } catch (err) {
    console.log(err);
  } finally {
    await dbClient.close();
  }
}

export const populateLocalDB = async () => {

  const endPeriod: Date = new Date();
  const startPeriod: Date = new Date();
  startPeriod.setFullYear(startPeriod.getFullYear() - 1);

  let rates: ExchangeRateDict = await exrService.getEurRates(startPeriod, endPeriod);
  await datastorageService.saveLocalData(rates);
}
