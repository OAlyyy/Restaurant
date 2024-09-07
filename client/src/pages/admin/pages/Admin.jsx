import React, { useState, useEffect } from "react";
import AddProductForm from "../components/AddProductForm.jsx";
import { ProductEditCard } from "../components/ProductsEditCard.jsx";
import "react-multi-carousel/lib/styles.css";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import {
  createProduct,
  fetchProducts,
  removeProduct,
  editProduct,
} from "../../../firebase.js";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Css/Admin.css";
import Orders from "./Orders";
import Dashboard from "./Dashboard";

function Admin() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(null);
  const [products, setProducts] = useState([]);
  const [visibleSection, setVisibleSection] = useState("orders");
  const [imageError, setImageError] = useState(false);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleImageError = () => {
    // Set image error state to true when image fails to load
    setImageError(true);
  };

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

  const confirmRemoveProduct = () => {
    if (productToDelete) {
      RemoveProduct(productToDelete.documentId);
      setProductToDelete(null);
    }
  };

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

  const toggleAddProductForm = () => {
    setShowAddProductForm((prevState) => !prevState);
  };

  const toggleshowEditProduct = () => {
    console.log("a7aaaaaaaaaaaaaaaaaa");
    setShowEditProduct((prevState) => !prevState);
  };

  return (
    <div className="adminPage">
      {showAlert && (
        <Stack className="stack" spacing={2}>
          <Alert severity="success">Product added Successfully!</Alert>
        </Stack>
      )}

      <div className="sidebar">
        <div className="sidebar-title">Admin</div>

        <div
          className={`sidebar-item ${
            visibleSection === "orders" ? "active" : ""
          }`}
          onClick={() => setVisibleSection("orders")}
        >
          Orders
        </div>

        <div
          className={`sidebar-item ${
            visibleSection === "products" ? "active" : ""
          }`}
          onClick={() => setVisibleSection("products")}
        >
          {" "}
          Menu{" "}
        </div>

        <div
          className={`sidebar-item ${
            visibleSection === "dashboard" ? "active" : ""
          }`}
          onClick={() => setVisibleSection("dashboard")}
        >
          Dashboard
        </div>
      </div>

      <div className="main-content">
        {visibleSection === "products" && (
          <div className="productList">
            <div className="titleAndButton">
              <div className="productListTitle"></div>
              <button className="addPBttn" onClick={toggleAddProductForm}>
                Add Product
              </button>
            </div>
            {showAddProductForm && <AddProductForm onSubmit={onSubmit} />}

            {products.map((product) => (
              <div className="productItem" key={product.documentId}>
                <img
                  src={
                    imageError
                      ? "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=2742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      : product.imageUrl
                  }
                  alt={product.name}
                  onError={handleImageError}
                  className="productImage"
                />
                <div className="productName">{product.name}</div>
                <div className="productPrice">€{product.price}</div>

                <EditIcon
                  className="editButton"
                  onClick={toggleshowEditProduct}
                />
                {showEditProduct && (
                  <ProductEditCard
                    key={product.documentId}
                    product={product}
                    onEditProduct={EditProduct}
                  />
                )}
                <DeleteIcon
                  className="deleteButton"
                  onClick={() => setProductToDelete(product)}
                />
              </div>
            ))}
          </div>
        )}

        {visibleSection === "orders" && (
          <div>
            <Orders />
          </div>
        )}

        {visibleSection === "dashboard" && (
          <div>
            <Dashboard />
          </div>
        )}
      </div>

      <Dialog
        open={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        aria-labelledby="confirm-delete-title"
        aria-describedby="confirm-delete-description"
      >
        <DialogTitle id="confirm-delete-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-delete-description">
            Are you sure you want to delete the product "{productToDelete?.name}
            "?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProductToDelete(null)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmRemoveProduct} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Admin;
