import mongoose from "mongoose";

async function connectDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing from the .env file");
  }

  const connection = await mongoose.connect(
    process.env.MONGODB_URI,
  );

  console.log(
    `MongoDB connected: ${connection.connection.host}`,
  );
}

export default connectDB;