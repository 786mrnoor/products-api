import { verifyAccessToken } from "../utils/session.js";

export default async function authMiddleware(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.replace("Bearer ", "");
  try {
    const payload = verifyAccessToken(token);
    req.user = payload;

    next();
  } catch (err) {
    console.error("Invalid token", err);
    return res.status(401).json({ message: "Invalid token" });
  }
}
