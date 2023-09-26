import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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

  const onAddProduct = (product) => {
    console.log("Adding product to cart:", product);
    dispatch(addToCart(product));

  };

  const onTabSwitch = (event, activeTabIndex) => {
    setActiveTabIndex(activeTabIndex);
  };

  // Step number #5 add cases or remove if necessary fort categories
   // Step number #6, line 76, change tabs names if neccessary 
   // menu pohotos 250px x 250px
  const filteredProducts = products.filter((product) => {
    const categoryId = product.categoryId;
    switch (activeTabIndex) {
      case 0:
        return true
      case 1:
        return categoryId === "breakfast";
      case 2:
        return categoryId === "lunch";
      case 3:
        return categoryId === "dinner";
      case 4:
        return categoryId === "drinks";
      default:
        return false;
    }
  });

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
                top: "75px",
                backgroundColor: "#FDFDFD",
                width: "100%",
              }}
            >
                  <Tab label="Breakfast" value={1} className="tabItem"/>             
                  <Tab label="Lunch" value={2} className="tabItem"/>       
                  <Tab label="Dinner" value={3} className="tabItem"/>
                  <Tab label="Drinks" value={4} className="tabItem"/>

            </Tabs>
            </div>
          )}
          
          <div className="products-container">
            {products.length > 0 &&
              filteredProducts.map((product, index) => {
                 console.log("onAddProduct",onAddProduct)
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
        <Fab size="medium" style={{ backgroundColor: '#CC8721' }} aria-label="add">
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
