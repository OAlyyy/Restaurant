import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectAllProducts } from "../store/Menu/productSlice";
import ProductDetailCard from "../components/ProductDetailCard.jsx";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { addToCart } from "../store/cart/cartSlice";
import Fab from "@mui/material/Fab";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import SvgIcon from '@mui/material/SvgIcon';
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  console.log("menuu 00000000000", products);
  const [activeTabIndex, setActiveTabIndex] = useState(1);
  const navigate = useNavigate();





  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const onAddProduct = (product) => (event) => {
    console.log(
      "menuu productproductproduct----------------------- :",
      product
    );
    dispatch(addToCart(product));
  };

  const onTabSwitch = (event, activeTabIndex) => {
    setActiveTabIndex(activeTabIndex);
  };

  const filteredProducts = products.products.filter((product) => {
    switch (activeTabIndex) {
      case 0:
        return true;
      case 1:
        return product.type === 1;
      case 2:
        return product.type === 2;
      case 3:
        return product.type === 3;
      case 4:
        return product.type === 4;
      default:
        return false;
    }
  });
  console.log("filteredProducts => ", filteredProducts);


  const cartMenuButton= ()=>{
  navigate("/cart");
  }




  return (
    <div className="menuPage">
      {products.status !== "fulfilled" ? (
        <div>loading...</div>
      ) : (
        <div className="menu-wrapper">
          {products.products.length > 0 && products.products && (
            <Tabs
              value={activeTabIndex}
              onChange={onTabSwitch}
              textColor="primary"
              indicatorColor="secondary"
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable auto tabs example"
              style={{
                position: "fixed",
                top: "98px",
                backgroundColor: "pink",
              }}
            >
              <Tab label="Breakfast" value={1} />
              <Tab label="Lunch" value={2} />
              <Tab label="Dinner" value={3} />
              <Tab label="Drinks" value={4} />
            </Tabs>
          )}
          <div className="products-container">
            {products.products.length > 0 &&
              filteredProducts.map((product, index) => {
                return (
                  <ProductDetailCard
                    key={index}
                    product={product}
                    onAddProduct={onAddProduct}
                  />
                );
              })}
          </div>
        </div>
      )}

<div className="fab-container" onClick={cartMenuButton}>
        <Fab size="small" color="secondary" aria-label="add">
          <SvgIcon  fontSize="large" component={ShoppingCartCheckoutIcon} alt="cart" className="cart-icon" />
        </Fab></div>
     
    </div>
  );
};

export default Menu;
