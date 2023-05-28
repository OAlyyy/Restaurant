import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProducts } from "../store/Menu/productSlice";
import ProductDetailCard from "../components/ProductDetailCard.jsx";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { addToCart } from "../store/cart/cartSlice";
import Fab from "@mui/material/Fab";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import SvgIcon from "@mui/material/SvgIcon";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from '../firebase';


const Menu = () => {
  const dispatch = useDispatch();
  // const products = useSelector(selectAllProducts);
  const [products, setProducts] = useState([]);
  const [activeTabIndex, setActiveTabIndex] = useState(1);
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]);
  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };

    fetchProductsData();
  }, []);

  const onAddProduct = (product) => (event) => {
    dispatch(addToCart(product));
  };

  const onTabSwitch = (event, activeTabIndex) => {
    setActiveTabIndex(activeTabIndex);
  };

  console.log("products =>",products)
  // Step number #5 add cases or remove if necessary fort categories
   // Step number #6, line 76, change tabs names if neccessary 
  const filteredProducts = products.filter((product) => {
    const categoryId = product.categoryId;
    switch (activeTabIndex) {
      case 0:
        return true
      case 1:
        return categoryId === "breakfast";
      case 2:
        return categoryId === 2;
      case 3:
        return categoryId === 3;
      case 4:
        return categoryId === 4;
      default:
        return false;
    }
  });
  console.log("filteredProducts",filteredProducts)
  const cartMenuButton = () => {
    navigate("/cart");
  };

  return (
    <div className="menuPage">
    
        <div className="menu-wrapper">
          {products.length > 0 && products && (
            <div className="tabs-container">
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
                width: "100%",
              }}
            >
              <Tab label="Breakfast" value={1} />
              <Tab label="Lunch" value={2} />
              <Tab label="Dinner" value={3} />
              <Tab label="Drinks" value={4} />
            </Tabs>
            </div>
          )}
          
          <div className="products-container">
            {products.length > 0 &&
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
      

      <div className="fab-container" onClick={cartMenuButton}>
        <Fab size="medium" color="secondary" aria-label="add">
          <SvgIcon
            fontSize="large"
            component={ShoppingCartCheckoutIcon}
            alt="cart"
            className="cart-icon"
          />
        </Fab>
      </div>
    </div>
  );
};

export default Menu;
