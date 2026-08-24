import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Missing MONGO_URI environment variable");
}

declare global {
  var mongooseCache: Promise<typeof mongoose> | undefined;
}

const cached = global.mongooseCache ?? (global.mongooseCache = mongoose.connect(MONGO_URI));

export default async function connectToDatabase() {
  return cached;
};
