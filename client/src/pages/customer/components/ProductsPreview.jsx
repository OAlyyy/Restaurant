import React, { useState, useEffect } from "react";
import { ProductPreviewCard } from "./ProductPreviewCard.jsx";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/cart/cartSlice.js";
import { fetchProducts } from '../../../firebase.js';



export const ProductsPreview = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

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

  console.log('products products products:', products);

  // useEffect(() => {
  //   axios
  //     .get("https://us-central1-restaurant-12b3e.cloudfunctions.net/apiHandler/product")
  //     .then((response) => {
  //       setProducts(response.data);
  //     })
  //     .catch((e) => console.log(e));
  // }, []);


  const onAddProduct = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="carouselParent">
      <div className="aboveCarouselTitle">Popular Products</div>
      <div className="carousel-container">
        <Carousel responsive={responsive} infinite={false}>
          {Array.isArray(products) &&
            products.length > 0 &&
            products.map((product, index) => {
              return (
                <div key={product.id}>
                  <ProductPreviewCard
                    key={index}
                    product={product}
                    onAddProduct={onAddProduct}
                  />
                </div>
              );
            })}
        </Carousel>
      </div>
    </div>
  );
};
