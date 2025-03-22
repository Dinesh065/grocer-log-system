import { AppBar, Toolbar, IconButton, Tooltip, Typography, Menu, MenuItem } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import SalesIcon from "@mui/icons-material/ReceiptLong";
import CreditIcon from "@mui/icons-material/CreditCard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export default function Navbar() {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [activeHover, setActiveHover] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const location = useLocation();

  const handleMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const menuItems = [
    { label: "Dashboard", icon: <DashboardIcon />, color: "#388e3c", path: "/" },
    { label: "Inventory", icon: <InventoryIcon />, color: "#ff5722", path: "/inventory" },
    { label: "Sales Log", icon: <SalesIcon />, color: "#673ab7", path: "/sales" },
    { label: "Credits", icon: <CreditIcon />, color: "#FF9800", path: "/credits" },
    { label: "Profile", icon: <AccountCircleIcon />, color: "#FF5722", path: "/profile" },
    { label: "Logout", icon: <LogoutIcon />, color: "#f44336", path: "/logout" },
  ];

  return (
    <AppBar
      position="sticky"
      style={{
        backgroundColor: "rgba(5, 10, 20, 1)",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Toolbar style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo and Name */}
        <div style={{ display: "flex", alignItems: "center", color: "#1976d2", cursor: "default" }}>
          <ShoppingCartIcon />
          <Typography variant="h6" sx={{ fontWeight: "bold", marginLeft: "5px" }}>
            Grocer's Log System
          </Typography>
        </div>

        {/* Desktop Options */}
        <div className="desktop-options" style={{ display: "flex", gap: "20px" }}>
          {menuItems.map((item) => (
            <Link key={item.label} to={item.path} style={{ textDecoration: "none", color: "inherit" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  gap: "8px",
                  padding: "5px 10px",
                }}
                onMouseEnter={() => setActiveHover(item.label)}
                onMouseLeave={() => setActiveHover(null)}
              >
                <IconButton style={{ color: item.color }}>{item.icon}</IconButton>
                <Typography variant="caption" sx={{ color: "white" }}>
                  {item.label}
                </Typography>

                {/* Active Page Indication */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "-8px",
                    left: "55%",
                    width: "110px",
                    height: "3px",
                    backgroundColor: "purple",
                    transformOrigin: "center",
                    transform: activeHover === item.label || location.pathname === item.path
                      ? "translateX(-50%) scaleX(1)"
                      : "translateX(-50%) scaleX(0)",
                    transition: "transform 0.3s ease-in-out",
                  }}
                ></div>

              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Icon */}
        <div className="mobile-menu" style={{ display: "none" }}>
          <IconButton onClick={handleMenuOpen} style={{ color: "white" }}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={mobileMenuAnchor}
            open={Boolean(mobileMenuAnchor)}
            onClose={handleMenuClose}
            PaperProps={{
              style: { backgroundColor: "#1b1b1b", color: "white", minWidth: "200px" },
            }}
          >
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                component={Link}
                to={item.path}
                onClick={handleMenuClose}
                style={{ display: "flex", alignItems: "center", gap: "10px", color: item.color }}
              >
                {item.icon}
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </div>

        {/* CSS Animation for Line */}
        <style>
          {`
           @media (max-width: 1000px) {
            .desktop-options {
              display: none !important;
            }
            .mobile-menu {
              display: block !important;
            }
          }

          @media (min-width: 1000px) {
            .desktop-options {
              display: flex !important;
            }
            .mobile-menu {
              display: none !important;
            }
          }
          `}
        </style>
      </Toolbar>
    </AppBar>
  );
}
