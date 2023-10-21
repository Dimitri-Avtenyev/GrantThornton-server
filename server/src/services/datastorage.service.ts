import { dbClient } from "../db";
import { ExchangeRateDict } from "../types";


const getDbData = async (date?: Date): Promise<ExchangeRateDict | null> => {
  let _data: ExchangeRateDict | null = null;
  try {
    await dbClient.connect();
    let query: string | undefined =  date?.toISOString().split("T")[0];
    // let document:ExchangeRateDict | null = await dbClient.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION!).findOne<ExchangeRateDict>({ '2023-10-18': { $type: 'array' }});
    // if (document) {
    //   console.log(document['2023-10-18'].find(x => x.symbol === "AUD")?.symbol);
    // }
    let data: ExchangeRateDict | null = await dbClient.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION!).findOne<ExchangeRateDict>({ query });
    if (!data) {
      console.log(`No data has been found with for: ${query}`);
    }
    _data = data;
  } catch (err) {
    console.log(err);
  } finally {
    await dbClient.close();
  }
  return _data
}

const saveDbData = async (rates: ExchangeRateDict): Promise<void> => {
  try {
    await dbClient.connect();

    //let key:string = Object.keys(rates)[0];
    // check if collection is empty
    let collectionCount: number = await dbClient.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION!).countDocuments();
    
    // check empty collection
    if (collectionCount === 0) {
      //data insertion for dict with multiple days of data
      // convert dict into chuncks of own objects
      if (Object.keys(rates).length > 1) {
        const arrRates:ExchangeRateDict[] = [];
        for (let [key, value] of Object.entries(rates)) {
          let eurRate:ExchangeRateDict = {
            [key]: value
          }
          arrRates.push(eurRate);
        }
        await dbClient.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION!).insertMany(arrRates)
      } else {
        //data insertion for dict with one day of data
        await dbClient.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION!).insertOne(rates);
      }
      
    } else {
      // if collection is filled -> only add one by one
      let key = Object.keys(rates)[0]; //  date in ISO format

      let duplicate:ExchangeRateDict | null = await dbClient.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION!)
        .findOne<ExchangeRateDict>({ [key]: { $exists: true }});
      if (duplicate) {
        console.log(`Document with date: ${key} already exist.`);
        return;
      } else if (Object.keys(rates).length > 1) {
        console.log(`Document with multiple keys, please provide a dict with one key(=date): aborted`);
        return;
      }
      await dbClient.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION!).insertOne(rates)
    }

  } catch (err) {
    console.log(err);
  } finally {
    await dbClient.close();
  }
}

const getLocalData = async (): Promise<void> => {

}

const saveLocalData = async (): Promise<void> => {

}

export default {
  getDbData,
  saveDbData,
  getLocalData,
  saveLocalData
}