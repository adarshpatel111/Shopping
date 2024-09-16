import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { rootColors } from '../../Utilities/rootColors';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast'; // Import react-hot-toast components
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGINDATA, LOGINUSERDATA, LOGINUSERTOKEN } from '../../Utilities/ReduxConstants/SigninConstans';

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

export default function SignIn() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [remember, setRemember] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validate form fields
        if (!email || !password) {
            toast.error('Email and Password are required.');
            return;
        }

        if (!remember) {
            toast.error('You must agree to remember me.');
            return;
        }

        try {
            const response = await axios.post(`${backendUrl}/user/login`, {
                email,
                password,
                remember,
            }, {
                withCredentials: true // Ensure cookies are sent and received
            });
            dispatch({ type: LOGINDATA, payload: response.data.user })
            dispatch({ type: LOGINUSERTOKEN, payload: response.data.token.access_token })
            // set localstorage token
            if (response.data.token) {
                localStorage.setItem('_token_', response.data.token.access_token);
                navigate('/');

            }
            if (response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                dispatch({ type: LOGINUSERDATA, payload: response.data.user })

            }

            toast.success('Login successful!'); // Show success toast

            // Clear form fields after successful login
            setEmail('');
            setPassword('');
            setRemember(false); // Reset checkbox
        } catch (error) {
            console.error('Login error:', error);

            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || 'An error occurred'); // Show error toast
            } else {
                toast.error('An unknown error occurred'); // Show error toast
            }
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage:
                        'url("https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'left',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} sx={{ bgcolor: rootColors.primary }}>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                    value="remember"
                                    color="primary"
                                />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
            <Toaster /> {/* Add this to render the toast notifications */}
        </Grid>
    );
}
