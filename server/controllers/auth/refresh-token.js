import UserModel from "../../models/User.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/session.js";

export default async function refreshToken(req, res) {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(401);
    let payload = verifyRefreshToken(token);

    const user = await UserModel.findOne({ _id: payload.id });

    if (!user) return res.sendStatus(403);
    if (user.refreshToken !== token) return res.sendStatus(403);

    payload = { id: user._id, name: user?.name, email: user.email };
    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
    });

    res.json({ token: newAccessToken });
  } catch (err) {
    res.status(500).json({ error: true, message: "Refresh failed" });
  }
}
