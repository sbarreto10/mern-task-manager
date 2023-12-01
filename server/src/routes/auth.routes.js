import { Router } from "express";
import {
  register,
  login,
  logout,
  profile,
  changePassword,
  changeUsername,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

import { registerSchema, loginSchema, changeUsernameSchema, changePasswordSchema } from "../schemas/auth.schema.js";

const router = Router();

router.get('/', (req, res) => {
  res.sendStatus(200)
})

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);

router.get("/profile", authRequired, profile);

router.put("/password", authRequired, validateSchema(changePasswordSchema), changePassword);
router.put("/username", authRequired, validateSchema(changeUsernameSchema), changeUsername);

export default router;
