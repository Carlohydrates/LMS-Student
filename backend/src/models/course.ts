import { InferSchemaType, model, Schema } from "mongoose";

const courseSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

type Course = InferSchemaType<typeof courseSchema>;

export default model<Course>("Course", courseSchema);
