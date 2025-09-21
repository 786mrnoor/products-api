import { Router } from "express";

import login from "../controllers/auth/login.js";
import signup from "../controllers/auth/signup.js";
import refreshToken from "../controllers/auth/refresh-token.js";
import logout from "../controllers/auth/logout.js";

const authRouter = Router();
// POST /api/auth/
authRouter
  .post("/signup", signup)
  .post("/login", login)
  .post("/refresh-token", refreshToken)
  .post("/logout", logout);

export default authRouter;
