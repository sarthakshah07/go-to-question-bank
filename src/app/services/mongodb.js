import  {MongoClient}  from "mongodb";
const uri = process.env.MONGODB_URI; // Make sure to add this in your .env.local
let client;
let clientPromise;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const options = {};

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}
const clientDb = await clientPromise;
const db = clientDb.db("question-bank");
export default db;
