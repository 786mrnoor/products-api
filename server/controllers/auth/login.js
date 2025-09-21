import UserModel from "../../models/User.js";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/session.js";

export default async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email not found." });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Password not matched." });

    let payload = { id: user._id, name: user?.name, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
    });

    res.json({
      token: accessToken,
      user: payload,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: "Server error" });
  }
}
