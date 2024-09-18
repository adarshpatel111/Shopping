import { Grid, Stack, Divider, Skeleton } from "@mui/material";
import Herosection from "../../components/HeroSection/Herosection";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import Testimonials from "../../components/Testimonials/Testimonials";
import Highlights from "../../components/Highlights/Highlights";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const Home = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Use axios to fetch data from the backend URL specified in the environment variable
    setTimeout(() => {
      setLoading(true);
    }, 50000);
    axios.get(`${backendUrl}/products`)
      .then((response) => {
        // Check if the data is an array
        // console.log('Data type of response.data:', Array.isArray(response.data)); // This should be true
        setProductData(response.data); // Initialize filteredData with the response
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
        {
          loading ? (
            <Stack
              sx={{
                height: "80vh",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "250px",
                marginBottom: "250px",
              }}
            >
              <Grid container spacing={0}>
                {Array.from({ length: 8 }).map((_, index) => (
                  <Grid
                    item
                    key={index}
                    xs={6}
                    sm={4}
                    md={4}
                    lg={3}
                    sx={{ placeItems: "center" }}
                  >
                    <Skeleton
                      sx={{
                        width: { xs: "150px", md: "200px", lg: "280px" },
                        height: { xs: "150px", md: "200px", lg: "500px" },
                      }}
                    />
                    <Skeleton
                      sx={{
                        width: { xs: "150px", md: "200px", lg: "280px" },
                        height: { xs: "30px", md: "50px", lg: "100px" },
                        marginTop: "-100px",
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
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
