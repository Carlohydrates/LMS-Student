import express from "express";
import * as userController from "../controllers/users";

const router = express.Router();

router.get("/:userId/tier", userController.getUserTier);

router.get("/", userController.getAuthenticatedUser);
router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.delete("/delete", userController.deleteUser)

router.post("/google-login", userController.googleLogin);
router.post("/google-signup", userController.googleSignUp);

export default router;
