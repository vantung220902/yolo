import { checkAuth } from "./../middleware/checkAuth";
import express from "express";
import { UserController } from "../controllers/Auth";
import storage from "./../middleware/uploadFile";
const router = express.Router();

const User = new UserController();

router.post("/register", User.register);

router.post("/login", User.login);

router.post("/forgot-password", User.forgotPassword);

router.put("/change-password", User.changePassword);

router.get("/refreshToken", checkAuth, User.refreshToken);

router.get("/me", checkAuth, User.me);

router.get("/logout", checkAuth, User.logout);

router.put("/update", checkAuth, storage.single("image"), User.update);

export default router;
