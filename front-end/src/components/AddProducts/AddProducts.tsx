import { TextField, Button, Stack, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const AddProducts = ({ onClose, onAddProduct }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    image: "", // Store the image URL
    title: "",
    price: "",
    description: "",
    category: "",
    quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 const handleSubmit = async (e) => {
   e.preventDefault();
   const { image, title, price, description, category, quantity } = formData;

   if (!image) {
     console.error("Please provide an image URL.");
     return;
   }
   if (!title || !price || !description || !category || !quantity) {
     console.error("Please fill in all required fields.");
     return;
   }

   try {
     const productData = {
       title,
       price,
       description,
       category,
       quantity,
       image: image,
     };
     await submitProduct(productData);
   } catch (error) {
     console.error("Error adding product:", error);
   }
 };

  const submitProduct = async (productData) => {
    try {
      const response = await axios.post(
        `${backendUrl}/products/addproducts`,
        productData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      onAddProduct(response.data);
      onClose(); // Close the dialog
      console.log("Product added:", response.data);
      // Reset the form after successful submission
      setFormData({
        image: "",
        title: "",
        price: "",
        description: "",
        category: "",
        quantity: "",
      });
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  const previewImage = formData.image;

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 800, margin: "auto" }}>
      <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
        Add New Product
      </Typography>
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
              fullWidth
              required
            />
          </Stack>
          <Stack
            sx={{
              height:{xs: 200, md: 300},
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 2,
            }}
          >
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: 4,
                  objectFit: "cover",
                }}
              />
            )}
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
              style={{ width: "50%" }}
            >
              Add Product
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
};

export default AddProducts;
