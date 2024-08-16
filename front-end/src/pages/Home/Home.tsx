import { Grid, Stack, CircularProgress, Typography, Divider } from "@mui/material";
import Herosection from "../../components/HeroSection/Herosection";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import Testimonials from "../../components/Testimonials/Testimonials";
import Highlights from "../../components/Highlights/Highlights";
import axios from "axios";
import { useSelector } from "react-redux";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const Home = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Use axios to fetch data from the backend URL specified in the environment variable
    axios.get(`${backendUrl}/products`)
      .then((response) => {
        // Check if the data is an array
        // console.log('Data type of response.data:', Array.isArray(response.data)); // This should be true
        setProductData(response.data);
        setFilteredData(response.data); // Initialize filteredData with the response
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
        setLoading(false); // Set loading to false if there's an error
      });
  }, []);

  return (
    <Stack sx={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
      <Stack sx={{ width: "90%", mt: 5, gap: 8 }}>
        <Herosection />
        {loading ? (
          <Stack sx={{ justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Loader />
          </Stack>
        ) : (
          <Grid container spacing={5}>
            {productData.map((Item, index) => (
              <Grid item xs={12} md={3} key={index}>
                <ProductCard productData={Item} />
              </Grid>
            ))}
          </Grid>
        )}
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
      </Stack>
    </Stack>
  );
};

export default Home;
