import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import courseRoutes from "./routes/courses";
import userRoutes from "./routes/users";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/api/users/", userRoutes);
app.use("/api/courses/", courseRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occured";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
