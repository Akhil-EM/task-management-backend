import mongoose from "mongoose";
const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["REFRESH"],
    },
    active: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const TokenModel = mongoose.model("Token", tokenSchema);
