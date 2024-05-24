import React, { useState, useEffect } from "react";
import { ProductRemoveCard } from "../components/ProductRemoveCard.jsx";
import { ProductEditCard } from "../components/ProductsEditCard.jsx";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import {
  createProduct,
  fetchProducts,
  removeProduct,
  editProduct,
} from "../firebase.js";

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
  const [showAlert, setShowAlert] = useState(null);
  const [products, setProducts] = useState([]);

  //Step number #6
  // eslint-disable-next-line
  const [categoryTypes, setCategoryTypes] = useState([
    "breakfast",
    "lunch",
    "dinner",
    "drinks",
  ]);

  useEffect(
    () => {
      if (!cookies.get("jwt_authorization")) {
        navigate("/login");
      }
    }, // eslint-disable-next-line
    []
  );
  useEffect(() => {
    fetchProducts()
      .then((products) => {
        setProducts(products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const onSubmit = (data) => {
    createProduct(data)
      .then(() => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(null);
        }, 3000); // Adjust the delay (in milliseconds) as needed
      })
      .catch(() => {
        setShowAlert(false);
      });
  };
  console.log(products);

  const RemoveProduct = (documentId) => {
    console.log("Removing product with ID:", documentId);

    removeProduct(documentId)
      .then(() => {
        console.log("Product removed with ID:", documentId);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.documentId !== documentId)
        );
      })
      .catch((error) => {
        console.log("Error removing product:", error);
      });
  };

  const EditProduct = (documentId, field, newData) => {
    editProduct(documentId, { [field]: newData })
      .then(() => {
        window.location.reload();
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
      {showAlert && (
        <Stack
          sx={{
            width: "100%",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          spacing={2}
        >
          <Alert severity="success">Product added Successfully!</Alert>
        </Stack>
      )}

      <div className="addingNewProdct">
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
            <ErrorMessage
              name="name"
              component="span"
              style={{ color: "red" }}
            />
            <Field id="AddingProduct" name="name" placeholder="(Ex. Burger, Pizza ...)" style={{ width: "300px" }} 
            />
            <label htmlFor="type">Category:</label>
            <ErrorMessage
              name="categoryId"
              component="span"
              style={{ color: "red" }}
            />
            <Field  id="AddingProduct" name="categoryId" as="select"    style={{ width: "300px" }} >
              <option value="">Select a category</option>
              {categoryTypes.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Field>
            <label> Description:</label>
            <ErrorMessage
              name="description"
              component="span"
              style={{ color: "red" }}
            />
            <Field
              id="AddingProduct"
              name="description"
              placeholder="Components for Ex. Rice, Macaroni ..."
              style={{ width: "300px" }}
            />
            <label> Price:</label>
            <ErrorMessage
              name="price"
              component="span"
              style={{ color: "red" }}
            />
            <Field id="AddingProduct" name="price" placeholder=" € " />


            <label className="attachment-label"> Picture Url in Cloud:</label>
            <div className="urlExample">
              Url Ex. https://drive.google.com/uc?id= "put id here"
            </div>
            <ErrorMessage
              name="imageUrl"
              component="span"
              style={{ color: "red" }}
            />
            <Field
              id="AddingProduct"
              name="imageUrl"
              placeholder="(https://photo.com)"
              style={{ width: "80%" }}
            />
            <button type="submit">Add</button>
          </Form>
        </Formik>
      </div>

      <div className="carouselParentadmin">
        <div className="aboveCarouselTitleadmin">Edit a Product</div>
        <div className="carousel-containeradmin">
          <Carousel responsive={responsive}>
            {Array.isArray(products) &&
              products.length > 0 &&
              products.map((product, index) => {
                return (
                  <div key={product.documentId}>
                    <ProductEditCard
                      key={index}
                      product={product}
                      onEditProduct={EditProduct}
                    />
                  </div>
                );
              })}
          </Carousel>
        </div>
      </div>
      <div className="carouselParentadmin">
        <div className="aboveCarouselTitleadmin">Delete a Product</div>
        <div className="carousel-containeradmin">
          <Carousel responsive={responsive}>
            {Array.isArray(products) &&
              products.length > 0 &&
              products.map((product) => {
                return (
                  <div key={product.documentId}>
                    <ProductRemoveCard
                      key={product.documentId}
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
