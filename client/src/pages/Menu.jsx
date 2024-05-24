import { useLayoutEffect, useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductDetailCard from "../components/ProductDetailCard.jsx";
import { addToCart } from "../store/cart/cartSlice";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from '../firebase';
import './Css/Menu.css'; 
//import './Css/Menu.css'; 


const Menu = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        <Button 
          variant="contained" 
          color="primary" 
          onClick={cartMenuButton}
        >
          View basket
        </Button>
      </div>
    </div>
  );
};

export default Menu;