import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import CourseModel from "../models/course";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;

  try {
    if (!authenticatedUserId) {
      throw createHttpError(401, "User not authenticated");
    }
    const user = await UserModel.findById(authenticatedUserId)
      .select("+email")
      .exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const email = req.body.email;
  const username = req.body.username;
  const passwordRaw = req.body.password;

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "Parameters missing");
    }
    const existingUsername = await UserModel.findOne({
      username: username,
    }).exec();

    if (existingUsername) {
      throw createHttpError(409, "Username already in use.");
    }

    const existingEmail = await UserModel.findOne({ email: email }).exec();

    if (existingEmail) {
      throw createHttpError(409, "Email already in use");
    }
    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: passwordHashed,
      tier: 1,
    });
    // req.session.userId = newUser._id;
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  email?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  try {
    if (!email || !password) {
      throw createHttpError(400, "Parameters missing.");
    }

    const user = await UserModel.findOne({ email: email })
      .select("+_id +email +username +password")
      .exec();
    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }
    // for google accounts
    if (!user.password) {
      throw createHttpError(
        401,
        "For registered Google accounts, please login via Google SSO"
      );
    }
    const passwordMatch = await bcrypt.compare(password, user.password!);
    if (!passwordMatch) {
      throw createHttpError(401, "Invalid credentials");
    }
    // gen jwt
    const token = jwt.sign(
      { name: user.username, email: user.email, _id: user._id },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
};

interface GoogleSignUpBody {
  email?: string;
  username?: string;
}

export const googleSignUp: RequestHandler<
  unknown,
  unknown,
  GoogleSignUpBody,
  unknown
> = async (req, res, next) => {
  const email = req.body.email;
  const username = req.body.username;

  try {
    if (!email) {
      throw createHttpError(400, "Parameters missing.");
    }

    const existingEmail = await UserModel.findOne({ email: email }).exec();

    if (existingEmail) {
      throw createHttpError(409, "Google account already registered.");
    }

    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: null,
    });
    // req.session.userId = newUser._id;
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface GoogleLoginBody {
  email?: string;
}

export const googleLogin: RequestHandler<
  unknown,
  unknown,
  GoogleLoginBody,
  unknown
> = async (req, res, next) => {
  const email = req.body.email;
  try {
    if (!email) {
      throw createHttpError(400, "Parameters missing.");
    }

    const user = await UserModel.findOne({ email: email })
      .select("+_id +email +username")
      .exec();
    if (!user) {
      res.status(401);
      throw createHttpError(401, "Google Account not registered");
    }

    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};

interface DeleteUserProps {
  userId: string;
}

export const deleteUser: RequestHandler<
  unknown,
  unknown,
  DeleteUserProps,
  unknown
> = async (req, res, next) => {
  const userId = req.body.userId;

  try {
    if (!mongoose.isValidObjectId(userId)) {
      throw createHttpError(400, "Invalid user ID");
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      throw createHttpError(404, "User not found");
    }

    // unenroll user from all courses then delete
    await CourseModel.updateMany({ enrolled: userId },{ $pull: {enrolled: { $in: [user._id]}}});
    await user.deleteOne()

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
