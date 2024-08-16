import express from 'express';
import { getAllProducts, getSingleProduct } from '../controllers/productController.js';


// Create route handlers
export const getAllProductsRoute = express.Router();
getAllProductsRoute.get('/products', getAllProducts);

export const getSingleProductsRoute = express.Router();
getSingleProductsRoute.get('/products/:id', getSingleProduct);

