import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProductRemoveCard } from "./ProductRemoveCard.jsx";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Admin() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/product")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const addProductToDatabase = () => {
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("type", type);
    formData.append("description", description);
    formData.append("attachment", attachment);
    axios
      .post("http://localhost:3001/product/add", formData)
      .then((response) => {
        setProducts([...products, response.data]);
        setProductName("");
        setType("");
        setDescription("");
        setAttachment(null);
      });
  };

  const RemoveProduct = (productId) => {
    axios.delete(`http://localhost:3001/product/${productId}`).then(() => {
      setProducts(products.filter((product) => product.id !== productId));
    });
  };

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

  const productTypes = products.filter((product, index, self) => {
    return index === self.findIndex((p) => p.type === product.type);
  });

  return (
    <div className="loginParent">
      <div className="loginContainer">
        <div>Adding a Product</div>

        <label>Product Name:</label>
        <input
          type="text"
          value={productName}
          onChange={(event) => {
            setProductName(event.target.value);
          }}
        />
        <label>Product Type:</label>
        <select onChange={(event) => setType(event.target.value)}>
          <option value="">Select a type</option>
          {productTypes.map((product) => (
            <option key={product.type} value={product.type}>
              {product.type}
            </option>
          ))}
        </select>

        <label>Product Description:</label>
        <input
          type="text"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />

        <label className="attachment-label">Product Picture:</label>
        <input
          type="file"
          onChange={(event) => {
            setAttachment(event.target.files[0]);
          }}
        />

        <button onClick={addProductToDatabase}>Add</button>

        <div>Removing a Product</div>

        <div className="aboveCarouselTitle">Popular Products</div>
        <div className="carousel-container">
          <Carousel responsive={responsive}>
            {Array.isArray(products) &&
              products.length > 0 &&
              products.map((product, index) => {
                return (
                  <div key={product.id}>
                    <ProductRemoveCard
                      key={index}
                      product={product}
                      RemoveProduct={RemoveProduct}
                    />
                  </div>
                );
              })}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Admin;
