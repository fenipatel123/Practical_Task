
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const options: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
} as ConnectOptions;

mongoose
  .connect(process.env.MONGO_URI!, options)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.error("MongoDB connection error:", error));

export default mongoose.connection;
