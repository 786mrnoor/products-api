import jwt from "jsonwebtoken";

export function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
}
export function verifyAccessToken(token) {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}
export function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyRefreshToken(token, callback) {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, callback);
}
