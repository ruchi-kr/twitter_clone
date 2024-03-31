import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://ruchi2017:welcome123@eccomerceapp.8w6ri00.mongodb.net/twitter"
    );
    console.log(`Connected to Mongodb Database ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to Mongodb Database");
  }
};
