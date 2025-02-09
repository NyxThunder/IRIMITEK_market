import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateOrder,
  clearErrors,
  getOrderDetails,
} from "../../actions/orderAction";
import Navbar from "./Navbar";
import Sidebar from "./Siderbar";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import { useAlert } from "react-alert";
import { Typography, Divider } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Button } from "@mui/material";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstant";
import { Link, useParams } from "react-router-dom";
import OrderDetailsSection from "../Cart/OrderDetails";
import './ProcessOrder.css';


function ProcessOrder() {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.deleteUpdateOrder
  );

  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();
  const productId = params.id;


  // for order status
  const [status, setStatus] = useState("");
  const [toggle, setToggle] = useState(false);

  // togle handler =>
  const toggleHandler = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      
      alert.success("Order Updated Successfully");  
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(getOrderDetails(productId)); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, alert, error, isUpdated, updateError, productId]);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("status", status);
    dispatch(updateOrder(productId, myForm));
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Process Order" />
          <div className="prodcessOrder">
            <div
              className={
                !toggle
                  ? "firstBox_prodcessOrder"
                  : "toggleBox_prodcessOrder"
              }
            >
              <Sidebar />
            </div>

            <div className="secondBox__prodcessOrder">
              <div className="navBar__prodcessOrder">
                <Navbar toggleHandler={toggleHandler} />
              </div>
              <div className="mainInfo__prodcessOrder">
                <div className="order_Details__prodcessOrder">
                  <h5 className="shipping_heading__prodcessOrder">
                    USER ORDER DETAILS
                  </h5>
                  {order.orderItems &&
                    order.orderItems.map((item, idx) => (
                      <Link
                        to={`/product/${item.productId}`}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          textDecorationColor: "none",
                        }}
                      >
                        <OrderDetailsSection
                          key={idx}
                          item={item}
                          totalDiscount={
                            `$${(item.price * item.quantity * 20) / 100}` // random discount between 1 to 30
                          }
                          totalPrice={`$${item.price * item.quantity}`}
                        />
                      </Link>
                    ))}
                </div>

                <div className="shipping_Deatils__prodcessOrder">
                  <Typography
                    variant="h6"
                    className="orderSub_heading__prodcessOrder"
                  >
                    DELIVERY ADDRESS
                  </Typography>

                  <div className="shipping_Address__prodcessOrder">
                    <div
                      className={
                        "shipping_Address_Details__prodcessOrder"
                      }
                    >
                      <Typography
                        variant="subtitle2"
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                        }}
                      >
                        {order.user && order.user.name}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                        }}
                      >
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </Typography>

                      <Typography
                        variant="subtitle2"
                        className="mobileNo__prodcessOrder"
                        style={{
                          fontWeight: 400,
                          marginTop: "-5px",
                          fontSize: "16px",
                        }}
                      >
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </Typography>

                      <Typography
                        variant="subtitle2"
                        className="emailAddress__prodcessOrder"
                        style={{
                          fontWeight: 400,
                          fontSize: "16px",
                        }}
                      >
                        {order.user && order.user.email}
                      </Typography>
                    </div>
                  </div>
                </div>

                <Divider className="boldDivider__prodcessOrder" />
                <div
                  className={`$total_price__prodcessOrder} $order_Summary_Item__prodcessOrder}`}
                >
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
                    <b style={{ marginLeft: "-2rem" }}>
                      ${order.totalPrice && order.totalPrice}
                    </b>
                  </p>
                </div>

                <div
                  className={`$total_price__prodcessOrder} $order_Summary_Item__prodcessOrder}`}
                >
                  <div>
                    <h4>Order Status</h4>
                  </div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    <b> {order.orderStatus && order.orderStatus}</b>
                  </p>
                </div>

                <div
                  className={`$total_price__prodcessOrder} $order_Summary_Item__prodcessOrder}`}
                >
                  <div>
                    <h4>Payment Status</h4>
                  </div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? `$greenFont}`
                        : `$redFont}`
                    }
                  >
                    <b className="greenFont">
                      {" "}
                      {order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </b>
                  </p>
                </div>

                {order.orderStatus && (
                  <>
                    <div
                      style={{
                        display:
                          order.orderStatus === "Delivered" ? "none" : "block",
                        padding: " 0 1rem 0 0",
                      }}
                    >
                      <Divider
                        className="boldDivider__prodcessOrder2"
                      />
                      <form className="updateOrderForm__prodcessOrder">
                        <h1>Process Order</h1>

                        <div style={{ marginTop: "-1rem" }}>
                          <AccountTreeIcon />
                          <select onChange={(e) => setStatus(e.target.value)}>
                            <option value="">Choose Category</option>
                            {order.orderStatus === "Processing" && (
                              <option value="Shipped">Shipped</option>
                            )}

                            {order.orderStatus === "Shipped" && (
                              <option value="Delivered">Delivered</option>
                            )}
                          </select>
                        </div>

                        <Button
                          variant="contained"
                          className="placeOrderBtn_prodcessOrder"
                          fullWidth
                          onClick={updateOrderSubmitHandler}
                          disabled={
                            loading
                              ? true
                              : false || status === ""
                              ? true
                              : false
                          }
                        >
                          Process
                        </Button>
                      </form>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProcessOrder;