import React from 'react';
import { useCart } from 'react-use-cart';
import toast from 'react-hot-toast'; // Import the toast function
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import CurrencyConverter from '../../components/CurrencyConverter/CurrencyConverter'; // Import the CurrencyConverter component
import { rootColors } from '../../Utilities/rootColors';
import { Link } from 'react-router-dom';

export default function ProductCard({ productData }: any) {
    const { addItem, getItem, updateItemQuantity } = useCart();

    const handleAddToCart = () => {
        const existingItem = getItem(productData.id);

        if (existingItem) {
            // If item already exists, update its quantity
            updateItemQuantity(productData.id, existingItem.quantity + 1);
            toast.success(`Updated quantity of ${productData.title} in cart`, {
                icon: '👏',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        } else {
            // Otherwise, add the new item
            addItem({
                id: productData.id,
                title: productData.title,
                price: productData.price,
                image: productData.image,
                quantity: 1
            });
            toast.success(`${productData.title} added to cart`, {
                icon: '👏',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    };

    return (
        <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', bgcolor: rootColors.grey }}>
            <Link to={`/products/${productData._id}`}>
                <CardMedia
                    component="img"
                    alt={productData.title}
                    height="240"
                    image={productData.image}
                />
            </Link>
            <CardContent>
                <Stack spacing={1}>
                    <Typography variant="h6" component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {productData.title.slice(0, 20)}
                    </Typography>
                    {/* CurrencyConverter component for displaying price */}
                    <CurrencyConverter price={productData.price} />
                    {/* <Typography variant="body2" color="text.secondary">
                        {productData.description.slice(0, 50) + "..."}
                    </Typography> */}
                </Stack>
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained">Buy Now</Button>
                <Button size="small" variant="outlined" onClick={handleAddToCart}>
                    Add To Cart
                </Button>
            </CardActions>
        </Card>
    );
}
