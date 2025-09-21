import UserModel from "../../models/User.js";
import { verifyRefreshToken } from "../../utils/session.js";

export default async function logout(req, res) {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      res.clearCookie("refreshToken");
      return res.status(200).json({ message: "Logout successful" });
    }
    let payload = verifyRefreshToken(token);

    await UserModel.updateOne(
      { _id: payload.id },
      {
        refreshToken: null,
      }
    );

    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: "Logout failed" });
  }
}
