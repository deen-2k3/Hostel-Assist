import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully");

    // Set the strictPopulate option to false
    mongoose.set("strictPopulate", false);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
