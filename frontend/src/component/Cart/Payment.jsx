import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layouts/MataData/MataData";
import NotificationService, { NotificationContainer } from '../NotificationService';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OrderDetailsSection from "./OrderDetails";
import DummyCard from "./DummyCard";
import { clearErrors, createOrder } from "../../actions/orderAction";
import CheckoutSteps from "./CheckoutSteps ";

// for cardDetails for card detials input section and hooks for accessing strip and element from App.js route
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./Cart.css";
import {
  Typography,
  TextField,
  Grid,
  Radio,
  Button,
  Divider,
  Link,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import PaymentIcon from "@mui/icons-material/Payment";
import LockIcon from "@mui/icons-material/Lock";
import EditIcon from "@mui/icons-material/Edit";
import AssuredWorkloadOutlinedIcon from "@mui/icons-material/AssuredWorkloadOutlined";
import { ReactComponent as MasterCard } from "../../Image/payment-svg/mastercard.svg";
import { ReactComponent as Visa } from "../../Image/payment-svg/visa (1).svg";
import { ReactComponent as Paytm } from "../../Image/payment-svg/paytm.svg";
import {
  dispalyMoney,
  generateDiscountedPrice,
} from "../DisplayMoney/DisplayMoney";
import "./Payment.css";

const PaymentComponent = () => {
  const navigate = useNavigate();
  
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  // const { user, loading } = useSelector((state) => state.userData);
  const user = JSON.parse(sessionStorage.getItem("user"));

  const { error } = useSelector((state) => state.newOrder);
  const [isFocused, setIsFocused] = useState(false);
  const [nameOnCard, setNameOnCard] = React.useState("");
  const [couponCode, setCouponCode] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [showDummyCard, setShowDummyCard] = useState(false);


  const subTotal = cartItems.reduce((acc, currItem) => {
    return acc + currItem.quantity * currItem.price;
  }, 0);

  const totalFinalPrice = subTotal;

  const handleNameOnCardChange = (e) => {
    setNameOnCard(e.target.value);
  };

  const handleApplyCoupon = () => {
    // handle apply coupon logic
    setIsValid(false);
  };

  const handleFocus = (event) => {
    setIsFocused(event.target.value !== "");
  };

  const handleRadioChange = () => {
    setShowDummyCard(!showDummyCard);
  };

  const handleCloseDummyCard = () => {
    setShowDummyCard(false);
  };


  const address = `${shippingInfo.address} , ${shippingInfo.city} ${shippingInfo.state
    } , ${shippingInfo.pinCode} , ${shippingInfo.country || "Estonia"}`;

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: subTotal,
    shippingPrice: 0,
    totalPrice: totalFinalPrice,
  };

  const paymentData = {
    // stripe takes payment in pese there for multiply with 100 bcz 1rs == 100 pese
    amount: Math.round(totalFinalPrice * 100),
  };

  async function paymentSubmitHandler(e) {
    e.preventDefault();
    if (nameOnCard === "") {
      NotificationService.error("Please enter name on card");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      // client_secret is key from STRIPE  while making payement post req at backend
      const client_secret = data.client_secret;

      // passed at App.js route statement
      if (!stripe || !elements) return;

      // this object is from stripe-js. only values need to put
      // const result = await stripe.confirmCardPayment(client_secret, {
      //   payment_method: {
      //     card: elements.getElement(CardNumberElement),
      //     billing_details: {
      //       name: user.name,
      //       email: user.email,
      //       address: {
      //         line1: shippingInfo.address,
      //         state: shippingInfo.state,
      //         postal_code: shippingInfo.pinCode,
      //         country: "EE",
      //       },
      //     },
      //   },
      // });
      const result = {
        paymentIntent: {
          id: "random_id",
          status: "succeeded",
        },
      };
      if (result.error) {
        // if error then again enable the button on

        NotificationService.error(result.error.message);
      } else {
        if ( result.paymentIntent.status === "succeeded") {
          // add new property inside order object
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          NotificationService.success(result.paymentIntent.status);

          dispatch(createOrder(order));

          navigate("/success");
        } else {
          NotificationService.error("There's some issue while processing payment");
        }
      }
    } catch (error) {
      // if error while payment then again enable payment button


      NotificationService.error(error.message);
    }
  }


  useEffect(() => {
    if (error) {
      NotificationService.error(error);
      dispatch(clearErrors());
    }

  }, [dispatch, alert, error]);

  // claculte price after discount
  let totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );



  let discountedPrice = generateDiscountedPrice(totalPrice);
  let totalDiscount = totalPrice - discountedPrice;
  let final = totalPrice - totalDiscount;
  final = dispalyMoney(final);
  totalDiscount = dispalyMoney(totalDiscount);
  totalPrice = dispalyMoney(totalPrice);

  return (
    <>

      <div className="payemntPage">
        <CheckoutSteps activeStep={2} />
        <MetaData title={"Payment"} />
        <div className="paymentPage__container">
          <div className="PaymentBox">
            <Typography
              variant="h5"
              component="h1"
              className="PaymentHeading"
            >
              Payment method
            </Typography>
            <Typography
              variant="subtitle2"
              gutterBottom
              className="securePayemnt"
            >
              <AssuredWorkloadOutlinedIcon />
              Payments are SSL encrypted so that your credit card and payment
              details stay safe.
            </Typography>

            <div className="cardContainer">
              <Typography variant="h6" className="subHeading">
                Credit Card <CreditCardIcon fontSize="medium" />
              </Typography>
              <Grid container spacing={2} className="cardDetails">
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle2"
                    className="paymentlabelText"
                  >
                    Card number
                  </Typography>
                  <div className="cardNumberInput">
                    <CardMembershipIcon className="inputIcon" />
                    <CardNumberElement className="paymentInput" />
                  </div>
                </Grid>
                <Grid item xs={12} container justifyContent="space-between">
                  <Grid item className="icons">
                    <MasterCard
                      style={{
                        width: "5%",
                        height: "auto",
                      }}
                    />
                    <Visa
                      style={{
                        width: "5%",
                        height: "auto",
                      }}
                    />
                    <Paytm
                      style={{
                        width: "5%",
                        height: "auto",
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle2"
                    className="paymentlabelText"
                  >
                    EXPIRY DATE
                  </Typography>
                  <div className="expiryInput">
                    <PaymentIcon className="inputIcon" />
                    <CardExpiryElement className="paymentInput2" />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle2"
                    className="paymentlabelText"
                  >
                    CVV/CVV
                  </Typography>
                  <div className="cvvInput">
                    <LockIcon className="inputIcon" />
                    <CardCvcElement className="paymentInput2" />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle2"
                    className="paymentlabelText"
                  >
                    NAME ON CARD
                  </Typography>
                  <TextField
                    placeholder="John Doe"
                    variant="outlined"
                    fullWidth
                    className="outlinedInput"
                    value={nameOnCard}
                    required
                    onChange={handleNameOnCardChange}
                  />
                </Grid>
              </Grid>
            </div>

            <div className="cardSelection">
              <Radio
                value="dummyCard"
                className="radio"
                checked={showDummyCard}
                onChange={handleRadioChange}
              />
              <Typography variant="subtitle2" className="radioText">
                Use dummy card
              </Typography>
              <CreditCardIcon fontSize="medium" />
              {showDummyCard && <DummyCard onClose={handleCloseDummyCard} />}
            </div>
            <Typography
              variant="body2"
              className="termsAndConditionsText"
            >
              By clicking "Place Order", you agree to our
              <Link href="#" className="privacyText">
                IRMITEK Terms & Conditions
              </Link>
            </Typography>
            <Button
              variant="contained"
              className="placeOrderBtn"
              fullWidth
              // disabled={isDisable}
              style={{ marginTop: "3rem" }}
              onClick={paymentSubmitHandler}
            >
              Place Order
            </Button>
          </div>
          <div className="payemntAmount">
            <div className="order_summary">
              <h4>
                Order Summary &nbsp; ( {cartItems ? cartItems.length : 0}{" "}
                {cartItems.length > 1 ? "items" : "item"} )
              </h4>
              <div className="order_summary_details">
                <div className="price order_Summary_Item">
                  <span>Original Price</span>
                  {/* ORIGINAL PRICE TOATAL */}
                  <p>{totalPrice}</p>
                </div>

                <div className="discount order_Summary_Item">
                  <span>Discount</span>
                  <p>
                    <del>{totalDiscount}</del>
                  </p>
                </div>

                <div className="delivery order_Summary_Item">
                  <span>Delivery</span>
                  <p>
                    <b>Free</b>
                  </p>
                </div>

                <div className="separator_cart"></div>
                <div className="total_price order_Summary_Item">
                  <div>
                    <h4>Total Price</h4>

                    <p
                      style={{
                        fontSize: "14px",
                        marginTop: "-10px",
                        color: "#414141",
                      }}
                    >
                      (Inclusive of all taxes)
                    </p>
                  </div>
                  <p>
                    <b>{final}</b>
                  </p>
                </div>
              </div>
            </div>

            <div className="separator"></div>

            <div className="coupon-box-wrapper">
              <div
                className={`coupon-box-content ${isFocused ? "focused" : ""}`}
              >
                <TextField
                  label="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={() => setIsFocused(false)}
                  error={!isValid}
                  helperText={!isValid && "Invalid coupon code"}
                  variant="outlined"
                  size="small"
                  style={{
                    width: "200px",
                    marginRight: "1rem",
                  }}
                />

                <Button
                  variant="contained"
                  color="primary"
                  className="coupon-box-apply-btn"
                  onClick={handleApplyCoupon}
                >
                  Apply
                </Button>
              </div>
            </div>

            <div className="paymentLogoImg">
              <img
                src="https://res.cloudinary.com/drosmiklv/image/upload/v1739139739/cart_img_ezpceb.png"
                alt="payemnt-icons"
                className="paymentImg"
              />
            </div>
            <div className="order_Details">
              <h5 className="orderSub_heading">ORDER DETAILS</h5>
              {cartItems &&
                cartItems.map((item, idx) => (
                  <Link to={`/product/${item.productId}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <OrderDetailsSection
                      key={idx}
                      item={item}
                      totalDiscount={totalDiscount}
                      totalPrice={totalPrice}
                    />
                  </Link>
                ))}
            </div>
            <Divider className="boldDivider" />
            {/* <div className="shipping_Deatils">
              <Typography variant="h6" className="orderSub_heading">
                DELIVERY ADDRESS
              </Typography>

              <div className="shipping_Address">
                <div className="shipping_Address_Details">
                  <Typography
                    variant="subtitle2"
                    style={{ fontSize: "16px", fontWeight: 400 }}
                  >
                    {user.name && user.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    style={{ fontSize: "16px", fontWeight: 400 }}
                  >
                    {address}
                  </Typography>
                </div>
                <div className="shipping_Address_edit">
                  <EditIcon
                    className="editIcon"
                    onClick={() => {
                      navigate("/shipping");
                    }}
                  />
                </div>
              </div>
              <Typography
                variant="subtitle2"
                className="mobileNo"
                style={{
                  fontWeight: 400,
                  marginTop: "-5px",
                  fontSize: "16px",
                }}
              >
                {shippingInfo.phoneNo},
              </Typography>

              <Typography
                variant="subtitle2"
                className="emailAddress"
                style={{ fontWeight: 400, fontSize: "16px" }}
              >
                {user.email}
              </Typography>
            </div> */}

            <div className="shipping_Deatils">
              <Typography
                variant="h6"
                className="orderSub_heading"
                style={{ marginTop: "5px" }}
              >
                BILLING DETAILS
              </Typography>

              <div className="shipping_Address">
                <div className="shipping_Address_Details">
                  <Typography
                    variant="subtitle2"
                    style={{ fontSize: "16px", fontWeight: 400 }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    style={{ fontSize: "16px", fontWeight: 400 }}
                  >
                    {address}
                  </Typography>
                </div>
                <div className="shipping_Address_edit">
                  <EditIcon
                    // className="editIcon"
                    onClick={() => {
                      navigate("/shipping");
                    }}
                  />
                </div>
              </div>
              <Typography
                variant="subtitle2"
                className="mobileNo"
              >
                {shippingInfo.phoneNo},
              </Typography>

              <Typography
                variant="subtitle2"
                className="emailAddress"
              >
                {user.email}
              </Typography>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default PaymentComponent;
