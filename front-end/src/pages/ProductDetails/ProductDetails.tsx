import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Rating,
  Button,
  Skeleton,
} from "@mui/material";
import { rootColors } from "../../Utilities/rootColors";
import { useCart } from "react-use-cart";
import CurrencyConverter from "../../components/CurrencyConverter/CurrencyConverter";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem, getItem, updateItemQuantity } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const existingItem = getItem(product.id);
    const newQuantity = existingItem ? existingItem.quantity + 1 : 1;

    if (existingItem) {
      updateItemQuantity(product.id, newQuantity);
      toast.success(`Updated quantity of ${product.title} in cart`, {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      addItem({
        id: product._id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: newQuantity,
      });
      toast.success(`${product.title} added to cart`, {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container sx={{ padding: { xs: 2, sm: 4 } }}>
      {loading ? (
        <Stack
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            flexDirection: "row",
            gap: 4,
            height: "70vh",
          }}
        >
          <Skeleton
            sx={{
              padding: { xs: 2, sm: 4 },
              width: { xs: "500px", md: "200px" },
              height: { xs: "350px", md: "600px" },
            }}
          />
          <Stack>
            <Skeleton
              variant="text"
              sx={{
                padding: { xs: 1, sm: 2 },
                width: "400px",
                height: "100px",
              }}
            />
            <Skeleton
              variant="text"
              sx={{ width: "100px", height: { xs: "30px", md: "50px" } }}
            />
            <Skeleton variant="text" sx={{ width: "100px", height: "50px" }} />
            <Skeleton
              sx={{ width: { xs: "130px", md: "150px" }, height: "50px" }}
            />
            <Skeleton
              sx={{
                padding: { xs: 2, sm: 4 },
                width: "500px",
                height: "100px",
              }}
            />
            <Stack sx={{ gap: 2, flexDirection: { xs: "column", md: "row" } }}>
              <Skeleton
                sx={{ fontSize: "1rem", width: "100px", height: "50px" }}
              />
              <Skeleton sx={{ width: "100px", height: "50px" }} />
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Card
          sx={{
            width: "100%",
            marginTop: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: rootColors.grey,
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}
        >
          <CardMedia
            component="img"
            alt={product.title}
            image={product.image}
            sx={{
              padding: { xs: 2, sm: 4 },
              width: { xs: "80%", md: "50%" },
              height: { xs: "350px", md: "350px" },
            }}
          />
          <CardContent>
            <Typography variant="h4" component="div">
              {product.title}
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ marginTop: 1 }}
            >
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
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default ProductDetails;
