import React, { useState } from "react";
import {
  Card,
  Typography,
  Button,
  Divider,
  useMediaQuery,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { addItemToCart } from "../../actions/cartAction";
import { useNavigate } from "react-router-dom";
import DialogBox from "../Product/DialogBox";
import "./OrderCard.css";


const createdAt = (user) => {
  const createdAt = new Date(user.createdAt);
  if (isNaN(createdAt.getTime())) {
    // Handle invalid date
    console.error("Invalid date value:", user.createdAt);
    return "Invalid date";
  }
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };

  const formatter = new Intl.DateTimeFormat("en-IN", options);
  const formattedDate = formatter.format(createdAt);
  return formattedDate;
};


const OrderCard = ({ item, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const [open, setOpen] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width: 999px)");
  const { shippingInfo, orderItems } = item;

  const addToCartHandler = (id, qty = 0) => {
    dispatch(addItemToCart(id, qty))
    alert.success("Item Added to Cart")
    navigate("/cart")
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("called");
    setOpen(false);
  };

  return (
    <div className="root">
      {orderItems.map((product) => (
        <Card className="orderCard">
          <div className="firstBlock">
            {/* Left side */}
            <div className="leftSide">
              <Typography
                variant="subtitle1"
                className="orderPlaced"
                style={{ fontWeight: "500" }}
              >
                ORDER PLACED
              </Typography>
              <Typography
                variant="body2"
                className="orderDate"
                color="#141414"
              >
                {createdAt(item)}
              </Typography>
              <Typography
                variant="body2"
                className="orderId"
                style={{ fontWeight: "500" }}
              >
                ORDER-ID: #{item._id}
              </Typography>
            </div>

            {/* Right side */}
            {!isSmallScreen && (
              <div className="rightSide">
                <Typography
                  variant="subtitle1"
                  className="totalPrice"
                  style={{ fontWeight: "500" }}
                >
                  Total:
                </Typography>
                <Typography variant="body2" color="141414">
                  <strong> $</strong>
                  {product.price * product.quantity}
                </Typography>
              </div>
            )}
          </div>

          {/* Second block */}
          <div className="secondBlock">
            {/* Left side */}
            <div className="secondBlock_left">
              <div className="productDetailsContainer">
                <div style={{ width: "25%" }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100%", height: "160px" }}
                  />
                </div>

                <div>
                  <Typography
                    variant="subtitle1"
                    className="productName"
                    style={{ fontWeight: "500" }}
                  >
                    {product.name}
                  </Typography>
                  <Typography variant="body2" className="productQty">
                    <strong>QTY:</strong> {product.quantity}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="deliveryStatus"
                  >
                    <strong>Delivery Status:</strong>{" "}
                    <span
                      style={{
                        color:
                          item.orderStatus === "Delivered" ? "green" : "red",
                      }}
                    >
                      {item.orderStatus}
                    </span>
                  </Typography>
                  <div className="buttonsContainer">
                    <Button
                      variant="outlined"
                      className="buyAgainButton"
                      onClick={() => addToCartHandler(product.productId, 1)}
                    >
                      <ReplayIcon style={{ marginRight: "8px" }} />
                      Buy Again
                    </Button>
                    <Button
                      variant="outlined"
                      className="button"
                      onClick={() =>
                        navigate(`/product/${product.productId}`)
                      }
                    >
                      View item
                    </Button>
                  </div>
                </div>
              </div>
              <Divider className="divider" />
              <div style={{ padding: "1rem" }}>
                <Button
                  variant="outlined"
                  className="reviewButton"
                  onClick={handleClickOpen}
                >
                  <EditIcon style={{ marginRight: "8px" }} />
                  Write A Product Review
                </Button>

                <DialogBox
                  open={open}
                  handleClose={handleClose}
                  id={product.productId}
                  className="dialog"
                />
              </div>
            </div>

            {/* Right side */}
            {!isSmallScreen && (
              <div className="secondBlock_right">
                <div className="addressBlock">
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography variant="subtitle1" style={{ fontWeight: 400 }}>
                    Delivery Address :
                  </Typography>
                  <Typography variant="body2" className="addressText">
                    {shippingInfo.address}
                  </Typography>
                  <Typography variant="body2" className="addressText">
                    {shippingInfo.city}, {shippingInfo.state},{" "}
                    {shippingInfo.country} - {shippingInfo.pinCode}
                  </Typography>
                  <Typography variant="body2" className="addressText">
                    Phone: {shippingInfo.phoneNo}
                  </Typography>
                </div>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default OrderCard;
