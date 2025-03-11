import React, { useState } from 'react';
import { Card, Typography, Button, Divider, Grid, Box, useMediaQuery } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import NotificationService, { NotificationContainer } from '../NotificationService';
import { addItemToCart } from '../../actions/cartAction';
import { useNavigate } from 'react-router-dom';
import DialogBox from '../Product/DialogBox';

const formatDate = (dateString) => {
  const createdAt = new Date(dateString);
  if (isNaN(createdAt.getTime())) {
    return 'Invalid date';
  }
  return createdAt.toLocaleString('en-IN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  });
};

const OrderCard = ({ item, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width: 999px)');
  const { shippingInfo, orderItems } = item;

  const addToCartHandler = (id, qty = 1) => {
    dispatch(addItemToCart(id, qty));
    NotificationService.success('Item Added to Cart');
    navigate('/cart');
  };

  return (
    <Box sx={{ px: 2, my: 2 }}>
      {orderItems.map((product, index) => (
        <Card
          key={index}
          sx={{
            p: 2,
            boxShadow: 3,
            borderRadius: 2,
            mb: 2
          }}
        >
          {/* First Row - Order Info & Total */}
          <Grid
            container
            spacing={2}
            alignItems="center"
            display="flex"
            justifyContent={'space-between'}
          >
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="500">
                ORDER PLACED
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(item.createdAt)}
              </Typography>
              <Typography variant="body2" fontWeight="500">
                ORDER-ID: #{item._id}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle1" fontWeight="500">
                Total:
              </Typography>
              <Typography variant="body2">
                <strong> $</strong>
                {product.price * product.quantity}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          {/* Product & Address */}
          <Grid container spacing={3} alignItems="center">
            {/* Product Image & Details */}
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                {/* Product Image */}
                <Grid item xs={4}>
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 1,
                      objectFit: 'contain' // Changed from "cover" to "contain"
                    }}
                  />
                </Grid>

                {/* Product Details */}
                <Grid item xs={8}>
                  <Typography variant="subtitle1" fontWeight="500">
                    {product.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>QTY:</strong> {product.quantity}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Delivery Status:</strong>{' '}
                    <span style={{ color: item.orderStatus === 'Delivered' ? 'green' : 'red' }}>
                      {item.orderStatus}
                    </span>
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<ReplayIcon />}
                      onClick={() => addToCartHandler(product.productId)}
                    >
                      Buy Again
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => navigate(`/product/${product.productId}`)}
                    >
                      View item
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            {/* Shipping Address (Hidden in Small Screens) */}
            {!isSmallScreen && (
              <Grid item xs={12} md={6}>
                <Box sx={{ p: 2, borderRadius: 2, boxShadow: 2, bgcolor: '#f5f5f5' }}>
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography variant="subtitle1" fontWeight="400">
                    Delivery Address:
                  </Typography>
                  <Typography variant="body2">{shippingInfo.address}</Typography>
                  <Typography variant="body2">
                    {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country} -{' '}
                    {shippingInfo.pinCode}
                  </Typography>
                  <Typography variant="body2">Phone: {shippingInfo.phoneNo}</Typography>
                </Box>
              </Grid>
            )}
          </Grid>

          <Divider sx={{ my: 2 }} />

          {/* Write Review Button */}
          <Box sx={{ textAlign: 'center' }}>
            <Button variant="outlined" startIcon={<EditIcon />} onClick={() => setOpen(true)}>
              Write A Product Review
            </Button>
          </Box>

          {/* Review Dialog Box */}
          <DialogBox open={open} handleClose={() => setOpen(false)} id={product.productId} />
        </Card>
      ))}
    </Box>
  );
};

export default OrderCard;
