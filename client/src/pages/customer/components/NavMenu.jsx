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
// Step number #1 Change Logo Img    CC8721 dedede
// import foody from "../assets/images/omarfoodlogo.png";
import"./Css/header.css"
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useState } from "react";
import { useSelector } from "react-redux";
import { cartProducts } from "../../../store/cart/cartSlice";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import { totalProductPrice } from './ProductSummaryCard'; 



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
  background: "white",
  boxShadow: "none",
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
  // Get the Firebase Authentication token
  // eslint-disable-next-line
  const currentUser = auth.currentUser;
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

  const logout = async () => {
    try {
      await signOut(auth);
      cookies.remove("jwt_authorization");
      setAuthState({ username: "", id: 0, status: false });
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const cartTotalPrice = parseFloat(cart.reduce((total, product) => total + totalProductPrice(product), 0).toFixed(2));


  return (
    <Box sx={{ display: "flex" }} className="Header">
      <CssBaseline />
      <AppBar position="fixed" open={open} >
        <Toolbar>
          <IconButton
            color="black"
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
            {/* <Link to="/">
              <img src={foody} alt="logo" className="logo" />
            </Link> */}

            Pizzeria Omar
          </div>

          {jwtToken ? (
            <>
              <Link
                to="/orders"
                style={{
                  color: "black",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Orders
              </Link>
            </>
          ) : (
            <Link className="price-cart-icon" to="/cart">
              <div className="price">
              €{cartTotalPrice.toFixed(2)}
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
            backgroundColor:"white"
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
                primary="Menu"
                primaryTypographyProps={{ color: "black" }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>

            <ListItemButton component={Link} to="/cart">
              <ListItemText
                primary={`€${cartTotalPrice.toFixed(2)}`}  
                secondary="View your cart"
                primaryTypographyProps={{ color: "black" }}
                secondaryTypographyProps={{ color: "black" }}
              />
              <ListItemIcon>
                <ShoppingCartCheckoutIcon
                  alt="ShoppingCartCheckoutIcon"
                  fontSize="large"
                  sx={{ color: "black" }}
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
                  primaryTypographyProps={{ color: "black" }}
                  secondaryTypographyProps={{ color: "black" }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={logout}>
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{ color: "black" }}
                  secondaryTypographyProps={{ color: "black" }}
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
                primaryTypographyProps={{ color: "black" }}
                secondaryTypographyProps={{ color: "black" }}
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
