import { MongoClient } from "mongodb";

// gebruik ENV(process.env.<variabele>) voor USR en PSW in connectiestring uri

const uri:string = ``;
export const dbClient = new MongoClient(uri);
