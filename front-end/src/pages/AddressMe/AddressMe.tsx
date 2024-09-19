import { useState } from 'react';
import {
    TextField,
    Grid,
    Button,
    Typography,
    Paper,
    InputAdornment,
    Box,
    FormHelperText
} from '@mui/material';
import { LocationOn, MailOutline, Home, Public } from '@mui/icons-material';
import toast from 'react-hot-toast'; // Import the toast function
import { Toaster } from 'react-hot-toast'; // Import the Toaster component
import { rootColors } from '../../Utilities/rootColors';

// Define a basic mapping of states to countries (this is an example; you should use a complete and accurate mapping)
const stateToCountryMap = {
    "ANDHRA PRADESH": "INDIA",
    "ARUNACHAL PRADESH": "INDIA",
    "ASSAM": "INDIA",
    "BIHAR": "INDIA",
    "CHHATTISGARH": "INDIA",
    "GOA": "INDIA",
    "GUJARAT": "INDIA",
    "HARYANA": "INDIA",
    "HIMACHAL PRADESH": "INDIA",
    "JHARKHAND": "INDIA",
    "KARNATAKA": "INDIA",
    "KERALA": "INDIA",
    "MADHYA PRADESH": "INDIA",
    "MAHARASHTRA": "INDIA",
    "MANIPUR": "INDIA",
    "MEGHALAYA": "INDIA",
    "MIZORAM": "INDIA",
    "NAGALAND": "INDIA",
    "ODISHA": "INDIA",
    "PUNJAB": "INDIA",
    "RAJASTHAN": "INDIA",
    "SIKKIM": "INDIA",
    "TAMIL NADU": "INDIA",
    "TELANGANA": "INDIA",
    "TRIPURA": "INDIA",
    "UTTAR PRADESH": "INDIA",
    "UTTARAKHAND": "INDIA",
    "WEST BENGAL": "INDIA",
    // Add more states and countries as needed
};

// Helper function to convert text to uppercase
const toUpperCase = (str: any) => {
    return str.toUpperCase();
};

const AddressMe = () => {
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        const updatedValue = toUpperCase(value);

        if (name === 'state') {
            const country = stateToCountryMap[updatedValue] || '';
            setAddress({ ...address, [name]: updatedValue, country });

            if (!country) {
                setError('Please provide a valid state name.');
            } else {
                setError('');
            }
        } else {
            setAddress({ ...address, [name]: updatedValue });

            if (name === 'country') {
                setError('');
            }
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const { street, city, state, postalCode, country } = address;

        if (!street || !city || !state || !postalCode || !country) {
            setError('All fields are required.');
            toast.error('All fields are required.');
            return;
        }

        if (error) {
            toast.error('Please fix the errors before submitting.');
            return;
        }
        toast.success('Form submitted successfully!');
    };

    return (
        <Paper
            sx={{
                padding: 3,
                maxWidth: 600,
                margin: 'auto',
                mt: 5,
            }}
        >
            <Typography variant="h6" gutterBottom>
                <LocationOn /> Enter Your Address
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Street"
                            name="street"
                            value={address.street}
                            onChange={handleChange}
                            fullWidth
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Home />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="City"
                            name="city"
                            value={address.city}
                            onChange={handleChange}
                            fullWidth
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocationOn />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="State"
                            name="state"
                            value={address.state}
                            onChange={handleChange}
                            fullWidth
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocationOn />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {error && address.state && (
                            <FormHelperText error>{error}</FormHelperText>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Postal Code"
                            name="postalCode"
                            value={address.postalCode}
                            onChange={handleChange}
                            fullWidth
                            required
                            inputProps={{
                                maxLength: 6, // Limit to 6 characters
                                minLength: 6,
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MailOutline />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Country"
                            name="country"
                            value={address.country}
                            fullWidth
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Public />
                                    </InputAdornment>
                                ),
                            }}
                            disabled
                        />
                    </Grid>
                </Grid>
                <Box mt={2} textAlign="center">
                    <Button
                        variant="contained"
                        sx={{ bgcolor: rootColors.secondary, color: rootColors.text }}
                        type="submit"
                    >
                        Place Order
                    </Button>
                </Box>
            </form>
            <Toaster /> {/* Include Toaster to display toast notifications */}
        </Paper>
    );
};

export default AddressMe;
