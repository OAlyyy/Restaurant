import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// Step number #1 Change Logo Img
import foody from "../assets/images/foody.png";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useState } from "react";
import { useSelector } from "react-redux";
import { cartProducts } from "../store/cart/cartSlice";
import { totalPrice } from "./ProductSummaryCard";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  background: "black",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const cookies = new Cookies();
  const jwtToken = cookies.get("jwt_authorization");
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  const cart = useSelector(cartProducts);
  const logout = () => {
    cookies.remove("jwt_authorization");
    setAuthState({ username: "", id: 0, status: false });
    navigate("/login");
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }} className="Header">
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              mr: 2,
              ...(open && { display: "none" }),
              width: "40px",
              minWidth: "40px",
              borderRadius: "0 10px 10px 0",
            }}
          >
            <MenuIcon />
          </IconButton>

          <div
            className="logo"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <Link to="/">
              <img src={foody} alt="logo" className="logo" />
            </Link>
          </div>

          {jwtToken ? (
            <>
              <Link to="/orders" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>Orders</Link>

            </>
          ) : (
            <Link className="price-cart-icon" to="/cart">
              <div className="price">
                {cart
                  .reduce((acc, product) => acc + totalPrice(product), 0)
                  .toFixed(2)}{" "}
                €
              </div>

              <div className="cart-icon-container">
                <ShoppingCartCheckoutIcon
                  alt="ShoppingCartCheckoutIcon"
                  fontSize="large" 
                  className="cart-icon"
                />
              </div>
            </Link>
          )}
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
      </Main>
      <Drawer
        sx={{
          width: 1,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/">
              <ListItemText
                primary="Home"
                primaryTypographyProps={{ color: "textPrimary" }}
                secondaryTypographyProps={{ color: "textPrimary" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/menu">
              <ListItemText
                primary="Menu"
                primaryTypographyProps={{ color: "textPrimary" }}
                secondaryTypographyProps={{ color: "textPrimary" }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/cart">
              <ListItemText
                primary={`${cart
                  .reduce((acc, product) => acc + totalPrice(product), 0)
                  .toFixed(2)} $`}
                secondary="View your cart"
                primaryTypographyProps={{ color: "textPrimary" }}
                secondaryTypographyProps={{ color: "textPrimary" }}
              />
              <ListItemIcon>
              <ShoppingCartCheckoutIcon
                  alt="ShoppingCartCheckoutIcon"
                  fontSize="large" 
                />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>

        <Divider />

        {jwtToken ? (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/Admin">
                <ListItemText
                  primary="Admin"
                  primaryTypographyProps={{ color: "textPrimary" }}
                  secondaryTypographyProps={{ color: "textPrimary" }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={logout}>
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{ color: "textPrimary" }}
                  secondaryTypographyProps={{ color: "textPrimary" }}
                />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/login">
              <ListItemText
                primary="Log In"
                secondary="Administration Only"
                primaryTypographyProps={{ color: "textPrimary" }}
                secondaryTypographyProps={{ color: "textPrimary" }}
              />
            </ListItemButton>
          </ListItem>
        )}

        <Divider />

        <div className="contact-list mb-30">
          <ul>
            <li>
              <i className="fas fa-map-marker-alt"></i>66 Broklyn Street, New
              York United States of America
            </li>
            <li>
              <i className="fas fa-phone"></i>
              <Link>
                <a href="tel:+1166442200">+11 66 44 22 00</a>
              </Link>
            </li>
          </ul>
        </div>
      </Drawer>
    </Box>
  );
}
