import winston, { format } from "winston";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "backend/logs/error.log", level: "error" }),
  ],
  format:format.combine(
    format.timestamp({format: "MM-DD-YY HH-mm-ss"}),
    format.align(),
    format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
  )
});

const start = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info(`connected to database ${conn.connection.name}`);
  } catch (error) {
    logger.error(`connection to database was unsuccessful: ${error.message}`);
    mongoose.disconnect()
    process.exit(1);
  }
};
export default start;
