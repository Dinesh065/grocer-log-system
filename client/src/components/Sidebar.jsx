import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import SalesIcon from "@mui/icons-material/AttachMoney";
import CreditIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleResponsiveMenuOpen = (event) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleResponsiveMenuClose = () => {
        setMenuAnchor(null);
    };

    return (
        <AppBar
            position="sticky"
            style={{
                backgroundColor: "bisque",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            }}
        >
            <Toolbar>
                {/* Grocery Log */}
                <Tooltip title="Landing Page" arrow>
                    <IconButton
                        component={Link}
                        to="/landingpage"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            color: "#1976d2",
                        }}
                    >
                        <ShoppingCartIcon />
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", marginLeft: "5px" }}
                        >
                            Grocery Log
                        </Typography>
                    </IconButton>
                </Tooltip>

                {/* Spacer */}
                <div style={{ flexGrow: 1 }}></div>

                {/* Menu for screen width < 500px */}
                {window.innerWidth <= 500 ? (
                    <Tooltip title="Menu" arrow>
                        <IconButton
                            style={{ color: "#1976d2" }}
                            onClick={handleResponsiveMenuOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    // Icons for larger screens
                    <div className="desktop-options">
                        <Tooltip title="Dashboard" arrow>
                            <IconButton
                                component={Link}
                                to="/"
                                style={{ color: "#388e3c" }}
                            >
                                <DashboardIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Inventory" arrow>
                            <IconButton
                                component={Link}
                                to="/inventory"
                                style={{ color: "#ff5722" }}
                            >
                                <InventoryIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Sales Log" arrow>
                            <IconButton
                                component={Link}
                                to="/sales"
                                style={{ color: "#673ab7" }}
                            >
                                <SalesIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Credits" arrow>
                            <IconButton
                                component={Link}
                                to="/credits"
                                style={{ color: "#FF9800" }}
                            >
                                <CreditIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                )}

                {/* Profile and Logout */}
                <div>
                    <Tooltip title="Profile" arrow>
                        <IconButton
                            component={Link}
                            to="/profile"
                            style={{
                                color: "#FF5722",
                                marginRight: "10px",
                            }}
                        >
                            <AccountCircleIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Logout" arrow>
                        <IconButton
                            component={Link}
                            to="/logout"
                            style={{
                                color: "#f44336",
                            }}
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                </div>

                {/* Responsive Menu Options */}
                <Menu
                    anchorEl={menuAnchor}
                    open={Boolean(menuAnchor)}
                    onClose={handleResponsiveMenuClose}
                >
                    <MenuItem
                        component={Link}
                        to="/"
                        onClick={handleResponsiveMenuClose}
                    >
                        <DashboardIcon style={{ color: "#388e3c", marginRight: "10px" }} />
                        Dashboard
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        to="/inventory"
                        onClick={handleResponsiveMenuClose}
                    >
                        <InventoryIcon style={{ color: "#ff5722", marginRight: "10px" }} />
                        Inventory
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        to="/sales"
                        onClick={handleResponsiveMenuClose}
                    >
                        <SalesIcon style={{ color: "#673ab7", marginRight: "10px" }} />
                        Sales Log
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        to="/credits"
                        onClick={handleResponsiveMenuClose}
                    >
                        <CreditIcon style={{ color: "#FF9800", marginRight: "10px" }} />
                        Credits
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
