import React from "react";
import { useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./CartIcon.css"
const CartIcon = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const cartItemCount = cartItems.length;

  return (
    <div className="cartIconWrapper">
      <span className="cartIcon">
        <ShoppingCartIcon className="icon" />
        {cartItemCount > 0 && (
          <span className="cartItemCount">{cartItemCount}</span>
        )}
      </span>
    </div>
  );
};

export default CartIcon;
