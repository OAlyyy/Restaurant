import { useLayoutEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import ProductDetailCard from "../components/ProductDetailCard.jsx";
import { addToCart } from "../store/cart/cartSlice";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from '../firebase';
import './Css/Menu.css'; 

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

  const scrollToSection = (sectionRef) => {
    if (sectionRef.current) {
      const topPos = sectionRef.current.offsetTop - 70; // Adjusted for fixed header height
      window.scrollTo({
        top: topPos,
        behavior: 'smooth',
      });
    }
  };

  const cartMenuButton = () => {
    navigate("/cart");
  };

  const renderProductsByCategory = (categoryId) => {
    return products
      .filter(product => product.categoryId === categoryId)
      .map((product, index) => (
        <ProductDetailCard
          key={index}
          product={product}
          onAddProduct={onAddProduct}
        />
      ));
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
        <div ref={breakfastRef} className="menu-section">
          <div className="menu-section-category">Breakfast</div>
          {renderProductsByCategory('breakfast')}
        </div>
        <div ref={lunchRef} className="menu-section">
          <div className="menu-section-category" >Lunch</div>
          {renderProductsByCategory('lunch')}
        </div>
        <div ref={dinnerRef} className="menu-section">
          <div className="menu-section-category">Dinner</div>
          {renderProductsByCategory('dinner')}
        </div>
        <div ref={drinksRef} className="menu-section">
          <div className="menu-section-category">Drinks</div>
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
