// import React, { useState } from "react";
// import "./Cart.css";
// import TextField from "@mui/material/TextField";
// import { useSelector, useDispatch } from "react-redux";
// import { addItemToCart, removeItemFromCart } from "../../actions/cartAction";
// import { Typography } from "@mui/material";
// import Button from "@mui/material/Button";
// import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
// import { Link } from "react-router-dom";
// import MetaData from "../layouts/MataData/MataData";
// // import { useNavigate } from "react-router-dom";
// import { useNavigate} from "react-router-dom";
// import CartItem from "./CartItem";
// import {
//   dispalyMoney,
//   generateDiscountedPrice,
// } from "../DisplayMoney/DisplayMoney";
// const Cart = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { cartItems } = useSelector((state) => state.cart);

//   // new code
//   const [couponCode, setCouponCode] = useState("");
//   const [isFocused, setIsFocused] = useState(false);
//   const [isValid, setIsValid] = useState(true);

//   // new code end

//   const increaseQuantity = (id, quantity, stock) => {
//     const newQty = quantity + 1;
//     if (stock <= quantity) {
//       return;
//     } else {
//       dispatch(addItemToCart(id, newQty));
//     }
//   };

//   const decreaseQuantity = (id, quantity) => {
//     const newQty = quantity - 1;
//     if (1 >= quantity) {
//       return;
//     }

//     dispatch(addItemToCart(id, newQty));
//   };

//   // new code
//   const handleApplyCoupon = () => {
//     // handle apply coupon logic
//     setIsValid(false);
//   };

//   const handleFocus = (event) => {
//     setIsFocused(event.target.value !== "");
//   };

//   // new code end

//   const deleteCartItems = (id) => {
//     dispatch(removeItemFromCart(id));
//   };

//   const checkoutHandler = () => {

//     navigate("/login?redirect=/shipping");
//   };

//   // claculte price after discount
//   let totalPrice = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );
//   let discountedPrice = generateDiscountedPrice(totalPrice);
//   let totalDiscount = totalPrice - discountedPrice;
//   let final = totalPrice - totalDiscount;
//   final = dispalyMoney(final);
//   totalDiscount = dispalyMoney(totalDiscount);
//   totalPrice = dispalyMoney(totalPrice);

//   return (
//     <>
//       <div className="cartPage">
//   <MetaData title="Your Cart" />  
//         <div className="cart_HeaderTop">
//           <div className="headerLeft">
//             <Typography variant="h5" component="h1" className="cartHeading">
//               Shopping Cart
//             </Typography>
//             <Typography variant="body2" className="cartText3">
//               TOTAL ({cartItems.length} item) <b>{final}</b>
//             </Typography>
//           </div>
//           <Typography
//             variant="body2"
//             className="cartText2"
//             onClick={() => navigate("/products")}
//           >
//             Continue Shopping
//           </Typography>
//         </div>

//         <div className="separator_cart2"></div>

//         {cartItems.length === 0 ? (
//           <div className="emptyCartContainer">
//             <RemoveShoppingCartIcon className="cartIcon" />

//             <Typography variant="h5" component="h1" className="cartHeading">
//               Your Shopping Cart is Empty
//             </Typography>
//             <Typography variant="body" className="cartText">
//               Nothin' to see here.
//             </Typography>
//             <Typography variant="body" className="cartText">
//               Let's get shopping!
//             </Typography>
//             <Link to="/products">
//               <Button className="shopNowButton">Shop Now</Button>
//             </Link>
//           </div>
//         ) : (
//           <>
//             <div className="cart_content_wrapper">
//               <div className="cart_left_container">
//                 {cartItems &&
//                   cartItems.map((item) => (
//                     <Link
//                       to="#"
//                       style={{ textDecoration: "none", color: "none" }}
//                     >
//                       <CartItem
//                         key={item.productId}
//                         item={item}
//                         deleteCartItems={deleteCartItems}
//                         decreaseQuantity={decreaseQuantity}
//                         increaseQuantity={increaseQuantity}
//                         length={cartItems.length}
//                         id = {item.productId}
//                       />
//                     </Link>
//                   ))}
//               </div>

