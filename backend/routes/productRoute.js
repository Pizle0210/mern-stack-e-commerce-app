import express from "express";
import { getProducts,getProductById, createProduct, updateProducts, deleteProducts, createReview, getTopRatedProducts } from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

// import ProductModel from "../models/productModel.js";
// import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();



// ~ getting data from datababse
router.route('/').get(getProducts).post(protect,admin,createProduct);
// router.get('/',getProducts);

router.get('/top',getTopRatedProducts)

router.route('/:id').get(getProductById).put(protect,admin,updateProducts).delete(protect,admin,deleteProducts);
// router.get('/:id',getProductById);

router.route('/:id/reviews').post(protect,createReview);
// router.post('/:id/reviews',createReview);



export default router;
