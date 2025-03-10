import React from "react";
import Typography from "@mui/material/Typography";
import "./OrderDetails.css";

const OrderDetailsSection = ({ item, totalDiscount, totalPrice }) => {
  return (
    <div className="rootPayment">
      <img src={item.image} alt={item.name} className="image" />
      <div className="details">
        <Typography variant="subtitle1" className="productName">
          {item.name}
        </Typography>
        <Typography variant="body2" className="quantity">
          <span
            style={{ fontWeight: 400, marginRight: "10px", color: "#00000080" }}
          >
            Quantity:
          </span>{" "}
          {item.quantity}
        </Typography>
        <div className="priceContainer">
          <Typography variant="body2" className="finalPrice">
            {totalPrice}
          </Typography>
          <Typography variant="body2" className="discountPrice">
            {totalDiscount}
          </Typography>
        </div>
        <div>
          <Typography variant="body2" className="paymentStatus">
            <span className="paymentValue">Payment:</span> Paid
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsSection;
