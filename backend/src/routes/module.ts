import express from "express";
import * as ModuleController from "../controllers/module";

const router = express.Router();

// router.post("/", ModuleController.createNewModule);
router.get("/:courseCode", ModuleController.getModules);
// router.put("/:id", updateModuleById);
// router.delete("/:moduleId", ModuleController.deleteModule);
// router.delete("/:moduleId/content", ModuleController.deleteModuleContent);

export default router;
