import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import colors from 'colors'


// protect routes
export const protect = asyncHandler(async (req, res, next) => {
  // read login_token and refresh_token from cookie;
  let accessToken = req.cookies.login_token;
  let refreshToken = req.cookies.refresh_token;

  if (accessToken) { 
    try {
      // verify token
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      req.user = await User.findById(decoded.userId);
      next();
    } catch (error) {
      console.log(error);
      next(new Error("Not authorized, token failed"));
    }
  } else if (refreshToken) {
    const newToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    req.user = await User.findById(newToken.userId);
    next()
  } else {
    res.status(401);
    next(new Error("Not authorized, no token"));
  } 
}); 

// admin middleware

export const admin = asyncHandler(async (req, res, next) => {
  let refreshToken = req.cookies.refresh_token;
  if (refreshToken && req.user.isAdmin) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      req.user = await User.findById(decoded.userId);
      next()
    } catch (error) {
      console.log(error);
      next(new Error("Not authorized, token failed"));
      return;
    }
  } else {
    res.status(401).json({ error: "Not authorized, user is not an admin" });
  }
});
