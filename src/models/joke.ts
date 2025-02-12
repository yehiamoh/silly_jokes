import mongoose, { Document, Schema } from "mongoose";

interface IJoke extends Document {
  title: String;
  content: String;
  imageURL: string;
  created_At: Date;
  updated_At: Date;
  author: mongoose.Schema.Types.ObjectId;
}

const jokeSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
      default: "",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Joke = mongoose.model<IJoke>("Joke", jokeSchema);
export default Joke;