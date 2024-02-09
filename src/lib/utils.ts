import mongoose from "mongoose";

interface ConnectionObject {
  isConnected?: number;
}

const connection: ConnectionObject = {};

export const connectToDb = async (): Promise<void> => {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    if (!process.env.MONGO) {
      throw new Error("MongoDB connection string is not provided");
    }
    const db: any = await mongoose.connect(process.env.MONGO);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
    throw new Error(String(error));
  }
};