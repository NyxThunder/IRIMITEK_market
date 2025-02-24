import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import NotificationService, { NotificationContainer } from '../NotificationService';
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import Sidebar from "./Siderbar";
import Navbar from "./Navbar";
import { UPDATE_USER_RESET } from "../../constants/userConstanat";
import { getUserDetails, updateUser, clearErrors } from "../../actions/userAction";
import { useNavigate, useParams } from "react-router-dom";
import useFormValidation from "../hook/useFormValidation";

import {
  Avatar,
  Button,
  TextField,
  Typography,
  InputAdornment,
  Select,
  MenuItem,
  Grid,
  Card,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function UpdateUser() {
  const dispatch = useDispatch();
  
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.userDetails);
  const { loading: updateLoading, error: updateError, isUpdated } = useSelector(
    (state) => state.profileData
  );

  const [toggle, setToggle] = useState(false);

  // Validation rules
  const validationRules = {
    name: (value) => (!value.trim() || value.length < 3 ? "Name must be at least 3 characters." : ""),
    email: (value) =>
      !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? "Enter a valid email address." : "",
    role: (value) => (!value ? "Please select a role." : ""),
  };

  // Use validation hook
  const { values, setValues, errors, handleChange, validateForm } = useFormValidation(
    { name: "", email: "", role: "" },
    validationRules
  );

  // Toggle handler
  const toggleHandler = () => setToggle(!toggle);

  // Fetch user details when component mounts
  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setValues({ name: user?.name || "", email: user?.email || "", role: user?.role || "" });
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
      NotificationService.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, isUpdated, updateError, user, userId]);

  // Handle form submission
  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const myForm = new FormData();
    Object.keys(values).forEach((key) => myForm.set(key, values[key]));

    dispatch(updateUser(userId, myForm));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update User" />
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
                    <form onSubmit={updateUserSubmitHandler}>
                      <Avatar sx={{ bgcolor: "black", mx: "auto", mb: 1 }}>
                        <AccountCircleIcon />
                      </Avatar>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: "bold", color: "#414141", mb: 2, textAlign: "center" }}
                      >
                        Update Role
                      </Typography>

                      {/* Name Field */}
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="User Name"
                        required
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        sx={{ mb: 2 }}
                      />

                      {/* Email Field */}
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Email"
                        required
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={{ mb: 2 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <MailOutlineIcon sx={{ fontSize: 20, color: "#414141" }} />
                            </InputAdornment>
                          ),
                        }}
                      />

                      {/* Role Selection */}
                      <Select
                        fullWidth
                        required
                        name="role"
                        value={values.role}
                        onChange={handleChange}
                        error={!!errors.role}
                        sx={{ mb: 2 }}
                      >
                        <MenuItem value="">
                          <em style={{ color: "#414141" }}>Choose Role</em>
                        </MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="user">User</MenuItem>
                      </Select>

                      {/* Submit Button */}
                      <Button
                        variant="contained"
                        fullWidth
                        className="mainButton"
                        type="submit"
                        disabled={updateLoading}
                      >
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

export default UpdateUser;
