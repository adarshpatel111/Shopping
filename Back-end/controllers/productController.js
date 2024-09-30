import ProductsData from "../models/productModel.js";
import mongoose from "mongoose";
export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductsData.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const singleProduct = await ProductsData.findById(req.params.id);
    res.status(200).json(singleProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addProducts = async (req, res) => {
  const product = req.body;
  // console.log("n", product);
  const newProduct = new ProductsData(product);
  try {
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", data: newProduct });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateProducts = async (req, res) => {
  const { id: _id } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No product with that id");
  }

  const updatedProduct = await ProductsData.findByIdAndUpdate(
    _id,
    { ...product, _id },
    { new: true }
  );
  res.json({ message: "Product updated successfully", data: updatedProduct });
};
