import { InferSchemaType, model, Schema, Types } from "mongoose";
import User from "./user"

const tierSchema = new Schema(
  {
    tier: { type: Number, required: true },
    price: { type: Number, required: true, default: 5 },
    users: [{ type: Types.ObjectId, ref: "User"}]
  }
);

type Tier = InferSchemaType<typeof tierSchema>;

export default model<Tier>("Tier", tierSchema);
