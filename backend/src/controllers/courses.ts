import { RequestHandler } from "express";
import CourseModel from "../models/course";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import UserModel from "../models/user";

//  GET ALL COURSES

export const getCourses: RequestHandler = async (req, res, next) => {
  try {
    const courses = await CourseModel.find().exec();
    res.status(200).send(courses);
  } catch (error) {
    next(error);
  }
};

//  GET A SINGLE COURSE

export const getCourse: RequestHandler = async (req, res, next) => {
  const courseId = req.params.courseId;
  console.log(courseId);
  try {
    // if (!mongoose.isValidObjectId(courseId)) {
    //   throw createHttpError(400, "Invalid course ID");
    // }

    const course = await CourseModel.findOne({ code: courseId }).exec();

    if (!course) {
      throw createHttpError(404, "Course not found");
    }

    res.status(200).send(course);
  } catch (error) {
    next(error);
  }
};

//  CREATE A COURSE

interface CreateCourseBody {
  code?: string;
  title?: string;
  description?: string;
  publisher?: string;
  tier?: number;
}

export const createCourse: RequestHandler<
  unknown,
  unknown,
  CreateCourseBody,
  unknown
> = async (req, res, next) => {
  const code = req.body.code;
  const title = req.body.title;
  const description = req.body.description;
  const publisher = req.body.publisher;
  const tier = req.body.tier;

  try {
    if (!code) {
      throw createHttpError(400, "Course needs a course code");
    }
    if (!title) {
      throw createHttpError(400, "Course needs a title");
    }
    if (tier == null) {
      throw createHttpError(400, "Course needs a tier");
    }

    const existingCode = await CourseModel.findOne({
      code: code,
    }).exec();

    if (existingCode) {
      throw createHttpError(
        409,
        "Course with that course code already exists."
      );
    }

    const existingTitle = await CourseModel.findOne({
      title: title,
    }).exec();

    if (existingTitle) {
      throw createHttpError(409, "Course with that title already exists.");
    }

    const newCourse = await CourseModel.create({
      code: code,
      title: title,
      description: description,
      publisher: publisher,
      tier: tier,
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
  description?: string;
  publisher?: string;
  status?: boolean;
  tier?: number;
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
  const newDesc = req.body.description;
  const newPublisher = req.body.publisher;
  const newStatus = req.body.status;
  const newTier = req.body.tier;
  // console.log(courseId, newCode, newTitle, newDesc, newStatus);
  try {
    // if (!mongoose.isValidObjectId(courseId)) {
    //   throw createHttpError(400, "Invalid course ID");
    // }
    // if (!newCode) {
    //   throw createHttpError(400, "Course needs a course code");
    // }
    // if (!newTitle) {
    //   throw createHttpError(400, "Course needs a title");
    // }
    // if (!newDesc) {
    //   throw createHttpError(400, "Course needs a description");
    // }

    const course = await CourseModel.findOne({ code: courseId });
    console.log(course);
    if (!course) {
      throw createHttpError(404, "Course not found");
    }
    if (newCode) {
      course.code = newCode;
    }
    if (newTitle) {
      course.title = newTitle;
    }
    if (newDesc) {
      course.description = newDesc;
    }
    if (newPublisher) {
      course.publisher = newPublisher;
    }
    if (newStatus != undefined) {
      course.isPublished = newStatus;
    }
    if (newTier != undefined || null) {
      course.tier = newTier;
    }

    const updatedCourse = await course.save();

    // console.log("asdsadsad", updatedCourse);
    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

//  DELETE A COURSE

export const deleteCourse: RequestHandler = async (req, res, next) => {
  const courseId = req.params.courseId;

  try {
    // if (!mongoose.isValidObjectId(courseId)) {
    //   throw createHttpError(400, "Invalid course ID");
    // }
    const course = await CourseModel.findOne({ code: courseId }).exec();
    if (!course) {
      throw createHttpError(404, "Course not found");
    }

    await course.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

// GET ENROLLEES

export const getEnrollees: RequestHandler = async (req, res, next) => {
  const courseId = req.params.courseId;
  console.log(courseId);
  try {
    const course = await CourseModel.findOne({ code: courseId }).exec();

    if (!course) {
      throw createHttpError(404, "No enrollees found.");
    }

    const { enrolled } = await course.populate("enrolled");

    if (!enrolled) {
      throw createHttpError(404, "No enrollees found for this course");
    }
    res.status(200).send(enrolled);
  } catch (error) {
    next(error);
  }
};

// ENROLL A USER

interface EnrollUserParams {
  courseCode: string;
}

interface EnrollUserBody {
  username: string;
}

export const enrollUser: RequestHandler<
  EnrollUserParams,
  unknown,
  EnrollUserBody,
  unknown
> = async (req, res, next) => {
  const courseCode = req.params.courseCode;
  const username = req.body.username;
  console.log(courseCode)
  console.log(username)
  try {
    const course = await CourseModel.findOne({code: courseCode}).exec();
    if (!course) {
      throw createHttpError(404, "Course not found");
    }

    const user = await UserModel.findOne({username: username}).exec();
    if (!user) {
      throw createHttpError(404, "User not found");
    }

    // Convert ObjectId to string for comparison
    const enrolledUserIds = course.enrolled.map(id => id.toString());

    if (enrolledUserIds.includes(user._id.toString())) {
      throw createHttpError(409, "User already enrolled");
    }

    course.enrolled.push(user._id);
    await course.save();
    res.status(200).json(course)
  } catch (error) {
    next(error)
  }

};

interface UnenrollUserParams {
  courseCode: string;
}

interface UnenrollUserBody {
  username: string;
}

export const unenrollUser: RequestHandler<
  UnenrollUserParams,
  unknown,
  UnenrollUserBody,
  unknown
> = async (req, res, next) => {
  const courseCode = req.params.courseCode;
  const username = req.body.username;
  console.log(courseCode);
  console.log(username);
  try {
    const course = await CourseModel.findOne({ code: courseCode }).exec();
    if (!course) {
      throw createHttpError(404, "Course not found");
    }

    const user = await UserModel.findOne({ username: username }).exec();
    if (!user) {
      throw createHttpError(404, "User not found");
    }

    // Convert ObjectId to string for comparison
    const enrolledUserIds = course.enrolled.map((id) => id.toString());

    if (!enrolledUserIds.includes(user._id.toString())) {
      throw createHttpError(409, "User not enrolled");
    }

    course.enrolled.remove(user._id);
    await course.save();
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};
