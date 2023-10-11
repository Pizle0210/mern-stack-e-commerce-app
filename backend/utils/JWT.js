import jwt from "jsonwebtoken";
export const generateToken = (res, userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "90days",
  });

  res.cookie("login_token", accessToken, {
    httpOnly: true,
    secure: true,
    // secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 200000, //1 min
    // maxAge: 90 * 24 * 60 * 60 * 1000, //90 days
  });

  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1yr",
  });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: true,
    // secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 3.154e10, // 1 yr
  });
};

export const deleteToken = (res) => {
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(0),
  };
  try {
    res.cookie("login_token", "", cookieOptions);
    res.cookie("refresh_token", "", cookieOptions);
  } catch (error) {
    console.error("An error occurred while deleting tokens:", error);
  }
  return res;
};
