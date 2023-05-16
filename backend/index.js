import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";

//import routes
import bookRoutes from "./routes/book.js";
import userRoutes from "./routes/user.js";
import orderRoutes from "./routes/order.js";

// to access .env variables
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;

// middleware
app.use(json());
app.use(cors());

// connect to the mongodb cluster
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log("connected to db & listening on port", port);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// routes
app.use("/api/books", bookRoutes);
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);
