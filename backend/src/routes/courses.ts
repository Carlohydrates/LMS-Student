import express from "express";
import * as CourseController from "../controllers/courses";
import { requireAuth } from "../middleware/requireAuth";

const router = express.Router();

// require auth for all course routes
router.use(requireAuth);

router.get("/", CourseController.getCourses);
router.get("/:courseId", CourseController.getCourse);
router.post("/", CourseController.createCourse);
router.patch("/:courseId", CourseController.updateCourse);
router.delete("/:courseId", CourseController.deleteCourse);

export default router;
