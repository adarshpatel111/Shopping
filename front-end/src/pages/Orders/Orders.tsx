import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Stack,
  Box,
  CircularProgress,
  MenuItem,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@mui/material';
import { rootColors } from '../../Utilities/rootColors';
import toast from 'react-hot-toast';

const statusOptions = [
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
  'Returned'
];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editStatusOrderId, setEditStatusOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch data from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${backendUrl}/orders`);
        setOrders(response.data);
      } catch (error) {
        toast.error("Error while fetching orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [backendUrl]);

  const handleStatusChange = (orderId, status) => {
    setEditStatusOrderId(orderId);
    setNewStatus(status);
    setOpenDialog(true);
  };

  const confirmStatusChange = async () => {
    try {
      // Make the PUT request to update the order status
      const response = await axios.put(`${backendUrl}/orders/${editStatusOrderId}/status`, {
        status: newStatus
      });

      // Check if the response status is OK
      if (response.status !== 200) {
        toast.error('Failed to update status');
      }
      else {
        toast.success('Successfully updated status');
      }

      // Update the status locally
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === editStatusOrderId
            ? { ...order, orderStatus: newStatus }
            : order
        )
      );

      // Close the dialog or perform any other action
      setOpenDialog(false);
    } catch (error) {
      // Set the error message
      toast.error('Failed to update status');
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (loading) return <CircularProgress />;
  // if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box padding={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: rootColors.primary }}>
      <Typography variant="h4" gutterBottom>Orders</Typography>
      <TableContainer component={Paper} sx={{ bgcolor: rootColors.primary }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Shipping Address</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>QTY</TableCell>
              <TableCell>Subtotal</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Delivery Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => {
              // Calculate subtotal for each order
              const subtotal = order.products.reduce((acc, product) => acc + (product.price * product.quantity), 0);

              return (
                <TableRow key={order._id}>
                  <TableCell>{order._id || 'N/A'}</TableCell>
                  <TableCell>
                    {order.customer
                      ? `${order.customer.firstName || 'N/A'} ${order.customer.lastName || 'N/A'}`
                      : 'N/A'}
                    <br />
                    {order.customer ? order.customer.email || 'N/A' : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {order.shippingAddress
                      ? `${order.shippingAddress.street || 'N/A'}, ${order.shippingAddress.city || 'N/A'}, ${order.shippingAddress.state || 'N/A'} ${order.shippingAddress.postalCode || 'N/A'}, ${order.shippingAddress.country || 'N/A'}`
                      : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {order.products && order.products.length > 0 ? (
                      <Stack spacing={1}>
                        {order.products.map(product => (
                          <Typography key={product._id}>{product.title || 'N/A'}</Typography>
                        ))}
                      </Stack>
                    ) : (
                      'N/A'
                    )}
                  </TableCell>
                  <TableCell>
                    {order.products && order.products.length > 0 ? (
                      <Stack spacing={1}>
                        {order.products.map(product => (
                          <Typography key={product._id}>{product.quantity || 'N/A'}</Typography>
                        ))}
                      </Stack>
                    ) : (
                      'N/A'
                    )}
                  </TableCell>
                  <TableCell>${subtotal.toFixed(2) || 'N/A'}</TableCell>
                  <TableCell>{order.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'N/A'}</TableCell>
                  <TableCell>{order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : 'N/A'}</TableCell>
                  <TableCell>
                    <Select
                      value={order.orderStatus || ''}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      variant="outlined"
                      size="small"
                    >
                      {statusOptions.map(status => (
                        <MenuItem key={status} value={status}>{status}</MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Status Update</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to update the status to "{newStatus}"?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={confirmStatusChange} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Orders;
