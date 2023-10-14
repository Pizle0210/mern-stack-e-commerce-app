import { deleteToken, generateToken } from "../utils/JWT.js";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import colors from "colors";
import user from "../data/users.js";

const authenticateUser = asyncHandler(async (req, res) => {
  // ?Validate request body
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Invalid request body");
  }

  // ?Find user in the database
  const user = await User.findOne({ email: email });
  if (user && (await user.matchPassword(password))) {
    // generate token
    generateToken(res, user._id);
    // Return user data
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });

    // ?Send response
    res.status(200).json({ message: "User authenticated successfully" });
  } else {
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, isAdmin } = req.body;

  // ?Validate request body
  if (!name || !email || !password) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  try {
    // ?Check if user already exists
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      res.status(400).json({ message: `user already exist` });
      return;
    }

    // ?Create new user
    const user = await User.create({ name, email, password, isAdmin });
    if (user) {
      // Generate token
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
      next();
    } else {
      res.status(400).json({ error: `Unable to create user` });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred. Please try again later." });
  }
});

//?logout handler
const logout = asyncHandler(async (req, res) => {
  deleteToken(res, user._id);
  res.status(200).json({ message: "logged out successfully" });
});

// ? single user handler
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user
    ? res.status(200).json({ message: `${user._id} found` })
    : res.status(400).json({ error: `User not found` });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res
      .status(200)
      .json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
  } else {
    res.status(200).json({ message: `User not found` });
  }
});

const getUsers = asyncHandler(async (req, res) => {
  res.json({ message: "get users" });
});

const getUsersById = asyncHandler(async (req, res) => {
  res.json({ message: "get users by Id" });
});

const deleteUser = asyncHandler(async (req, res) => {
  res.json({ message: "delete user" });
});

const updateUser = asyncHandler(async (req, res) => {
  res.json({ message: "update user" });
});

export {
  deleteUser,
  getUserProfile,
  getUsers,
  getUsersById,
  registerUser,
  logout,
  updateUser,
  updateUserProfile,
  authenticateUser,
};
