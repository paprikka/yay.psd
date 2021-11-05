import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let cachedDB: Db | null = null;
export const getDB = async () => {
  if (cachedDB) return cachedDB;
  if (typeof uri === "undefined") {
    return Promise.reject(new Error("DB URL is missing."));
  }

  const client = new MongoClient(uri);

  await client.connect();

  cachedDB = client.db("yay-psd");
  return cachedDB;
};
