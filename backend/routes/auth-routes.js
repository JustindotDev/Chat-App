import express from "express";
import {
  Signup,
  Login,
  Logout,
  UpdateProfile,
  CheckAuth,
} from "../controllers/auth-controllers.js";
import ProtectRoute from "../middleware/auth-middleware.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);

router.put("/update-profile", ProtectRoute, UpdateProfile);

router.get("/check", ProtectRoute, CheckAuth);

export default router;
