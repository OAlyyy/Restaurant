import foody from "../assets/images/foody.png";
import cartIcon from "../assets/icons/cart.svg";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useState } from "react";
import { useSelector } from "react-redux";
import { cartProducts } from "../store/cart/cartSlice";
import { totalPrice } from "./ProductSummaryCard";

export const Header = () => {
  const cookies = new Cookies();
    // eslint-disable-next-line
  const jwtToken = cookies.get("jwt_authorization");
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  const cart = useSelector(cartProducts);
    // eslint-disable-next-line
  const logout = () => {
    cookies.remove("jwt_authorization");
    setAuthState({ username: "", id: 0, status: false });
    navigate("/login");
  };

  return (
    <nav id="header" className="navbar">
      <Link className="price-cart-icon" to="/cart">
        <div className="price">
          {cart
            .reduce((acc, product) => acc + totalPrice(product), 0)
            .toFixed(2)}{" "}
          €
        </div>
        <div className="cart-icon-container">
          <img src={cartIcon} alt="cart" className="cart-icon" />
        </div>
      </Link>

      <div className="logo">
        <Link to="/">
          <img src={foody} alt="logo" className="logo" />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
