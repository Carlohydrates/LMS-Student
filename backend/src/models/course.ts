import { InferSchemaType, model, Schema, Types } from "mongoose";
import User from "./user"

const courseSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    isPublished: { type: Boolean, required: true, default: false },
    publisher: { type: String, required: true },
    tier: { type: String, required: true},
    price: { type: Number, required: false},
    enrolled: [{ type: Types.ObjectId, ref: "User"}]
  },
  { timestamps: true }
);

type Course = InferSchemaType<typeof courseSchema>;

export default model<Course>("Course", courseSchema);
