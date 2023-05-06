import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import foody from "../assets/images/foody.png";
import cartIcon from "../assets/icons/cart.svg";
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
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
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
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function PersistentDrawerRight() {
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
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <div className="logo">
            <Link to="/">
              <img src={foody} alt="logo" className="logo" />
            </Link>
          </div>
          <Box sx={{ flexGrow: 1 }} /> {/* Add this line to push the items to the right */}
        
{jwtToken? (
  <>
<Link to="/orders"> Orders </Link>
  </>

) : (
<Link className="price-cart-icon" to="/cart">
            <div className="price">
              {cart
                .reduce((acc, product) => acc + totalPrice(product), 0)
                .toFixed(2)}{" "}
              $
            </div>

            <div className="cart-icon-container">
              <img src={cartIcon} alt="cart" className="cart-icon" />
            </div>
          </Link>

)}
          
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
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
                <img src={cartIcon} alt="cart" className="cart-icon" />
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
      </Drawer>
    </Box>
  );
}
