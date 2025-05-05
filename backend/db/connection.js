import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection error", error);
        process.exit(1);
    }
}

export default connectDb