//               <div className="separator_cart3"></div>
//               <div className="cart_right_container">
//                 <div className="order_summary">
//                   <h4>
//                     Order Summary &nbsp; ( {cartItems.length}{" "}
//                     {cartItems.length > 1 ? "items" : "item"} )
//                   </h4>
//                   <div className="order_summary_details">
//                     <div className="price order_Summary_Item">
//                       <span>Original Price</span>
//                       {/* ORIGINAL PRICE TOATAL */}
//                       <p>{totalPrice}</p>
//                     </div>

//                     <div className="discount order_Summary_Item">
//                       <span>Discount</span>
//                       <p>
//                         <del>{totalDiscount}</del>
//                       </p>
//                     </div>

//                     <div className="delivery order_Summary_Item">
//                       <span>Delivery</span>
//                       <p>
//                         <b>Free</b>
//                       </p>
//                     </div>

//                     <div className="separator_cart"></div>
//                     <div className="total_price order_Summary_Item">
//                       <div>
//                         <h4>Total Price</h4>

//                         <p
//                           style={{
//                             fontSize: "14px",
//                             marginTop: "-10px",
//                             color: "#414141",
//                           }}
//                         >
//                           (Inclusive of all taxes)
//                         </p>
//                       </div>
//                       <p>
//                         <b>{final}</b>
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="separator"></div>

//                 <div className="coupon-box-wrapper">
//                   <div
//                     className={`coupon-box-content ${
//                       isFocused ? "focused" : ""
//                     }`}
//                   >
//                     <TextField
//                       label="Enter coupon code"
//                       value={couponCode}
//                       onChange={(e) => setCouponCode(e.target.value)}
//                       onFocus={handleFocus}
//                       onBlur={() => setIsFocused(false)}
//                       error={!isValid}
//                       helperText={!isValid && "Invalid coupon code"}
//                       variant="outlined"
//                       size="small"
//                       style={{ width: "200px", marginRight: "1rem" }}
//                     />
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       className="coupon-box-apply-btn"
//                       onClick={handleApplyCoupon}
//                     >
//                       Apply
//                     </Button>
//                   </div>
//                 </div>

//                 <Button
//                   variant="contained"
//                   className="btn-custom"
//                   onClick={checkoutHandler}
//                 >
//                   Checkout
//                 </Button>

//                 <div className="paymentLogoImg">
//                   <img
//                     src="https://res.cloudinary.com/drosmiklv/image/upload/v1739139739/cart_img_ezpceb.png"
//                     alt="payemnt-icons"
//                     className="paymentImg"
//                   />
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default Cart;


