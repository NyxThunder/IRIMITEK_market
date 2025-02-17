import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
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
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import StorageIcon from "@mui/icons-material/Storage";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

function NewAPI() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.addNewAPI);
  const [toggle, setToggle] = useState(false);

  // Validation rules
  const validationRules = {
    name: (value) =>
      !value.trim() || value.length < 3 ? "API Name must be at least 1 characters." : "",
    clientId: (value) =>
      !value.trim() || value.length < 5 ? "Client ID must be at least 5 characters." : "",
    clientSecret: (value) =>
      !value.trim() || value.length < 8 ? "Client Secret must be at least 8 characters." : "",
  };

  // Use validation hook
  const { values, setValues, errors, handleChange, validateForm } = useFormValidation(
    { name: "", clientId: "", clientSecret: "" },
    validationRules
  );

  const toggleHandler = () => setToggle(!toggle);

  const redirectToAdminDashboard = useCallback(() => {
    navigate("/admin/dashboard");
  }, [navigate]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("API Created Successfully");
      redirectToAdminDashboard();
      dispatch({ type: NEW_API_RESET });
    }
  }, [dispatch, alert, error, redirectToAdminDashboard, success]);

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
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="API Name"
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
                              <ShoppingCartOutlinedIcon sx={{ fontSize: 20, color: "#414141" }} />
                            </InputAdornment>
                          ),
                        }}
                      />

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
                        type="password"
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
                        className = "mainButton"
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
