import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast'; // Import react-hot-toast components

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                Adarsh Patel
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignUp() {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isChecked, setIsChecked] = React.useState(false); // Checkbox state
    const [isSubmitted, setIsSubmitted] = React.useState(false); // Form submission state
    const [showPassword, setShowPassword] = React.useState(false); // Password visibility state

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitted(true); // Set to true to display validation errors

        // Basic client-side validation
        if (!firstName || !lastName || !email || !password || !isChecked) {
            toast.error('All fields are required and you must agree to receive emails.');
            return;
        }

        try {
            await axios.post(`${backendUrl}/user/signup`, {
                firstName,
                lastName,
                email,
                password,
            });
            toast.success('Signup successful! You can now sign in.'); // Show success toast

            // Clear form fields after successful signup
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setIsChecked(false);
            setIsSubmitted(false); // Reset form submission state
        } catch (error) {
            console.error('Signup error:', error);

            // Show error toast message
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || 'An error occurred');
            } else {
                toast.error('An unknown error occurred');
            }
            setIsSubmitted(false); // Reset form submission state on error
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                error={isSubmitted && !firstName}
                                helperText={isSubmitted && !firstName ? 'First Name is required' : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                error={isSubmitted && !lastName}
                                helperText={isSubmitted && !lastName ? 'Last Name is required' : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={isSubmitted && !email}
                                helperText={isSubmitted && !email ? 'Email Address is required' : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={isSubmitted && !password}
                                helperText={isSubmitted && !password ? 'Password is required' : ''}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} color="primary" />}
                                label="I want to receive inspiration, marketing promotions, and updates via email."
                            />
                            {isSubmitted && !isChecked && (
                                <Typography color="error">You must agree to receive emails.</Typography>
                            )}
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
            <Toaster /> {/* Add this to render the toast notifications */}
        </Container>
    );
}
