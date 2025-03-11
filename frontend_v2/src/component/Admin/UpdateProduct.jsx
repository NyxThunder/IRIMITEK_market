import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotificationService, { NotificationContainer } from '../NotificationService';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductDetails, updateProduct, clearErrors } from '../../actions/productAction';
import { UPDATE_PRODUCT_RESET } from '../../constants/productsConstatns';
import useFormValidation from '../hook/useFormValidation';

import MetaData from '../layouts/MataData/MataData';
import Loader from '../layouts/loader/Loader';
import Sidebar from './Siderbar';
import Navbar from './Navbar';

import {
  Avatar,
  Button,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Grid,
  Card,
  InputAdornment,
  Box,
  FormHelperText
} from '@mui/material';

import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CollectionsIcon from '@mui/icons-material/Collections';
import InfoIcon from '@mui/icons-material/Info';

function UpdateProduct() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { id: productId } = useParams();

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  const { loading, error, product } = useSelector((state) => state.productDetails);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated
  } = useSelector((state) => state.deleteUpdateProduct);

  const fileInputRef = useRef();
  const [toggle, setToggle] = useState(false);

  const categories = [
    'Gaming',
    'VOD',
    'Cryptocurrencies',
    'Music',
    'Cash gift cards',
    'Special Gift Cards',
    'Shopping',
    'Health & beauty',
    'Fashion',
    'Mobile Recharges',
    'Food',
    'Apps',
    'Travel',
    'Entertainment',
    'Service',
    'AI',
    'Books',
    'Other'
  ];

  // Validation rules
  const validationRules = {
    name: (value) =>
      !value.trim() || value.length < 3 ? 'Product name must be at least 3 characters.' : '',
    price: (value) =>
      !value || isNaN(value) || value <= 0 ? 'Price must be a valid number greater than 0.' : '',
    Stock: (value) =>
      !value || isNaN(value) || value < 0 ? 'Stock must be a non-negative number.' : '',
    info: (value) =>
      !value.trim() || value.length < 5 ? 'Product info must be at least 5 characters.' : '',
    description: (value) =>
      !value.trim() || value.length < 10 ? 'Description must be at least 10 characters.' : '',
    category: (value) => (!value ? 'Please select a category.' : '')
  };

  // Use form validation
  const { values, setValues, errors, handleChange, validateImageUpload, validateForm } =
    useFormValidation(
      { name: '', price: '', Stock: '', info: '', description: '', category: '', images: [] },
      validationRules
    );

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setValues({
        name: product?.name || '',
        price: product?.price || '',
        Stock: product?.Stock || '',
        info: product?.info || '',
        description: product?.description || '',
        category: product?.category || '',
        images: []
      });

      // Show previous images
      setOldImages(product?.images || []);
    }

    if (error) {
      NotificationService.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      NotificationService.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      NotificationService.success('Product Updated Successfully');
      navigate('/admin/products');
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, isUpdated, updateError, productId, product]);

  // Handle form submission
  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const myForm = new FormData();
    Object.keys(values).forEach((key) => myForm.set(key, values[key]));
    images.forEach((file) => myForm.append('images', file));

    dispatch(updateProduct(productId, myForm));
  };

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((prev) => [...prev, reader.result]);
          setImages((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Product" />
          <Grid container spacing={2} justifyContent="center" sx={{ px: 2 }}>
            <Grid item md={3} lg={3} xl={3} className={!toggle ? 'firstBox' : 'toggleBox'}>
              <Sidebar />
            </Grid>

            <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
              <Grid item xs={12} sm={12}>
                <Navbar toggleHandler={() => setToggle(!toggle)} />
              </Grid>

              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                    <form onSubmit={updateProductSubmitHandler}>
                      <Avatar sx={{ bgcolor: 'black', mx: 'auto', mb: 1 }}>
                        <AddCircleOutlineIcon />
                      </Avatar>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 'bold', color: '#414141', mb: 2, textAlign: 'center' }}
                      >
                        Update Product
                      </Typography>

                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Product Name"
                        required
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        sx={{ mb: 2 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <ShoppingCartOutlinedIcon />
                            </InputAdornment>
                          )
                        }}
                      />

                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Price"
                        required
                        name="price"
                        value={values.price}
                        onChange={handleChange}
                        error={!!errors.price}
                        helperText={errors.price}
                        sx={{ mb: 2 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <AttachMoneyIcon />
                            </InputAdornment>
                          )
                        }}
                      />

                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Stock"
                        required
                        name="Stock"
                        value={values.Stock}
                        onChange={handleChange}
                        error={!!errors.Stock}
                        helperText={errors.Stock}
                        sx={{ mb: 2 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <StorageIcon />
                            </InputAdornment>
                          )
                        }}
                      />

                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Product info"
                        value={values.info}
                        onChange={handleChange}
                        error={!!errors.info}
                        helperText={errors.info}
                        sx={{ mb: 2 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <InfoIcon />
                            </InputAdornment>
                          )
                        }}
                      />

                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <Select
                          name="category"
                          value={values.category}
                          onChange={handleChange}
                          error={!!errors.category}
                        >
                          <MenuItem value="">
                            <em>Choose Category</em>
                          </MenuItem>
                          {categories.map((cate) => (
                            <MenuItem key={cate} value={cate}>
                              {cate}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Description"
                        multiline
                        rows={2}
                        required
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        error={!!errors.description}
                        helperText={errors.description}
                        sx={{ mb: 2 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <DescriptionIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                      <Button
                        className="mainButton"
                        fullWidth
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        onClick={handleImageUpload}
                        sx={{ mb: 2 }}
                      >
                        Upload Images
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        multiple
                        hidden
                        onChange={updateProductImagesChange}
                      />

                      {/* Image Preview - Show old images first */}
                      <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', mb: 2 }}>
                        {oldImages.length > 0
                          ? oldImages.map((img, idx) => (
                              <img
                                key={idx}
                                src={img.url}
                                alt="Old Preview"
                                style={{ width: 80, height: 80, borderRadius: 8 }}
                              />
                            ))
                          : imagesPreview.map((img, idx) => (
                              <img
                                key={idx}
                                src={img}
                                alt="New Preview"
                                style={{ width: 80, height: 80, borderRadius: 8 }}
                              />
                            ))}
                      </Box>

                      <Button fullWidth type="submit" disabled={loading} className="mainButton">
                        Update
                      </Button>
                    </form>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

export default UpdateProduct;
