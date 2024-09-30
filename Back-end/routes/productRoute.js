import express from "express";
import {
  getAllProducts,
  getSingleProduct,
  addProducts,
  updateProducts,
} from "../controllers/productController.js";

const productsRoute = express.Router();
productsRoute.get("/", getAllProducts);
productsRoute.get("/:id", getSingleProduct);
productsRoute.post("/addproducts", addProducts);
productsRoute.put("/update/:id", updateProducts);
export default productsRoute;
