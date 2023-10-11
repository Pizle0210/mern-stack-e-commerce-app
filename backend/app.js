import express from "express";
import start from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import products from "./data/products.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const port = process.env.PORT || 4000;

const app = express();
app.use(express.json()); //checks request for post/patch
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
// cookie parser
app.use(cookieParser());
app.use(cors());

app.use("/kampala/products", productRoute);
app.use("/kampala/users", userRoute);
app.use("/kampala/orders", orderRoute);
start(); //connect to database
app.listen(port, () => {
  console.log(`server now running on ${port}`);
});

process.on("uncaughtException", (err) => {
  console.log(`something went wrong, ${err}`);
  process.exit(1);
});
