import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProductRemoveCard } from "./ProductRemoveCard.jsx";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  categoryId: "",
  description: "",
  price: "",
  imageUrl: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Product name is required"),
  categoryId: Yup.string().required("Product categoryId is required"),
  description: Yup.string().required("Product description is required"),
  price: Yup.number().required("Product price is required"),
  imageUrl: Yup.string().url("Invalid URL"),
});

function Admin() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  useEffect(
    () => {
      if (!cookies.get("jwt_authorization")) {
        navigate("/login");
      }
    }, // eslint-disable-next-line
    []
  );

  const [showAlert, setShowAlert] = useState(null);
  const [products, setProducts] = useState([]);
    // eslint-disable-next-line
    const [categoryTypes, setCategoryTypes] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:3001/product")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((e) => console.log(e));
  }, []);
  useEffect(() => {
    
    axios.get("http://localhost:3001/product/categories")
    .then((response) => {
      setCategoryTypes(response.data);
    })
    .catch((e) => console.log(e));
}, []);
console.log(categoryTypes)


  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/product/add", data)
      .then((response) => {
        setShowAlert(true);
      })
      .catch((error) => {
        console.log(error);
        setShowAlert(false);
      });
  };

  const RemoveProduct = (productId) => {
    axios
      .delete(`http://localhost:3001/product/${productId}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== productId));
      })
      .catch((error) => {
        console.log(error);
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


  return (
    <>
      <div className="addingNewProdct">
        {showAlert && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">Product added Successfully!</Alert>
          </Stack>
        )}
        <div className="addingNewProdcttitle">
          Fill Form to add a new Product
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer">
            <label>Name:</label>
            <ErrorMessage name="name" component="span" style={{ color: 'red' }} />
            <Field
              id="AddingProduct"
              name="name"
              placeholder="(Ex. Burger, Pizza ...)"
            />
            <label htmlFor="type">Category:</label>
            <ErrorMessage name="categoryId" component="span" style={{ color: 'red' }} />
            <Field name="categoryId" as="select" id="AddingProduct">
              <option value="">Select a category</option>
              {categoryTypes.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.type}
                </option>
              ))}
            </Field>

            <label> Description:</label>
            <ErrorMessage name="description"  component="span" style={{ color: 'red' }}/>
            <Field
              id="AddingProduct"
              name="description"
              placeholder="Components for Ex. Rice, Macaroni ..."
            />

            <label> Price:</label>
            <ErrorMessage name="price" component="span" style={{ color: 'red' }}/>
            <Field id="AddingProduct" name="price" placeholder=" € " />

            
            {/* Divider */} <hr />
            <label className="attachment-label"> Picture Url in Cloud:</label>
             <div className="urlExample">Url Ex. https://drive.google.com/uc?id= "put id here"</div>
            <ErrorMessage name="imageUrl" component="span" style={{ color: 'red' }} />
            <Field
              id="AddingProduct"
              name="imageUrl"
              placeholder="(https://photo.com)"
            />
            {/* <label> Or Upload Product Picture</label>
            <input type="file" name="photo" accept="image/*" /> */}
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
