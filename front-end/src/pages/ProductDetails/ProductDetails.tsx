import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, CardMedia, CardContent, Typography, Stack, Rating, Button } from "@mui/material";
import { rootColors } from "../../Utilities/rootColors";
import { useCart } from "react-use-cart";
import CurrencyConverter from "../../components/CurrencyConverter/CurrencyConverter";
import Loader from "../../components/Loader/Loader";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Dependency on `id` to refetch data when `id` changes

  if (loading) return <Stack sx={{ justifyContent: "center", alignItems: "center", height: "100vh" }}><Loader /></Stack>;
  if (error) return <div>Error: {error.message}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <Container sx={{ padding: { xs: 2, sm: 4 } }}>
      <Card sx={{
        width: "100%", marginTop: 2, display: "flex", justifyContent: "center",
        alignItems: "center",
        bgcolor: rootColors.grey, flexDirection: { xs: "column", md: "row" }, gap: 2
      }}>
        <CardMedia
          component="img"
          alt={product.title}
          image={product.image}
          sx={{ padding: { xs: 2, sm: 4 }, width: { xs: "80%", md: "50%" }, height: { xs: "350px", md: "350px" } }}
        />
        <CardContent >
          <Typography variant="h4" component="div">
            {product.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ marginTop: 1 }}>
            {product.category}
          </Typography>
          <Typography variant="h5" color="primary" sx={{ marginTop: 2 }}>
            <CurrencyConverter price={product.price} />
          </Typography>
          <Stack direction="row" spacing={1} sx={{ marginTop: 2 }}>
            <Rating
              name="read-only"
              value={product.rating.rate}
              precision={0.1}
              readOnly
            />
            <Typography variant="body2" color="text.secondary">
              ({product.rating.count} reviews)
            </Typography>
          </Stack>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            {product.description}
          </Typography>
          <Stack sx={{ gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
            <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Buy Now
            </Button>
            <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={() => addItem(product)}>
              Add to Cart
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetails;
