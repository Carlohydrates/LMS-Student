import { RequestHandler } from "express";
import createHttpError from "http-errors";
import ModuleModel from "../models/module";

interface CreateModuleProps {
  course: string;
  title: string;
  description?: string;
  contentUrl?: string;
}

// Create a new module
export const createNewModule: RequestHandler<CreateModuleProps> = async (
  req,
  res,
  next
) => {
  const course = req.body.course;
  const title = req.body.title;
  const description = req.body.description;
  const contentUrl = req.body.contentUrl;
  let contentUrls: string[] = [];
  contentUrls.push(contentUrl)

  try {
    if (!title) {
      throw createHttpError(400, "Module title is required.");
    }

    const newModule = await ModuleModel.create({
      course,
      title,
      description,
      contentUrls,
    });

    res.status(201).json(newModule);
  } catch (error) {
    next(error);
  }
};

// Get modules by course code
export const getModules: RequestHandler = async (req, res, next) => {
  const courseCode = req.params.courseCode;

  try {
    const modules = await ModuleModel.find({ course: courseCode }).exec();
    if (!modules.length) {
      throw createHttpError(404, "No modules found for this course code.");
    }
    res.status(200).json(modules);
  } catch (error) {
    next(error);
  }
};

export const deleteModule: RequestHandler = async (req, res, next) => {
  const moduleId = req.params.moduleId;

  try {
    const module = await ModuleModel.findByIdAndDelete(moduleId);

    if (!module) {
      throw createHttpError(404, "Module not found.");
    }

    res.status(200).json({ message: "Module deleted successfully." });
  } catch (error) {
    next(error);
  }
};

export const deleteModuleContent: RequestHandler = async (req, res, next) => {
  const moduleId = req.params.moduleId;

  try {
    const module = await ModuleModel.findById(moduleId);

    if (!module) {
      throw createHttpError(404, "Module not found.");
    }

    module.contentUrls.pop();

    await module.save();

    res.status(200).json({ message: "Module content deleted successfully." });
  } catch (error) {
    next(error);
  }
};
