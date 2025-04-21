import express from "express";
import ProtectRoute from "../middleware/auth-middleware.js";
import {
  UserSideBar,
  getMessages,
  SendMessage,
} from "../controllers/chats-controllers.js";

const router = express.Router();

router.get("/users", ProtectRoute, UserSideBar);
router.get("/:id", ProtectRoute, getMessages);

router.post("/send/:id", ProtectRoute, SendMessage);

export default router;
