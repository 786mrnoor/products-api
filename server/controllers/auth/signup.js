import bcrypt from "bcryptjs";
import UserModel from "../../models/User.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/session.js";

export default async function signup(req, res) {
  try {
    const { name, email, password } = req.body || {};
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = re.test(email?.toLowerCase());
    if (!isValid) {
      return res.status(400).json({ message: "Email is not valid" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "password must contain at least 6 characters.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new UserModel({ name, email, password: hashedPassword });
    await user.save();

    let payload = { id: user._id, name: user?.name, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
    });

    res.status(201).json({
      token: accessToken,
      user: payload,
    });
  } catch (err) {
    console.error(err);
    if (err?.errorResponse?.code === 11000 && err?.keyPattern?.email === 1) {
      return res.status(400).json({ message: "Email already registered." });
    }
    res.status(500).json({ message: err.message || err });
  }
}
