import { useState, useEffect } from 'react';
import { Typography, Stack } from '@mui/material';

// CurrencyConverter component
const CurrencyConverter = ({ price, baseCurrency = 'USD' }) => {
    const [convertedPrice, setConvertedPrice] = useState(price);
    const [rate, setRate] = useState(60); // Default rate

    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
                const data = await response.json();
                setRate(data.rates['INR']); // Get INR rate from the fetched data
            } catch (error) {
                console.error('Error fetching exchange rate:', error);
            }
        };

        fetchExchangeRate();
    }, [baseCurrency]);

    useEffect(() => {
        setConvertedPrice(price * rate);
    }, [price, rate]);

    return (
        <Stack spacing={1}>
            <Typography variant="body1" color="primary">
                ₹ {(convertedPrice).toFixed(2)}
            </Typography>
        </Stack>
    );
};

export default CurrencyConverter;
