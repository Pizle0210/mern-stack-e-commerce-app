import express from "express";
import { getProducts,getProductById } from "../controllers/productController.js";
// import ProductModel from "../models/productModel.js";
// import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();



// ~ getting data from datababse
router.route('/').get(getProducts)
// router.get('/',getProducts)

router.route('/:id').get(getProductById)
// router.get('/:id',getProductById)


export default router;
