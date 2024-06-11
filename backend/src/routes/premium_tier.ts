import express from "express";
import * as PremiumTierController from "../controllers/premium_tier";

const router = express.Router();

router.get("/price", PremiumTierController.getPrice);
router.get("/users", PremiumTierController.getUserCount);
// router.patch("/price", PremiumTierController.updatePrice);

export default router;
