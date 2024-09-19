import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function ChangePassword() {
    const user = useSelector((state: any) => state.login.user); // Move useSelector here
    const userId = user?.email; // Get user ID from state

    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [retypeNewPassword, setRetypeNewPassword] = React.useState('');
    const [showOldPassword, setShowOldPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showRetypeNewPassword, setShowRetypeNewPassword] = React.useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!userId) {
            toast.error('User ID not found. Please log in again.');
            return;
        }

        if (!oldPassword || !newPassword || !retypeNewPassword) {
            toast.error('All fields are required.');
            return;
        }

        if (newPassword !== retypeNewPassword) {
            toast.error('New password and retype password must match.');
            return;
        }

        try {
            const response = await axios.post(`${backendUrl}/user/change-password`, {
                email: userId,
                oldPassword: oldPassword,
                newPassword: newPassword,
            });
            toast.success(response.data.message);
            setOldPassword('');
            setNewPassword('');
            setRetypeNewPassword('');
        } catch (error) {
            console.error('Error changing password:', error);
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }} justifyContent="center" alignItems="center">
            <CssBaseline />
            <Grid item xs={12} sm={6} md={4} component={Paper} elevation={6}>
                <Box
                    sx={{
                        my: 2,
                        mx: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Change Password
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="oldPassword"
                            label="Old Password"
                            type={showOldPassword ? 'text' : 'password'}
                            id="oldPassword"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        aria-label="toggle old password visibility"
                                        onClick={() => setShowOldPassword(!showOldPassword)}
                                        edge="end"
                                    >
                                        {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                ),
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="newPassword"
                            label="New Password"
                            type={showNewPassword ? 'text' : 'password'}
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        aria-label="toggle new password visibility"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        edge="end"
                                    >
                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                ),
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="retypeNewPassword"
                            label="Retype New Password"
                            type={showRetypeNewPassword ? 'text' : 'password'}
                            id="retypeNewPassword"
                            value={retypeNewPassword}
                            onChange={(e) => setRetypeNewPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        aria-label="toggle retype new password visibility"
                                        onClick={() => setShowRetypeNewPassword(!showRetypeNewPassword)}
                                        edge="end"
                                    >
                                        {showRetypeNewPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                ),
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Update Password
                        </Button>
                    </Box>
                </Box>
            </Grid>
            <Toaster /> {/* Add this to render the toast notifications */}
        </Grid>
    );
}
