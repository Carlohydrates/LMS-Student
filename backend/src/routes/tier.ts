import express from "express";
import * as TierController from "../controllers/tier";

const router = express.Router();

router.get("/price", TierController.getPrice);
router.get("/users", TierController.getUserCount);
// router.patch("/price", PremiumTierController.updatePrice);

export default router;
