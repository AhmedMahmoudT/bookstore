import Book from "../models/bookModel.js";
import { Types } from "mongoose";

// GET all books
export const getBooks = async (_, res) => {
  try {
  const books = await Book.find({}).sort({ createdAt: -1 });
  res.status(200).json(books);
} catch (error) {
  res.status(500).send(error);
}  
};

// GET a single book
export const getBook = async (req, res) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Book not found" });
  }

  const book = await Book.findById(id);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.status(200).json(book);
};

// CREATE a new book
export const createBook = async (req, res) => {
  const {
    title, author, ISBN, publisher, publicationYear, category, price, description, ratings, reviews, availableCopies, totalCopies, numPages, coverImage
  } = req.body;

  try {
    const book = await Book.create({
      title, author, ISBN, publisher, publicationYear, category, price, description, ratings, reviews, availableCopies, totalCopies, numPages, coverImage
    });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a book
export const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Book not found" });
  }

  const book = await Book.findOneAndDelete({ _id: id });

  if (!book) {
    return res.status(400).json({ error: "Book not found" });
  }

  res.status(200).json(book);
};

// UPDATE a book
export const updateBook = async (req, res) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Book not found" });
  }

  const book = await Book.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!book) {
    return res.status(400).json({ error: "Book not found" });
  }

  res.status(200).json(book);
};
