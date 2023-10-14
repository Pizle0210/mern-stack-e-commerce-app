import express from "express";
import { getProducts,getProductById, createProduct, updateProducts } from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

// import ProductModel from "../models/productModel.js";
// import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();



// ~ getting data from datababse
router.route('/').get(getProducts).post(protect,admin,createProduct)
// router.get('/',getProducts)

router.route('/:id').get(getProductById).put(protect,admin,updateProducts)
// router.get('/:id',getProductById)



export default router;
