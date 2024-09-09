import express from 'express';
import { getAllOrders, updateOrderStatus } from '../controllers/ordersController.js';


// Create route for get orders handler
export const getOrdersRoute = express.Router();
getOrdersRoute.get('/orders', getAllOrders);

// Create route for update order status handler
export const updateOrderStatusDetails = express.Router();
updateOrderStatusDetails.put('/orders/:id/status', updateOrderStatus);


