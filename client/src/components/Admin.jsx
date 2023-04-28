import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProductRemoveCard } from "./ProductRemoveCard.jsx";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const initialValues = {
  name: "",
  type: "",
  description: "",
  price: "",
  attachment: null,
};

const validationSchema = Yup.object({
  name: Yup.string().required("Product name is required"),
  type: Yup.string().required("Product type is required"),
  description: Yup.string().required("Product description is required"),
  price: Yup.number().required("Product price is required"),
});

 

function Admin() {

  const [showAlert , setShowAlert ] = useState(null);
  const [deleteAlert , setDeleteAlert ] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/product")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/product/add", data).then((response) => {
      setShowAlert(true);
    })
    .catch((error) => {
      console.log(error);
      setShowAlert(false);
    });
};

  const RemoveProduct = (productId) => {
    
    axios.delete(`http://localhost:3001/product/${productId}`).then(() => {
      setDeleteAlert(true);
      setProducts(products.filter((product) => product.id !== productId));
    
    }).catch((error) => {
      console.log(error);
      setDeleteAlert(false);
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
    <>
      <div className="createPostPage">
      {showAlert && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="success">Product added Successfully!</Alert>
        </Stack>
      )}
      {deleteAlert && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="info">Product deleted!</Alert>
        </Stack>
      )} 
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer">
            <label>Product Name:</label>
            <ErrorMessage name="name" component="span" />
            <Field id="AddingProduct"   name="name" placeholder="(Ex. Kosharyy...)"     />
            <label htmlFor="type">Product Type:</label>
            <Field name="type" as="select" id="AddingProduct">
              <option value="">Select a type</option>
              {productTypes.map((product) => (
                <option key={product.type} value={product.type}>
                  {product.type}
                </option>
              ))}
            </Field>

            <label>Product Description:</label>
            <ErrorMessage name="description" component="span" />
            <Field id="AddingProduct" name="description" placeholder="(Ex. Rice,Macaroni, ads, alot of stuf...)"/>

            <label>Product Price:</label>
            <ErrorMessage name="price" component="span" />
            <Field id="AddingProduct" name="price" placeholder="(Ex. 15 $ )" />

            <label className="attachment-label">Product Picture:</label>
            <ErrorMessage name="imageUrl" component="span" />
            <Field id="AddingProduct" name="imageUrl" type="file" />

            <button type="submit">Add</button>
          </Form>
        </Formik>
      </div>

      <div className="carouselParent">
      <div className="aboveCarouselTitle">Click to delete a Product</div>
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
    </>
  );
}

export default Admin;
