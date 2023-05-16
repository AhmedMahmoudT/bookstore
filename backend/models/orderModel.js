import { Schema, model, Types } from "mongoose";

const orderSchema = new Schema({
  userEmail: { type: String, ref: "User", required: true },
  cardNumber: { type: String, required: true},
  creditExpiry: { type: String, required: true},
  creditCvc: { type: String, required: true},
  shippingMethod: { type: String, required: true},
  billingAddress: { type: String, required: true},
  billingRegion: { type: String, required: true},
  billingZip: { type: String, required: true},
  books: [
    {
      book_id: { type: Types.ObjectId, ref: "Book", required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    },
  ],
  total_price: { type: Number, required: true },
});

const Order = model("Order", orderSchema);
export default Order;
