import { MongoClient } from "mongodb";

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
