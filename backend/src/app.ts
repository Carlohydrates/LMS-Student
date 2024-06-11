import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import courseRoutes from "./routes/courses";
import userRoutes from "./routes/users";
import premiumTierRoutes from "./routes/premium_tier"
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";
import Stripe from 'stripe'

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//  STRIPE
const stripe = new Stripe(`${process.env.STRIPE_PRIVATE_KEY}`, {
  apiVersion: '2024-04-10',
});

//  ROUTES
app.use("/api/users/", userRoutes);
app.use("/api/courses/", courseRoutes);
app.use("/api/premium/", premiumTierRoutes);

//  ERROR HANDLING
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
