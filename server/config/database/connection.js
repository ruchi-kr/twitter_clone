import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URL
    );
    console.log(`Connected to Mongodb Database ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to Mongodb Database");
  }
};
