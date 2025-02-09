import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { myOrders, clearErrors } from "../../actions/orderAction";
import MetaData from "../layouts/MataData/MataData";
import IrimiLoader from "../layouts/loader/Loader";
import { useAlert } from "react-alert";
import OrderCard from "./OrderCard";
import "./MyOrder.css";

const MyOrder = () => {
  const currentYear = new Date().getFullYear();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { orders, loading, error } = useSelector((state) => state.myOrder);
  const { user } = useSelector((state) => state.userData);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [dispatch, alert, error]);

  return (
    <>
      {loading ? (
        <IrimiLoader />
      ) : (
        <div>
          <MetaData title="My Orders" />
          <div className="orderPageContainer">
            <Typography variant="h6" className="orderPageTitle">
              Your Order
            </Typography>
            <Typography variant="body1" className="orderPageText">
              {orders.length} order placed in {currentYear}
            </Typography>
          </div>

          {orders.map((item) => (
            <div key={item._id}>
              <OrderCard item={item} user={user} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MyOrder;
