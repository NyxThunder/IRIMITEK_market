import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationService, { NotificationContainer } from '../NotificationService';
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import { createProduct, clearErrors } from "../../actions/productAction";
import { useNavigate } from "react-router-dom";
import { NEW_PRODUCT_RESET } from "../../constants/productsConstatns";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CollectionsIcon from "@mui/icons-material/Collections"; // Already Correct
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import InfoIcon from "@mui/icons-material/Info";
import Sidebar from "./Siderbar";
import Navbar from "./Navbar";
import useFormValidation from "../hook/useFormValidation";
import "../User/LoginFromStyle.css";
import {
  Grid,
  Card,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  InputAdornment,
  Avatar,
  Box,
} from "@mui/material";

function NewProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const { loading, error, success } = useSelector(
    (state) => state.addNewProduct
  );

  const fileInputRef = useRef();
  const [toggle, setToggle] = useState(false);



  // Define validation rules
  const validationRules = {
    name: (value) => (!value.trim() || value.length < 3 ? "Name must be at least 3 characters." : ""),
    price: (value) => (!value || isNaN(value) || value <= 0 ? "Price must be a valid number greater than 0." : ""),
    Stock: (value) => (!value || isNaN(value) || value < 0 ? "Stock must be a non-negative number." : ""),
    info: (value) => (!value.trim() || value.length < 5 ? "Product info must be at least 5 characters." : ""),
    description: (value) => (!value.trim() || value.length < 10 ? "Description must be at least 10 characters." : ""),
    category: (value) => (!value ? "Please select a category." : ""),
  };

  
  const { values, setValues, errors, handleChange, validateImageUpload, validateForm } = useFormValidation(
    { name: "", price: "", Stock: "", description: "", category: "", images: [] },
    validationRules,
    { imageValidation: true } // Image validation enabled
);





  // togle handler =>
  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };


  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const redirectToAdminDashboard = useCallback(() => {
    navigate("/admin/dashboard");
  }, [navigate]);


  const categories = [
    "Gaming",
    "VOD",
    "Cryptocurrencies",
    "Music",
    "Cash gift cards",
    "Special Gift Cards",
    "Shopping",
    "Health & beauty",
    "Fashion",
    "Mobile Recharges",
    "Food",
    "Apps",
    "Travel",
    "Entertainment",
    "Service",
    "AI",
    "Books",
    "Other"
  ];
  useEffect(() => {
    if (error) {
      NotificationService.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      NotificationService.success("Product Created Successfully");
      redirectToAdminDashboard();
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, redirectToAdminDashboard, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const myForm = new FormData();
    Object.keys(values).forEach((key) => {
      if (key !== "images") {
        myForm.set(key, values[key]);
      }
    });

    // Append Base64 images instead of raw file objects
    values.images.forEach((base64Image) => {
      myForm.append("images", base64Image);
    });

    dispatch(createProduct(myForm));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"New Product"} />
          <Grid container spacing={2} justifyContent="center" sx={{ px: 2, overflowX: "hidden" }}>
            {/* Sidebar - 25% on `md+`, hidden on `sm` */}

            <Grid item md={3} lg={3} xl={3} className={!toggle ? "firstBox" : "toggleBox"}>
              <Sidebar />
            </Grid>

            {/* Main Content - 75% on `md+`, 100% on `sm` */}
            <Grid item xs={12} sm={12} md={9} lg={9} xl={9} sx={{ overflowX: "auto" }}>
              {/* Navbar (Full Width) */}
              <Grid item xs={12} sm={12}>
                <Navbar toggleHandler={toggleHandler} />
              </Grid>

              {/* Input Section */}
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Card sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
                    <form
                      encType="multipart/form-data"
                      onSubmit={createProductSubmitHandler}
                    >
                      <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}>
                        <Avatar sx={{ bgcolor: "black", mx: "auto", mb: 1 }}>
                          <AddCircleOutlineIcon />
                        </Avatar>
                        Create Product
                      </Typography>
                      <TextField
                        variant="outlined"
                        fullWidth
                        required
                        name="name"
                        label="Product Name"
                        value={values.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        sx={{ mt: 2 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <ShoppingCartOutlinedIcon
                                style={{
                                  fontSize: 20,
                                  color: "#414141",
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        variant="outlined"
                        required
                        name="price"
                        label="Price"
                        value={values.price}
                        onChange={handleChange}
                        error={!!errors.price}
                        helperText={errors.price}
                        fullWidth
                        sx={{ mt: 2 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              style={{
                                fontSize: 20,
                                color: "#414141",
                              }}
                            >
                              <AttachMoneyIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        variant="outlined"
                        required
                        name="Stock"
                        label="Stock"
                        value={values.Stock}
                        onChange={handleChange}
                        error={!!errors.Stock}
                        helperText={errors.Stock}
                        fullWidth
                        sx={{ mt: 2 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              style={{
                                fontSize: 20,
                                color: "#414141",
                              }}
                            >
                              <StorageIcon />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        variant="outlined"
                        fullWidth
                        required
                        name="info"
                        label="Product Info"
                        value={values.info}
                        onChange={handleChange}
                        error={!!errors.info}
                        helperText={errors.info}
                        sx={{ mt: 2 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <InfoIcon />
                            </InputAdornment>
                          ),
                        }}
                      />

                      {/* Category Select */}
                      <FormControl fullWidth error={!!errors.category} sx={{ mt: 2 }}>
                        <Select name="category" value={values.category} onChange={handleChange}>
                          <MenuItem value=""><em>Choose Category</em></MenuItem>
                          {categories.map((cate) => <MenuItem key={cate} value={cate}>{cate}</MenuItem>)}
                        </Select>
                        <FormHelperText>{errors.category}</FormHelperText>
                      </FormControl>
                      <TextField
                        variant="outlined"
                        name="description"
                        label="Product Description"
                        value={values.description}
                        onChange={handleChange}
                        error={!!errors.description}
                        helperText={errors.description}
                        multiline
                        rows={3}
                        fullWidth
                        sx={{ mt: 2 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <DescriptionIcon
                                className="descriptionIcon"
                              />
                            </InputAdornment>
                          ),
                        }}
                      />

                      {/* Image Upload */}
                      <Button
                        className="loginButton"
                        variant="contained"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        fullWidth
                        sx={{ mb: 2, mt: 2 }}
                      >
                        Upload Images
                        <input
                          type="file"
                          hidden
                          ref={fileInputRef}
                          accept=".webp,.jpeg,.jpg, .JPEG, .JPG"
                          multiple
                          onChange={validateImageUpload}
                        />
                      </Button>
                      {errors.images && <FormHelperText error>{errors.images}</FormHelperText>}

                      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
                        {values.images.length > 0 &&
                          values.images.map((file, index) => {
                            if (file instanceof File) {
                              return (
                                <img
                                  key={index}
                                  src={URL.createObjectURL(file)}
                                  alt="Preview"
                                  style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4 }}
                                />
                              );
                            } else {
                              return (
                                <img
                                  key={index}
                                  src={file} // Base64 fallback
                                  alt="Preview"
                                  style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4 }}
                                />
                              );
                            }
                          })}
                      </Box>

                      <Button
                        variant="contained"
                        className="loginButton"
                        fullWidth
                        type="submit"
                        sx={{ mt: 2 }}
                        disabled={loading ? true : false}
                      >
                        Create
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
export default NewProduct;
