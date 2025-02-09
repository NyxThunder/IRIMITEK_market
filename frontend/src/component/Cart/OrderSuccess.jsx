import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon className="successIcon" />

      <Typography variant="h4" className="successText">
        Congratulations!
        <br />
        Your Order has been Placed Successfully
      </Typography>
      <Link to="/orders" className="link">
        <Button variant="contained" className="viewOrdersButton">
          View Orders
        </Button>
      </Link>
    </div>
  );
}

export default OrderSuccess;
