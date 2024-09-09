import { useLayoutEffect, useState, useRef, useEffect } from "react";
import { cartProducts  } from "../../../store/cart/cartSlice.js";
import { useDispatch,useSelector } from "react-redux";
import ProductDetailCard from "../components/ProductDetailCard.jsx";
import { addToCart } from "../../../store/cart/cartSlice.js";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from '../../../firebase.js';
import './Css/Menu.css'; 
import { totalProductPrice } from '../components/ProductSummaryCard.jsx'; 

const Menu = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const cart = useSelector(cartProducts);

  // Refs for menu sections
  const breakfastRef = useRef(null);
  const lunchRef = useRef(null);
  const dinnerRef = useRef(null);
  const drinksRef = useRef(null);

  useLayoutEffect(() => {
    const fetchProductsData = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };

    fetchProductsData();

    // Scroll to the desired section after the component mounts
    const initialSection = window.location.hash.slice(1); // Get the section from the URL hash
    if (initialSection) {
      const sectionRef = { breakfast: breakfastRef, lunch: lunchRef, dinner: dinnerRef, drinks: drinksRef }[initialSection];
      if (sectionRef && sectionRef.current) {
        scrollToSection(sectionRef);
      }
    }
  }, []);

  const onAddProduct = (product) => {
    console.log("Adding product to cart:", product);
    dispatch(addToCart(product));
  };

  useEffect(() => {
    // Scroll to the desired section after the component mounts
    const initialSection = window.location.hash.slice(1); // Get the section from the URL hash
    if (initialSection) {
      const sectionRef = { breakfast: breakfastRef, lunch: lunchRef, dinner: dinnerRef, drinks: drinksRef }[initialSection];
      if (sectionRef && sectionRef.current) {
        scrollToSection(sectionRef);
      }
    }
  }, []);



  const scrollToSection = (sectionRef) => {
    if (sectionRef.current) {
      const elementPosition = sectionRef.current.getBoundingClientRect().top + window.scrollY; // Get the element's position
      const offset = 110; // Adjust this to match the height of your tabs or header
      window.scrollTo({
        top: elementPosition - offset, // Scroll with an offset to account for the header
        behavior: 'smooth'
      });
    }
  };
  

  const cartTotalPrice = parseFloat(cart.reduce((total, product) => total + totalProductPrice(product), 0).toFixed(2));


  const cartMenuButton = () => {
    navigate("/cart");
  };

  const renderProductsByCategory = (categoryId) => {
    return (
      <div className="product-list">
        {products
          .filter(product => product.categoryId === categoryId)
          .map((product, index) => (
            <ProductDetailCard
              key={index}
              product={product}
              onAddProduct={onAddProduct}
            />
          ))}
      </div>
    );
  };

  

  return (
    <div className="menuPage">
      <div className="tabs-container">
        <div className="tab" onClick={() => scrollToSection(breakfastRef)}>Breakfast</div>
        <div className="tab" onClick={() => scrollToSection(lunchRef)}>Lunch</div>
        <div className="tab" onClick={() => scrollToSection(dinnerRef)}>Dinner</div>
        <div className="tab" onClick={() => scrollToSection(drinksRef)}>Drinks</div>
      </div>

      <div className="products-container">
        <div className="menu-section">
        <div style={{ height: '100px' }} ref={breakfastRef} id="breakfast" className="menu-section-divider"></div>

          <div className="menu-section-category">Breakfast</div>
          {renderProductsByCategory('breakfast')}
        </div>

        <div className="menu-section">
          <div ref={lunchRef} id="lunch" className="menu-section-category">Lunch</div>
          {renderProductsByCategory('lunch')}
        </div>
        
        <div className="menu-section">
          <div ref={dinnerRef} id="dinner" className="menu-section-category">Dinner</div>
          {renderProductsByCategory('dinner')}
        </div>
        <div className="menu-section">
          <div ref={drinksRef} id="drinks" className="menu-section-category">Drinks</div>
          {renderProductsByCategory('drinks')}
        </div>
      </div>

      <div className="button-container">
      {cart.length >= 1 && (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={cartMenuButton}
          className="cart-button"
        >
           <span  style={{color: "#FFA07A" }}>View basket</span>
          <div className="pricee">€ {cartTotalPrice.toFixed(2)}</div>
        </Button>
         )}
      </div>
    </div>
  );
};

export default Menu;