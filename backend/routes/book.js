import { Router } from "express";
import { createBook, deleteBook, getBook, getBooks, updateBook } from "../controllers/bookController.js";

const router = Router()

// GET all books
router.get("/", getBooks)

// GET a single book
router.get("/:id", getBook)

// CREATE a new book
router.post("/", createBook)

// DELETE a book
router.delete("/:id", deleteBook)

// UPDATE a book
router.patch("/:id", updateBook)

export default router
