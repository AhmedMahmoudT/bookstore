import Order from "../models/orderModel.js";

// GET all orders
export const getAllOrders = async (_, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send(error);
}  
};  

// GET a single order
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send({ error: 'Order not found' });
    }
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

// CREATE a new order
export const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);    
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send(error);    
  }    
};    

// UPDATE an order
export const updateOrderById = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) {
      return res.status(404).send({ error: 'Order not found' });
    }
    res.status(200).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
};

// DELETE an order
export const deleteOrderById = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).send({ error: 'Order not found' });
    }
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};