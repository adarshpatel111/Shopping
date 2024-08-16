import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { rootColors } from '../../Utilities/rootColors';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOGINUSERDATA, LOGINUSERTOKEN } from '../../Utilities/ReduxConstants/SigninConstans';
import { useEffect } from 'react';

import AssignmentIcon from '@mui/icons-material/Assignment';



export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.login.user)

    // console.log(user);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMyAccount = () => {
        navigate('/myaccount')
        handleClose();
    }
    const handleOrders = () => {
        navigate('/orders')
        handleClose();
    }
    const handleLogout = () => {
        handleClose();
        localStorage.removeItem('token'); // Remove token from localStorage
        localStorage.removeItem('user');  // Remove user data from localStorage
        dispatch({ type: LOGINUSERTOKEN, payload: null });
        dispatch({ type: LOGINUSERDATA, payload: null }); // Clear user data from Redux store
        navigate('/'); // Redirect to login page
    };


    useEffect(() => {
        // Retrieve user data from localStorage
        const userData = localStorage.getItem('user');

        if (userData) {
            // Parse and set user data
            dispatch({ type: LOGINUSERDATA, payload: JSON.parse(userData) })
        }
    }, []);

    // console.log("user by loacl", localStorage.getItem('user'));

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>
                            {
                                user.firstName === "Super" ? user?.lastName?.split("")[0] : user?.firstName?.split("")[0] + user?.lastName?.split("")[0]
                            }
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        bgcolor: rootColors.primary,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: rootColors.primary,
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar />
                    {
                        `Hi ${user.firstName}  ${user.lastName}`
                    }
                </MenuItem>
                <MenuItem onClick={handleMyAccount}>
                    <Avatar /> My account
                </MenuItem>
                <Divider />
                {
                    user.email === "superadmin9090@gmail.com" ?
                        <MenuItem onClick={handleOrders}>
                            <ListItemIcon>
                                <AssignmentIcon fontSize="small" />
                            </ListItemIcon>
                            Orders
                        </MenuItem>
                        : null
                }
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
