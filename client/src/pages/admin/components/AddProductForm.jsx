import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Css/addProductForm.css";


const AddProductForm = ({ onSubmit }) => {
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

    //Step number #6
  // eslint-disable-next-line
  const [categoryTypes, setCategoryTypes] = useState([
    "breakfast",
    "lunch",
    "dinner",
    "drinks",
  ]);

  return (
    <div className="addProduct">
      <div className="addProductTitle">Add Product</div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Name:</label>
          <ErrorMessage name="name" component="span" style={{ color: "red" }} />
          <Field name="name" />

          <label htmlFor="categoryId">Category:</label>
          <ErrorMessage name="categoryId" component="span" style={{ color: "red" }} />
          <Field
                  name="categoryId"
                  as="select"
                  style={{ width: "300px" }}
                >
                  <option value="">Select a category</option>
                  {categoryTypes.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </Field>

          <label>Description:</label>
          <ErrorMessage name="description" component="span" style={{ color: "red" }} />
          <Field name="description" />

          <label>Price:</label>
          <ErrorMessage name="price" component="span" style={{ color: "red" }} />
          <Field name="price" type="number" />

          <label>Image URL:</label>
          <ErrorMessage name="imageUrl" component="span" style={{ color: "red" }} />
          <Field name="imageUrl" />

          <button type="submit">Add Product</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddProductForm;
