import express from "express";
import {
  addOrders,
  getMyOrders,
  getOrders,
  getOrdersById,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router(); 

router.route("/").post(protect, addOrders).get(protect, admin, getOrders);
router.route('/myaccount').get(protect,getMyOrders);
router.route('/:id').get(protect,getOrdersById);
router.route('/:id/pay').put(protect,updateOrderToPaid);
router.route('/:id/delivered').put(protect,admin,updateOrderToDelivered);

export default router;
 