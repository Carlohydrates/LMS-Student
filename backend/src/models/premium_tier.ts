import { InferSchemaType, model, Schema, Types } from "mongoose";
import User from "./user"

const premiumTierSchema = new Schema(
  {
    price: { type: Number, required: true, default: 100 },
    users: [{ type: Types.ObjectId, ref: "User"}]
  }
);

type Tier = InferSchemaType<typeof premiumTierSchema>;

export default model<Tier>("Premium_Tier", premiumTierSchema);
