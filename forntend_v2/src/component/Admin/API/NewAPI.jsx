import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationService, { NotificationContainer } from '../../NotificationService';
import MetaData from "../../layouts/MataData/MataData";
import Loader from "../../layouts/loader/Loader";
import Sidebar from "../Siderbar";
import Navbar from "../Navbar";
import { createApi, clearErrors } from "../../../actions/apiAction";
import { useNavigate } from "react-router-dom";
import { NEW_API_RESET } from "../../../constants/apiConstatns";
import useFormValidation from "../../hook/useFormValidation";

import {
  Avatar,
  TextField,
  Typography,
  Button,
  Grid,
  Card,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import StorageIcon from "@mui/icons-material/Storage";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

function NewAPI() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const { loading, error, success } = useSelector((state) => state.addNewAPI);
  const [toggle, setToggle] = useState(false);

  const categories = [
    "G2A", "KeySender", "Amazon", "Flipkart", "Ebay", "Walmart", "Shopify", "AliExpress", "BestBuy", "Others"
  ];

  // Validation rules
  const validationRules = {
    name: (value) => (!value ? "Please select a category." : ""),
    clientId: (value) =>
      !value.trim() || value.length < 5 ? "Client ID must be at least 5 characters." : "",
    clientSecret: (value) =>
      !value.trim() || value.length < 8 ? "Client Secret must be at least 8 characters." : "",
  };

  const { values, setValues, errors, handleChange, validateForm } = useFormValidation(
    { name: "", clientId: "", clientSecret: "" },
    validationRules,
    { imageValidation: false } // No image validation needed
  );

  const toggleHandler = () => setToggle(!toggle);

  const redirectToAPIDashboard = useCallback(() => {
    navigate("/admin/api_integration");
  }, [navigate]);

  useEffect(() => {
    if (error) {
      NotificationService.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      NotificationService.success("API Created Successfully");
      redirectToAPIDashboard();
      dispatch({ type: NEW_API_RESET });
    }
  }, [dispatch, alert, error, redirectToAPIDashboard, success]);

  const createApiSubmitHandler = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const myForm = new FormData();
    Object.keys(values).forEach((key) => myForm.set(key, values[key]));

    dispatch(createApi(myForm));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"New API"} />
          <Grid container spacing={2} justifyContent="center" sx={{ px: 2 }}>
            {/* Sidebar - 25% on `md+`, hidden on `sm` */}
            <Grid item md={3} lg={3} xl={3} className={!toggle ? "firstBox" : "toggleBox"}>
              <Sidebar />
            </Grid>

            {/* Main Content - 75% on `md+`, 100% on `sm` */}
            <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
              {/* Navbar (Full Width) */}
              <Grid item xs={12} sm={12}>
                <Navbar toggleHandler={toggleHandler} />
              </Grid>

              {/* Input Section */}
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                    <form onSubmit={createApiSubmitHandler}>
                      <Avatar sx={{ bgcolor: "black", mx: "auto", mb: 1 }}>
                        <AddCircleOutlineIcon />
                      </Avatar>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: "bold", color: "#414141", mb: 2, textAlign: "center" }}
                      >
                        Create API
                      </Typography>

                      {/* API Name */}
                      {/* Category Select */}
                      <FormControl fullWidth error={!!errors.name} sx={{ mb: 2 }}>
                        <Select name="name" value={values.name} onChange={handleChange}>
                          <MenuItem value=""><em>Choose Category</em></MenuItem>
                          {categories.map((cate) => <MenuItem key={cate} value={cate}>{cate}</MenuItem>)}
                        </Select>
                        <FormHelperText>{errors.name}</FormHelperText>
                      </FormControl>

                      {/* Client ID */}
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Client ID"
                        required
                        name="clientId"
                        value={values.clientId}
                        onChange={handleChange}
                        error={!!errors.clientId}
                        helperText={errors.clientId}
                        sx={{ mb: 2 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <ShoppingCartOutlinedIcon sx={{ fontSize: 20, color: "#414141" }} />
                            </InputAdornment>
                          ),
                        }}
                      />

                      {/* Client Secret */}
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Client Secret"
                        required
                        name="clientSecret"
                        value={values.clientSecret}
                        onChange={handleChange}
                        error={!!errors.clientSecret}
                        helperText={errors.clientSecret}
                        sx={{ mb: 2 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <StorageIcon sx={{ fontSize: 20, color: "#414141" }} />
                            </InputAdornment>
                          ),
                        }}
                      />

                      {/* Submit Button */}
                      <Button
                        className="mainButton"
                        variant="contained"
                        fullWidth
                        type="submit"
                        disabled={loading}
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

export default NewAPI;
