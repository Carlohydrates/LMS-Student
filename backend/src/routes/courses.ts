import express from "express";
import * as CourseController from "../controllers/courses";
import { requireAuth } from "../middleware/requireAuth";

const router = express.Router();

// require auth for all course routes
// router.use(requireAuth);

// CRUD
router.get("/", CourseController.getCourses);
router.get("/:courseId", CourseController.getCourse);
router.post("/", CourseController.createCourse);
router.patch("/:courseId", CourseController.updateCourse);
router.delete("/:courseId", CourseController.deleteCourse);

// ENROLLMENT / UNENROLLMENT
router.post("/:courseCode/enroll", CourseController.enrollUser);
router.post("/:courseCode/unenroll", CourseController.unenrollUser);

router.get("/:courseId/enrollees", CourseController.getEnrollees);

export default router;
