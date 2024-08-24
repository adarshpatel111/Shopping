import express from 'express';
import { getPaymentDetails } from '../controllers/paymentController.js';

export const getPaymentRoute = express.Router();
getPaymentRoute.post('/create-checkout-session', getPaymentDetails);
