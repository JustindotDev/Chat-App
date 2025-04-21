import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  //create jsonwebtoken
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 1000, // 7 days in milli seconds
    httpOnly: true, // prevent XSS attact cross-site scripting attacks
    sameSite: "strict", //CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
