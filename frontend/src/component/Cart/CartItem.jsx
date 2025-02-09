import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Input,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {
  dispalyMoney,
  generateDiscountedPrice,

} from "../DisplayMoney/DisplayMoney";
import "./CartItem.css";

function CartItem({
  deleteCartItems,
  item,
  decreaseQuantity,
  increaseQuantity,
  length,
}) {
  /// calculate price after discount

  let finalPrice = generateDiscountedPrice(item.price);
  let discountedPrice = item.price - finalPrice;
  discountedPrice = dispalyMoney(discountedPrice);
  let total = finalPrice * item.quantity;
  total = dispalyMoney(total);
  finalPrice = dispalyMoney(finalPrice);

  return (
    <Card className={length < 2 ? "root11" : "roots11"}>
      <CardMedia
        className="media"
        image={item.image}
        title={item.name}
      />
      <CardContent className="content">
        <div className="contentTop">
          <div className="cartHeader">
            <Typography variant="subtitle1" className="title">
              {item.name}
            </Typography>

            <IconButton
              aria-label="delete"
              className="cartDeleteIcon"
              onClick={() => deleteCartItems(item.productId)}
            >
              <DeleteIcon />
            </IconButton>
          </div>

          <div className="priceItem">
            <Typography className="cartSubHeadings" variant="body2">
              Price:
            </Typography>
            <Typography variant="subtitle1" className="itemPrice">
              {finalPrice}
            </Typography>
            <Typography
              variant="caption"
              component="span"
              color="black"
              className="itemOldPrice"
            >
              <del>{discountedPrice}</del>
            </Typography>
          </div>
        </div>
        <div className="contentBottom">
          <div className="prod_details_additem">
            <h5>QTY:</h5>
            <div className="additem">
              <IconButton
                onClick={() => decreaseQuantity(item.productId, item.quantity)}
                className="additem_decrease"
              >
                <RemoveIcon />
              </IconButton>
              <Input
                readOnly
                type="number"
                value={item.quantity}
                className="input"
              />
              <IconButton
                onClick={() =>
                  increaseQuantity(item.productId, item.quantity, item.stock)
                }
                className="additem_increase"
              >
                <AddIcon />
              </IconButton>
            </div>
          </div>

          <div className="priceItem">
            <Typography variant="body2" className="cartSubHeadings">
              TOTAL:
            </Typography>
            <Typography variant="subtitle1" className="price">
              {total}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CartItem;
