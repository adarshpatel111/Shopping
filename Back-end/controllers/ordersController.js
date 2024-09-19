import Orders from "../models/orderModel.js";

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Orders.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Update order status
export const updateOrderStatus = async (req, res) => {
    const { id } = req.params; // Order ID from URL params
    const { status } = req.body; // New status from request body

    // Validate input
    if (!status) {
        return res.status(400).json({ message: 'Status is required' });
    }

    try {
        // Find and update the order
        const updatedOrder = await Orders.findByIdAndUpdate(
            id,
            { orderStatus: status },
            { new: true } // Returns the updated document
        );

        // Handle case where the order was not found
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Respond with the updated order
        res.status(200).json(updatedOrder);
    } catch (error) {
        // Log the error and respond with a server error status
        res.status(500).json({ message: 'Server error' });
    }
};
