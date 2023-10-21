import path from 'path';
import express from "express";
import start from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import uploadRoutes from "./routes/uploadRoutes.js"
// import products from "./data/products.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from 'helmet';
import { escape } from 'querystring';
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
app.get("/kampala/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);
app.use("/kampala/upload",uploadRoutes);

const __dirname = path.resolve()
app.use(helmet())
app.use('/uploads',express.json({ limit: '5mb' }), express.static(path.resolve(__dirname, 'uploads')))

if (process.env.NODE_ENV==='production') {
  // set static folder
  app.use(express.static(path.join(__dirname,'/frontend/build')))

  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
  })
}else{
  app.get('/',(req,res)=>{
    res.send('API is running......');
  })
}

start(); //connect to database
app.listen(port, () => {
  console.log(`server now running on ${port}`);
});

process.on("uncaughtException", (err) => {
  console.log(`something went wrong, ${err}`);
  process.exit(1);
});
