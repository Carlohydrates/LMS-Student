import { InferSchemaType, model, Schema } from "mongoose";

const moduleSchema = new Schema(
  {
    course: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    description: { type: String },
    contentUrls: [{ type: String }],
  },
  { timestamps: true }
);

type Module = InferSchemaType<typeof moduleSchema>;

export default model<Module>("Modules", moduleSchema);
