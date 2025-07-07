import mongoose from "mongoose";
import { logger } from "../utils/logger";

const connectToDb = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URI as string);
    logger.info("DB connected successfully.");
  } catch (error) {
    throw error;
  }
};

export { connectToDb };
