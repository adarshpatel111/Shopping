import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Stack,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
  IconButton,
  TextField,
  Pagination,
} from "@mui/material";
import { rootColors } from "../../Utilities/rootColors";
import { Add as AddIcon, Close as CloseIcon } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import NorthOutlinedIcon from "@mui/icons-material/NorthOutlined";
import SouthOutlinedIcon from "@mui/icons-material/SouthOutlined";
import AddProducts from "../../components/AddProducts/AddProducts";
import UpdateProducts from "../../components/UpdateProducts/UpdateProducts";

const ProductInventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [dateFilter, setDateFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [priceRange, setPriceRange] = useState(""); // New state for price range
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const [sortOrder, setSortOrder] = useState("asc");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/products`);
        console.log("Fetched Products:", response.data);
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [backendUrl]);

  const handleOpenAddDialog = () => setOpenAddDialog(true);
  const handleCloseAddDialog = () => setOpenAddDialog(false);

  const handleOpenUpdateDialog = (productId) => {
    setSelectedProductId(productId);
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setSelectedProductId(null);
    setOpenUpdateDialog(false);
  };

  const handleDateFilterChange = (event) => setDateFilter(event.target.value);
  const handleTypeFilterChange = (event) => setTypeFilter(event.target.value);
  const handlePriceRangeChange = (event) => setPriceRange(event.target.value); // New handler
  const handlePageChange = (event, value) => setCurrentPage(value);

  const handleSortOrderChange = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const filteredProducts = products.filter((product) => {
    const matchesDate = dateFilter
      ? new Date(product.createdAt).toLocaleDateString() ===
        new Date(dateFilter).toLocaleDateString()
      : true;
    const matchesType = typeFilter ? product.category === typeFilter : true;

    let matchesPrice = true;
    if (priceRange) {
      const price = product.price;
      switch (priceRange) {
        case "lessThan1000":
          matchesPrice = price < 1000;
          break;
        case "1000to5000":
          matchesPrice = price >= 1000 && price <= 5000;
          break;
        case "above5000":
          matchesPrice = price > 5000;
          break;
        default:
          matchesPrice = true;
      }
    }

    return matchesDate && matchesType && matchesPrice;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct.data]);
  };

  const handleProductUpdated = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct.data._id ? updatedProduct.data : product
      )
    );
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box padding={2} sx={{ bgcolor: rootColors.primary }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Product Inventory
      </Typography>

      <Stack spacing={2} sx={{ mb: 2 }}>
        <Stack
          sx={{
            flexDirection: { xs: "row", sm: "row" },
            justifyContent: "space-between",
          }}
          spacing={2}
        >
          <Typography variant="subtitle1">
            Total Products: {filteredProducts.length}
          </Typography>
          <Tooltip title="Add New Product" arrow>
            <IconButton color="primary" onClick={handleOpenAddDialog}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Filter by Date"
            type="date"
            value={dateFilter}
            onChange={handleDateFilterChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <Select
            value={typeFilter}
            onChange={handleTypeFilterChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            fullWidth
          >
            <MenuItem value="">
              <em>All Categories</em>
            </MenuItem>
            {[
              "jewelery",
              "men's clothing",
              "electronics",
              "women's clothing",
            ].map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={priceRange}
            onChange={handlePriceRangeChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            fullWidth
          >
            <MenuItem value="">
              <em>All Prices</em>
            </MenuItem>
            <MenuItem value="lessThan1000">Less than 1000</MenuItem>
            <MenuItem value="1000to5000">1000 - 5000</MenuItem>
            <MenuItem value="above5000">Above 5000</MenuItem>
          </Select>
        </Stack>
      </Stack>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Sr No.</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Product Name
                  <IconButton onClick={handleSortOrderChange}>
                    {sortOrder === "asc" ? (
                      <Tooltip title="Sort by Last Updated" arrow>
                        <NorthOutlinedIcon />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Sort by First Updated" arrow>
                      <SouthOutlinedIcon />
                    </Tooltip>
                    )}
                  </IconButton>
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Quantity</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentProducts.map((product, index) => (
              <TableRow key={product._id}>
                <TableCell sx={{ whiteSpace: "nowrap" }}>{index + 1}</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  {product.title}
                </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      width="50"
                      height="50"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <Typography>No Image</Typography>
                  )}
                </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  {product.price}
                </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  {product.quantity}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenUpdateDialog(product._id)}
                    label={product._id}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}
      >
        <Pagination
          count={Math.ceil(filteredProducts.length / productsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>

      {/* Add Product Dialog */}
      <Dialog
        open={openAddDialog}
        onClose={handleCloseAddDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Add New Product
          <IconButton
            aria-label="close"
            onClick={handleCloseAddDialog}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <AddProducts
            onClose={handleCloseAddDialog}
            onAddProduct={handleAddProduct}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Update Product Dialog */}
      <Dialog
        open={openUpdateDialog}
        onClose={handleCloseUpdateDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Update Product
          <IconButton
            aria-label="close"
            onClick={handleCloseUpdateDialog}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedProductId && (
            <UpdateProducts
              productId={selectedProductId}
              onClose={handleCloseUpdateDialog}
              onProductUpdated={handleProductUpdated}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductInventory;
