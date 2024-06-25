import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import courseRoutes from "./routes/courses";
import userRoutes from "./routes/users";
import premiumTierRoutes from "./routes/premium_tier";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";
import Stripe from "stripe";
import PremiumTierModel from "./models/premium_tier";
import UserModel from "./models/user"
import bodyParser from "body-parser";
import { v4 as uuidv4 } from 'uuid';

const app = express();

//  must be used before app.use(express.json());
app.use('/webhook', express.raw({ type: 'application/json' }));

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());



//  STRIPE
const stripe = new Stripe(`${process.env.STRIPE_PRIVATE_KEY}`, {
  apiVersion: "2024-04-10",
});

app.post("/create-checkout-session/:userId", async (req, res, next) => {
  const tier: any = await PremiumTierModel.findOne();

  if (!tier) {
    throw createHttpError(401, "Tier not found");
  }

  const storeItems = new Map([
    [1, { price: tier.price * 100, name: "Premium Tier" }],
  ]);

  const userId = req.params.userId;
  if (!userId) {
    throw createHttpError(401, "User not found");
  }

  const token = uuidv4(); // Generate unique token
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item: any) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "usd",
            product_data: { name: storeItem?.name },
            unit_amount: storeItem?.price,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.SUCCESS_PAGE_URL}?transaction=success&token=${token}`,
      cancel_url: `${process.env.CANCEL_PAGE_URL}?transaction=cancelled`,
      metadata: { _id: userId},
      
    });
    res.json({ url: session.url, token });
  } catch (error) {
    next(error);
  }
});

app.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (request: Request, response: Response) => {
  const sig: any = request.headers['stripe-signature'];

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WH_SECRET!);
  } catch (err: any) {
    console.error(`Webhook signature verification failed.`, err.message);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  console.log(event.type)
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;

      // Fulfill the purchase...
      const userId = session.metadata?._id; // Make sure to pass the user ID during checkout session creation
      console.log(userId)
      if (userId) {
        const user = await UserModel.findById(userId);

        if (user) {
          user.tier = 1;
          await user.save();
          console.log(`User ${user.username} upgraded to premium tier.`);
        } else {
          console.error(`User with email ${userId} not found.`);
        }
      }
      break;
    // Add more event types to handle here as needed
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
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