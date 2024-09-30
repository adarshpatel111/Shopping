import express from 'express';
import { getAllOrders, updateOrderStatus } from '../controllers/ordersController.js';


// Create route for get orders handler
const ordersRoute = express.Router();
ordersRoute.get('/', getAllOrders);
ordersRoute.put('/:id/status', updateOrderStatus);
export default ordersRoute;