import React, { useState } from "react";
import {
  Grid,
  Card,
  Typography,
  Button,
  Divider,
  TextField,
  Box,
  useMediaQuery,
} from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartAction";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layouts/MataData/MataData";
import CartItem from "./CartItem";
import {
  dispalyMoney,
  generateDiscountedPrice,
} from "../DisplayMoney/DisplayMoney";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const [couponCode, setCouponCode] = useState("");
  const [isValid, setIsValid] = useState(true);
  const isMobile = useMediaQuery("(max-width: 899px)");

  const increaseQuantity = (id, quantity, stock) => {
    if (stock > quantity) {
      dispatch(addItemToCart(id, quantity + 1));
    }
  };

  const decreaseQuantity = (id, quantity) => {
    if (quantity > 1) {
      dispatch(addItemToCart(id, quantity - 1));
    }
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  const handleApplyCoupon = () => {
    setIsValid(false);
  };

  let totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  let discountedPrice = generateDiscountedPrice(totalPrice);
  let totalDiscount = totalPrice - discountedPrice;
  let final = dispalyMoney(totalPrice - totalDiscount);
  totalDiscount = dispalyMoney(totalDiscount);
  totalPrice = dispalyMoney(totalPrice);

  return (
    <Box sx={{ paddingLeft: 2, paddingRight: 2, paddingTop: 16, paddingBottom: 4 }}>
      <MetaData title="Your Cart" />
      <Grid container justifyContent="center" spacing={2}>
        {/* Cart Header */}
        <Grid item xs={12} pb={2}>
          <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  Shopping Cart
                </Typography>
                <Typography variant="body2">
                  TOTAL ({cartItems.length} items) <b>{final}</b>
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ cursor: "pointer", color: "primary.main" }}
                onClick={() => navigate("/products")}
              >
                Continue Shopping
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <Grid item xs={12} textAlign="center" sx={{ paddingLeft: 2 }}>
            <Card sx={{ p: 4, textAlign: "center", boxShadow: 3, borderRadius: 2 }}>
              <RemoveShoppingCartIcon sx={{ fontSize: 80, color: "gray" }} />
              <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
                Your Shopping Cart is Empty
              </Typography>
              <Typography variant="body1">Nothing to see here. Let's get shopping!</Typography>
              <Link to="/products" style={{ textDecoration: "none" }}>
                <Button variant="contained" sx={{ mt: 2 }}>
                  Shop Now
                </Button>
              </Link>
            </Card>
          </Grid>
        ) : (
          <>
            {/* Main Content */}
            <Grid container spacing={2} justifyContent="center" sx={{
              paddingLeft: 1,
              mt: 2,
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "7fr 5fr"},
              gap: 2,  // Adds even spacing between items
              width: "100%",
            }}>
              {/* Cart Items Section - 70% on desktop, 100% on mobile */}
              <Grid item  >
                {cartItems.map((item) => (
                  <CartItem
                    item={item}
                    deleteCartItems={deleteCartItems}
                    decreaseQuantity={decreaseQuantity}
                    increaseQuantity={increaseQuantity}
                  />
                ))}
              </Grid>

              {/* Order Summary - 30% on desktop, 100% on mobile */}
              <Grid item >
                <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                  <Typography variant="h6" fontWeight="bold">
                    Order Summary ({cartItems.length} {cartItems.length > 1 ? "items" : "item"})
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  {/* Order Summary Details */}
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Original Price</Typography>
                    <Typography>{totalPrice}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Discount</Typography>
                    <Typography>
                      <del>{totalDiscount}</del>
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Delivery</Typography>
                    <Typography>
                      <b>Free</b>
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Final Total */}
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="h6">Total Price</Typography>
                    <Typography variant="h6">
                      <b>{final}</b>
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    (Inclusive of all taxes)
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  {/* Coupon Code */}
                  <Box display="flex" alignItems="center" sx={{
                    mt: 2,
                    display: "grid",
                    gridTemplateColumns: { xs: "3fr 1fr" },
                    gap: 2,  // Adds even spacing between items
                    width: "100%",
                  }}>
                    <TextField
                      label="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      error={!isValid}
                      helperText={!isValid && "Invalid coupon code"}
                      variant="outlined"
                      size="small"
                      sx={{ flexGrow: 1, mr: 1 }}
                    />
                    <Button className="mainButton" variant="contained" onClick={handleApplyCoupon}>
                      Apply
                    </Button>
                  </Box>

                  {/* Checkout Button */}
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 3 }}
                    onClick={checkoutHandler}
                    className="mainButton"
                  >
                    Checkout
                  </Button>

                  {/* Payment Logos */}
                  <Box mt={2} textAlign="center">
                    <img
                      src="https://res.cloudinary.com/drosmiklv/image/upload/v1739139739/cart_img_ezpceb.png"
                      alt="payment-icons"
                      style={{ width: "80%", maxWidth: "300px" }}
                    />
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </Box >
  );
};

export default Cart;
