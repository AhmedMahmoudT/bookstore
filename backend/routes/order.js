import { Router } from "express";
import { createOrder, deleteOrderById, getAllOrders, getOrderById, updateOrderById,  } from "../controllers/orderController.js";

const router = Router()

// GET all orders
router.get("/", getAllOrders)

// GET a single order
router.get("/:id", getOrderById)

// CREATE a new order
router.post("/", createOrder)

// UPDATE an order
router.patch("/:id", updateOrderById)

// DELETE an order
router.delete("/:id", deleteOrderById)

export default router
