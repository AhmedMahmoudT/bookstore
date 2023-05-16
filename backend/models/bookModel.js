import { Schema, model, Types } from "mongoose";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    publicationYear: {
      type: Number,
      required: true,
    },
    ISBN: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ratings: [
      {
        user_id: { type: Types.ObjectId, ref: "User" },
        rating: { type: Number, required: true },
      },
    ],
    reviews: [
      {
        user_id: { type: Types.ObjectId, ref: "User" },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    availableCopies: { type: Number, required: true },
    totalCopies: { type: Number, required: true },
    coverImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Book = model("Book", bookSchema);
export default Book;
