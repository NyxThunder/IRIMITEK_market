import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Button, Box, CircularProgress } from '@mui/material';

import MataData from '../layouts/MataData/MataData';
import NotificationService, { NotificationContainer } from '../NotificationService';
import HomeSlider from './HomeSlider';
import FeaturedSlider from './FeatureSlider';
import Loader from '../../ui-component/Loader';
import logo_big from '../../Image/logo_big.png';
import Footer from '../../layout/Footer';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AppsIcon from '@mui/icons-material/Apps';
import WebIcon from '@mui/icons-material/Web';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      NotificationService.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  const stats = [
    {
      value: '150+',
      label: 'Winning Products',
      icon: <StorefrontIcon sx={{ fontSize: 50, color: '#fff' }} />,
      bgColor: '#FF9800'
    },
    {
      value: '11+',
      label: 'Ecommerce Platforms',
      icon: <AppsIcon sx={{ fontSize: 50, color: '#fff' }} />,
      bgColor: '#03A9F4'
    },
    {
      value: '170+',
      label: 'Sales Funnels & Tools',
      icon: <WebIcon sx={{ fontSize: 50, color: '#fff' }} />,
      bgColor: '#8E24AA'
    }
  ];

  return (
    <>
      <MataData title="IRMITEK" />
      <NotificationContainer />

      {loading ? (
        <Loader />
      ) : (
        <>
          <Container maxWidth="lg">
            {/* Hero Section (White Background) */}
            <Box
              py={8}
              sx={{
                textAlign: 'center',
                backgroundColor: '#ffffff'
              }}
            >
              {/* Logo Image */}
              <Box display="flex" justifyContent="center" mb={2}>
                <img
                  src={logo_big} // Replace with your actual logo path
                  alt="IRMITEK Logo"
                  style={{ height: '100px', objectFit: 'contain' }}
                />
              </Box>

              {/* Title & Subtitle */}
              <Typography variant="h3" fontWeight="bold" color="secondary">
                Welcome to IRMITEK
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" mt={1}>
                Discover the best products handpicked for you
              </Typography>

              {/* Sign In & Sign Up Buttons */}
              <Box mt={3} display="flex" justifyContent="center" gap={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{ borderRadius: '8px', padding: '10px 25px' }}
                  onClick={() => navigate('/signin')}
                >
                  Sign In
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  sx={{ borderRadius: '8px', padding: '10px 25px' }}
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          </Container>

          {/* Hero Slider (Light Grey Background) */}
          <Box sx={{ backgroundColor: '#f7f7f7' }}>
            <Container maxWidth="lg">
              <HomeSlider />
            </Container>
          </Box>

          {/* Featured Products Section (White Background) */}
          <Box py={8} sx={{ backgroundColor: '#ffffff' }}>
            <Container maxWidth="lg">
              <Typography
                variant="h2"
                fontWeight="bold"
                color="secondary"
                textAlign="center"
                mb={3}
              >
                Featured Products
              </Typography>
              {products && <FeaturedSlider products={products} />}
            </Container>
          </Box>

          {/* Statistics Section (Light Grey Background) */}
          <Box py={8} sx={{ backgroundColor: '#f7f7f7' }}>
            <Container maxWidth="lg">
              <Grid container spacing={3} justifyContent="center">
                {stats.map((stat, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Box
                      p={4}
                      sx={{
                        backgroundColor: stat.bgColor,
                        textAlign: 'center',
                        borderRadius: 2,
                        color: '#fff',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '180px'
                      }}
                    >
                      {stat.icon}
                      <Typography variant="h4" fontWeight="bold" mt={2}>
                        {stat.value}
                      </Typography>
                      <Typography variant="subtitle1">{stat.label}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Footer />
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

export default Home;
