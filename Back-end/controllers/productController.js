import ProductsData from '../models/productModel.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductsData.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getSingleProduct = async (req, res) => {
    try {
        const singleProduct = await ProductsData.findById(req.params.id);
        res.status(200).json(singleProduct);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
