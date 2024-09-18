import { Grid, Stack, Typography, MenuItem, Select, InputLabel, FormControl, TextField, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios';
import ProductCard from "../../components/ProductCard/ProductCard";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const Products = () => {
  const [productData, setProductData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState(''); // for sorting products
  const [searchTerm, setSearchTerm] = useState(''); // for search input
  interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
    category: string;

    // Add other properties as needed
  }
  useEffect(() => {
    // Use axios to fetch data from the local API
    axios.get(`${backendUrl}/products`)
      .then((response) => {
        setProductData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let data = [...productData];

    // Apply category filter
    if (category) {
      data = data.filter((product) => product.category === category);
    }

    // Apply search filter
    if (searchTerm) {
      data = data.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    if (sortOrder === 'asc') {
      data.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      data.sort((a, b) => b.price - a.price);
    }

    setFilteredData(data);
  }, [category, sortOrder, searchTerm, productData]);

  return (
    <Stack sx={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
      <Stack sx={{ width: "90%", mt: 5, gap: 8 }}>
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
            <>
              <Stack direction="row" spacing={2} sx={{ mb: 4, alignItems: 'center' }}>
                <TextField
                  label="Search"
                  variant="outlined"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ flexGrow: 1 }}
                />
                <FormControl sx={{ width: 200 }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    label="Category"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="electronics">Electronics</MenuItem>
                    <MenuItem value="jewelery">Jewelery</MenuItem>
                    <MenuItem value="men's clothing">Men's Clothing</MenuItem>
                    <MenuItem value="women's clothing">Women's Clothing</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ width: 200 }}>
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    label="Sort By"
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="asc">Price: Low to High</MenuItem>
                    <MenuItem value="desc">Price: High to Low</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              <Grid container spacing={2}>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <Grid item xs={12} md={3} key={index}>
                      <ProductCard productData={item} />
                    </Grid>
                  ))
                ) : (
                  <Typography>No products found</Typography>
                )}
              </Grid>
            </>
          )}
      </Stack>
    </Stack>
  );
};

export default Products;

