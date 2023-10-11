import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import start from "./config/db.js";
import Order from "./models/orderModel.js";
import colors from "colors";
start();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const newUser = await User.insertMany(users);
    const adminUser = newUser[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    console.log("Data imported".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`error: ${error.message}`);
    throw error;
  }
};

const deleteAllData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log(`Data destroyed`.red.inverse);
    return Promise.resolve();
  } catch (error) {
    console.error(`error: ${error.message}`);
    throw error;
  }
};

if (process.argv[2] !== "-d") {
  importData();
} else {
  deleteAllData();
}
