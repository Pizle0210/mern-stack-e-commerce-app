import express from "express";
import {
  deleteUser,
  getUserProfile,
  getUsers,
  getUsersById,
  registerUser,
  logout,
  updateUser,
  updateUserProfile,
  authenticateUser,
} from "../controllers/usersController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/logout", logout);
router.post("/login", authenticateUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .get(protect, admin, getUsersById)
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser);

export default router;
