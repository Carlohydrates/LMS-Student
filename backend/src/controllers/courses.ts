import { RequestHandler } from "express";
import CourseModel from "../models/course";
import createHttpError from "http-errors";
import mongoose from "mongoose";

//  GET ALL COURSES

export const getCourses: RequestHandler = async (req, res, next) => {
  try {
    const courses = await CourseModel.find().exec();
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

//  GET A SINGLE COURSE

export const getCourse: RequestHandler = async (req, res, next) => {
  const courseId = req.params.courseId;

  try {
    if (!mongoose.isValidObjectId(courseId)) {
      throw createHttpError(400, "Invalid course ID");
    }

    const course = await CourseModel.findById(courseId).exec();

    if (!course) {
      throw createHttpError(404, "Course not found");
    }

    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

//  CREATE A COURSE

interface CreateCourseBody {
  code?: string;
  title?: string;
  text?: string;
}

export const createCourse: RequestHandler<
  unknown,
  unknown,
  CreateCourseBody,
  unknown
> = async (req, res, next) => {
  const code = req.body.code;
  const title = req.body.title;
  const text = req.body.text;

  try {
    if (!code) {
      throw createHttpError(400, "Course needs a course code");
    }
    if (!title) {
      throw createHttpError(400, "Course needs a title");
    }

    const newCourse = await CourseModel.create({
      code: code,
      title: title,
      text: text,
    });

    res.status(201).json(newCourse);
  } catch (error) {
    next(error);
  }
};

//  UPDATE A COURSE

interface UpdateCourseParams {
  courseId: string;
}

interface UpdateCourseBody {
  code?: string;
  title?: string;
  text?: string;
}

export const updateCourse: RequestHandler<
  UpdateCourseParams,
  unknown,
  UpdateCourseBody,
  unknown
> = async (req, res, next) => {
  const courseId = req.params.courseId;
  const newCode = req.body.code;
  const newTitle = req.body.title;
  const newText = req.body.text;

  try {
    if (!mongoose.isValidObjectId(courseId)) {
      throw createHttpError(400, "Invalid course ID");
    }
    if (!newCode) {
      throw createHttpError(400, "Course needs a course code");
    }
    if (!newTitle) {
      throw createHttpError(400, "Course needs a title");
    }
    if (!newText) {
      throw createHttpError(400, "Course needs a text");
    }

    const course = await CourseModel.findById(courseId).exec();
    if (!course) {
      throw createHttpError(404, "Course not found");
    }

    course.code = newCode;
    course.title = newTitle;
    course.text = newText;

    const updatedCourse = await course.save();

    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

//  DELETE A COURSE

export const deleteCourse: RequestHandler = async (req, res, next) => {
  const courseId = req.params.courseId;

  try {
    if (!mongoose.isValidObjectId(courseId)) {
      throw createHttpError(400, "Invalid course ID");
    }
    const course = await CourseModel.findById(courseId).exec();
    if (!course) {
      throw createHttpError(404, "Course not found");
    }

    await course.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
