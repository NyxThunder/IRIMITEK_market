import React, { useEffect } from "react";
import { Typography, Box, Grid, Card } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { myOrders, clearErrors } from "../../actions/orderAction";
import MetaData from "../layouts/MataData/MataData";
import IrimiLoader from "../layouts/loader/Loader";
import NotificationService, { NotificationContainer } from '../NotificationService';
import OrderCard from "./OrderCard";

const MyOrder = () => {
  const currentYear = new Date().getFullYear();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { orders, loading, error } = useSelector((state) => state.myOrder);
  const { user } = useSelector((state) => state.userData);

  useEffect(() => {
    if (error) {
      NotificationService.error(error);
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

        <Box sx={{ maxWidth: "1200px", margin: "auto", paddingTop: "140px", paddingBottom: "20px" }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Your Order
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
              {orders.length} order placed in {currentYear}
            </Typography>
          </Box>
          {orders.map((item) => (
            <div style={{paddingLeft: 0}} key={item._id}>
              <OrderCard item={item} user={user} />
            </div>
          ))}
        </Box >
      )}
    </>
  );
};

export default MyOrder;
