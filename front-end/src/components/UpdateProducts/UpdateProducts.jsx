import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Stack,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-hot-toast";

const UpdateProducts = ({ productId, onClose, onProductUpdated }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    quantity: "",
    image: "",
    rating: {
      rate: "8.5",
      count: "134",
    },
  });

  const [loading, setLoading] = useState(false);

  // Fetch product data on mount
  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/products/${productId}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
        toast.error("Error fetching product data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId, backendUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, price, description, category, quantity, image } = formData;
console.log("formData", formData);
    // Validate required fields
    if (!title || !price || !description || !category || !quantity || !image) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const productData = {
        title,
        price,
        description,
        category,
        quantity,
        image,
        rating: formData.rating,
      };

      const response = await axios.put(
        `${backendUrl}/products/update/${productId}`,
        productData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      onProductUpdated(response.data);
      console.log("Product updated:", response.data);
      toast.success(response.data.message);

      // Close the dialog on success
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 800, margin: "auto" }}>
      <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
        Update Product
      </Typography>
      {loading && <CircularProgress />}
      {!loading && (
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Stack sx={{ gap: 2, flexDirection: { xs: "column", md: "row" } }}>
              <TextField
                label="Product Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Price (in Rupees)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                fullWidth
              />
            </Stack>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                required
                fullWidth
              />
            </Stack>
            <Stack>
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                multiline
                rows={4}
                fullWidth
              />
            </Stack>
            <Stack>
              <TextField
                label="Image URL"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                fullWidth
              />
            </Stack>
            <Stack
              sx={{
                marginTop: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={formData.image}
                alt="Current Product"
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: 4,
                  objectFit: "cover",
                }}
              />
            </Stack>
            <Stack
              sx={{
                marginTop: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "50%" }}
                disabled={loading}
              >
                Update Product
              </Button>
            </Stack>
          </Stack>
        </form>
      )}
    </Paper>
  );
};

export default UpdateProducts;
