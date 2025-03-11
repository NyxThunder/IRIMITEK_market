import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateOrder, clearErrors, getOrderDetails } from '../../actions/orderAction';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstant';

import NotificationService, { NotificationContainer } from '../NotificationService';
import { useParams, useNavigate, Link } from 'react-router-dom';

import MetaData from '../layouts/MataData/MataData';
import Loader from '../layouts/loader/Loader';
import Navbar from './Navbar';
import Sidebar from './Siderbar';
import OrderDetailsSection from '../Cart/OrderDetails';

import {
  Grid,
  Card,
  Button,
  Typography,
  Divider,
  FormControl,
  MenuItem,
  Select
} from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

function ProcessOrder() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { id: orderId } = useParams();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.deleteUpdateOrder);

  const [status, setStatus] = useState('');
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (error) {
      NotificationService.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      NotificationService.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      NotificationService.success('Order Updated Successfully');
      navigate('/admin/orders');
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(getOrderDetails(orderId));
  }, [dispatch, alert, error, updateError, isUpdated, navigate, orderId]);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    if (!status) {
      NotificationService.error('Please select a valid status');
      return;
    }
    const myForm = new FormData();
    myForm.set('status', status);
    dispatch(updateOrder(orderId, myForm));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Process Order" />
          <Grid container spacing={2} justifyContent="center" sx={{ px: 2 }}>
            {/* Sidebar */}
            <Grid item md={3} lg={3} xl={3} className={!toggle ? 'firstBox' : 'toggleBox'}>
              <Sidebar />
            </Grid>

            {/* Main Content */}
            <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
              {/* Navbar */}
              <Grid item xs={12} sm={12}>
                <Navbar toggleHandler={() => setToggle(!toggle)} />
              </Grid>

              {/* Order Details */}
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#414141', mb: 2 }}>
                      User Order Details
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    {order?.orderItems?.map((item, idx) => (
                      <Link
                        key={idx}
                        to={`/product/${item.productId}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <OrderDetailsSection
                          item={item}
                          totalDiscount={`$${(item.price * item.quantity * 20) / 100}`}
                          totalPrice={`$${item.price * item.quantity}`}
                        />
                      </Link>
                    ))}
                  </Card>
                </Grid>
              </Grid>

              {/* Shipping Details */}
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#414141', mb: 2 }}>
                      Delivery Address
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Typography variant="body1">
                      <b>{order?.user?.name}</b>
                    </Typography>
                    <Typography variant="body2">
                      {order?.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </Typography>
                    <Typography variant="body2">Phone: {order?.shippingInfo?.phoneNo}</Typography>
                    <Typography variant="body2">Email: {order?.user?.email}</Typography>
                  </Card>
                </Grid>
              </Grid>

              {/* Order Summary */}
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#414141', mb: 2 }}>
                      Order Summary
                    </Typography>

                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="body1">
                      <b>Total Price: </b> ${order?.totalPrice}
                    </Typography>
                    <Typography variant="body1">
                      <b>Order Status: </b>
                      <span style={{ color: order?.orderStatus === 'Delivered' ? 'green' : 'red' }}>
                        {order?.orderStatus}
                      </span>
                    </Typography>
                    <Typography variant="body1">
                      <b>Payment Status: </b>
                      <span
                        style={{
                          color: order?.paymentInfo?.status === 'succeeded' ? 'green' : 'red'
                        }}
                      >
                        {order?.paymentInfo?.status === 'succeeded' ? 'PAID' : 'NOT PAID'}
                      </span>
                    </Typography>
                  </Card>
                </Grid>
              </Grid>

              {/* Process Order */}
              {order?.orderStatus && order.orderStatus !== 'Delivered' && (
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12}>
                    <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#414141', mb: 2 }}>
                        Process Order
                      </Typography>
                      <Divider sx={{ mb: 2 }} />

                      <form onSubmit={updateOrderSubmitHandler}>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                          <AccountTreeIcon sx={{ mr: 1 }} />
                          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <MenuItem value="">Choose Status</MenuItem>
                            {order.orderStatus === 'Processing' && (
                              <MenuItem value="Shipped">Shipped</MenuItem>
                            )}
                            {order.orderStatus === 'Shipped' && (
                              <MenuItem value="Delivered">Delivered</MenuItem>
                            )}
                          </Select>
                        </FormControl>

                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          className="mainButton"
                          disabled={loading || !status}
                        >
                          Process
                        </Button>
                      </form>
                    </Card>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

export default ProcessOrder;
