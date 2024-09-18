import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "react-use-cart";
import { toast } from "react-hot-toast";
import { rootColors } from "../../Utilities/rootColors";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
//Stripe removed from here
const CurrencyConverter = ({amount, baseCurrency = 'USD', targetCurrency = 'INR' }) => {
    const [rate, setRate] = useState(60); // Default rate
    const [convertedAmount, setConvertedAmount] = useState(amount);

    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
                const data = await response.json();
                setRate(data.rates[targetCurrency]); // Get target currency rate from the fetched data
            } catch (error) {
                console.error('Error fetching exchange rate:', error);
            }
        };

        fetchExchangeRate();
    }, [baseCurrency, targetCurrency]);

    useEffect(() => {
        setConvertedAmount(amount * rate);
    }, [amount, rate]);

    return convertedAmount.toFixed(2);
};

// Proceed to Pay
const Cart: React.FC = () => {
    const { items, removeItem, updateItemQuantity, emptyCart, cartTotal } = useCart();
    const [open, setOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const navigate = useNavigate();
    const userinfo = useSelector((state: any) => state.login.user);

    const handleDeleteClick = (id: number) => {
        setItemToDelete(id);
        setOpen(true);
    };

    const handleQuantityChange = (id: number, quantity: number) => {
        if (quantity <= 0) {
            toast.success("Item deleted due to zero quantity", {
                icon: '✔',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
            removeItem(id);
        } else {
            updateItemQuantity(id, quantity);
        }
    };

    const handleDeleteConfirm = () => {
        if (itemToDelete !== null) {
            removeItem(itemToDelete);
            toast.success("Item deleted successfully", {
                icon: '✔',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
            setItemToDelete(null);
            setOpen(false);
        }
    };

    const handleDeleteCancel = () => {
        setItemToDelete(null);
        setOpen(false);
    };

    return (
        <Stack sx={{ justifyContent: "center", alignItems: "center", padding: 2 }}>
            <Stack width="90%">
                <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto", mt: 5 }}>
                    {items.length > 0 ? (
                        <>
                            <Table sx={{ minWidth: 650, bgcolor: rootColors.grey }} aria-label="cart table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product Image</TableCell>
                                        <TableCell>Product Name</TableCell>
                                        <TableCell>Product Price</TableCell>
                                        <TableCell>Qty</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <Link to={`/products/${item.id}`}>
                                                    <img src={item.image} alt={item.title} style={{ width: 50, height: 50 }} />
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link style={{ textDecoration: "none", color: rootColors.text }} to={`/products/${item.id}`}>
                                                    {item.title}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                ₹ <CurrencyConverter amount={item.price * item.quantity} />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => handleQuantityChange(item.id, item.quantity - 1)} aria-label="decrease quantity">
                                                    -
                                                </IconButton>
                                                {item.quantity}
                                                <IconButton onClick={() => handleQuantityChange(item.id, item.quantity + 1)} aria-label="increase quantity">
                                                    +
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => handleDeleteClick(item.id)} aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Typography variant="h6" sx={{ padding: "10px 20px", bgcolor: rootColors.grey }}>
                                Total: ₹ <CurrencyConverter amount={cartTotal} />
                            </Typography>
                            <Dialog
                                open={open}
                                onClose={handleDeleteCancel}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    Confirm Delete
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Are you sure you want to delete this item from your cart?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleDeleteCancel} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
                                        Delete
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </>
                    ) : (
                        <Typography variant="h6" sx={{ padding: 2, textAlign: 'center', bgcolor: rootColors.grey }}>
                            Your cart is currently empty.
                        </Typography>
                    )}
                </TableContainer>
                <Stack
                    sx={{
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "space-between",
                        marginTop: "16px",
                        gap: { xs: "10px", md: 0 },
                    }}
                >
                    <Button variant="contained" onClick={() => window.location.href = "/"}>Continue Shopping</Button>
                    <Button variant="contained" color="primary">
                        Proceed to Checkout
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default Cart;
