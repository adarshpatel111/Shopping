import { useState } from 'react';
import { IconButton, Stack, Typography, Box, Drawer, List, Divider, ListItem, ListItemButton, ListItemText, Badge, Button } from "@mui/material";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { rootColors } from "../../Utilities/rootColors";
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logo from '../../assets/logo.jfif';
import AccountMenu from "../AccountMenu/AccountMenu";
import { useCart } from "react-use-cart";
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const isLogin = useSelector((state: any) => state.login.token);
    const navigate = useNavigate(); // Hook to programmatically navigate
    const { totalItems } = useCart(); // Use the totalItems from react-use-cart

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const handleCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (totalItems === 0) {
            event.preventDefault(); // Prevent navigation
            toast.error("Your cart is empty."); // Show error toast
        } else {
            // Navigate to cart page if items are present
            navigate('/cart');
        }
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {navLinks.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            component={NavLink}
                            to={item.path}
                            sx={{
                                textDecoration: 'none',
                                color: rootColors.text,
                                '&.active': {
                                    color: rootColors.primary, // Active link color
                                    fontWeight: 'bold'
                                },
                                '&:hover': {
                                    color: rootColors.primary, // Adjust hover text color as needed
                                }
                            }}
                        >
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Login'].map((text, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            component={NavLink}
                            to={'/login'}
                            sx={{
                                textDecoration: 'none',
                                color: rootColors.text,
                                '&.active': {
                                    color: rootColors.primary, // Active link color
                                    fontWeight: 'bold'
                                },
                                '&:hover': {
                                    color: rootColors.primary, // Adjust hover text color as needed
                                }
                            }}
                        >
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Stack component={"nav"}
            sx={{
                flexDirection: { xs: "row-reverse", md: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                boxSizing: "border-box",
                padding: '1rem 2rem',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(15px)',
                top: '0',
                width: '100%',
                position: 'sticky',
                zIndex: 1000
            }}>
            <Stack sx={{ width: '40px', height: '40px', borderRadius: '15%', overflow: 'hidden', cursor: 'pointer' }}>
                <img src={logo} alt="logo" />
            </Stack>
            <Stack sx={{ flexDirection: "row", gap: 3, alignItems: 'center', display: { xs: 'none', md: 'flex' } }}>
                <Stack
                    sx={{
                        flexDirection: "row",
                        gap: "1rem",
                    }}>
                    {navLinks.map((item, idx) => (
                        <Stack key={idx} direction="row" alignItems="center" spacing={1}>
                            {item.title === "Cart" ? (
                                <IconButton
                                    onClick={handleCartClick} // Handle cart click
                                    sx={{
                                        '&:hover': {
                                            color: rootColors.primary, // Adjust hover icon color as needed
                                        },
                                        '&.active': {
                                            color: rootColors.primary, // Active icon color
                                        }
                                    }}
                                >
                                    <Badge badgeContent={totalItems > 0 ? totalItems : null} color="primary">
                                        <ShoppingCartIcon color="action" />
                                    </Badge>
                                </IconButton>
                            ) : (
                                <Typography
                                    component={NavLink}
                                    to={item.path}
                                    sx={{
                                        textDecoration: "none",
                                        color: rootColors.text,
                                        '&.active': {
                                            color: rootColors.red, // Active text color
                                            fontWeight: 'bold'
                                        },
                                        '&:hover': {
                                            color: rootColors.red, // Adjust hover text color as needed
                                        }
                                    }}
                                >
                                    {item.title}
                                </Typography>
                            )}
                        </Stack>
                    ))}
                </Stack>
                <Stack>
                    {isLogin ? (
                        <AccountMenu />
                    ) : (
                        <Button component={Link} variant="outlined" to={'/login'}>
                            Login
                        </Button>
                    )}
                </Stack>
            </Stack>
            <Stack sx={{ display: { xs: 'flex', md: 'none' } }} onClick={toggleDrawer(true)}>
                <IconButton
                    sx={{
                        '&:hover': {
                            color: rootColors.primary, // Adjust hover icon color as needed
                        }
                    }}
                >
                    <MenuIcon />
                </IconButton>
            </Stack>
            <Drawer anchor="left" sx={{ display: { xs: 'flex', md: 'none' } }} open={open} onClose={toggleDrawer(false)}
                PaperProps={{ sx: { bgcolor: rootColors.primary } }}>
                {DrawerList}
            </Drawer>
        </Stack>
    );
};

export default Navbar;

const navLinks = [
    {
        title: "Home",
        path: "/"
    },
    {
        title: "Products",
        path: "/products"
    },
    {
        title: "About Us",
        path: "/about"
    },
    {
        title: "Contact",
        path: "/contact"
    },
    {
        title: "Cart",
        path: "/cart"
    }
];
