import { Router } from "express";
import {
  register,
  login,
  logout,
  profile,
  changePassword,
  changeUsername,
  verifyToken
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);

router.get("/verify", authRequired, verifyToken)
router.get("/profile", authRequired, profile);

router.put("/password", authRequired, changePassword);
router.put("/username", authRequired, changeUsername);

export default router;
