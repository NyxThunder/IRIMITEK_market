import React, { useEffect, useRef } from "react";
import {
  Avatar,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  Divider,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userAction";
import { useAlert } from "react-alert";

const ProfilePage = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  const { user, isAuthenticated } = useSelector((state) => state.userData);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged out successfully");
    navigate("/login");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigateRef.current("/login");
    }
  }, [isAuthenticated]);

  const formatDate = (user) => {
    const createdAt = new Date(user.createdAt);
    if (isNaN(createdAt.getTime())) return "Invalid date";
    return createdAt.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  };

  return (
    <Box sx={{ maxWidth: "1200px", margin: "auto", paddingTop: "140px", paddingBottom: "20px" }}>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Hi, {user.name}!
        </Typography>
        <Typography variant="body2" sx={{ color: "gray" }}>
          Welcome back! Happy shopping!
        </Typography>
      </Box>

      <Grid container sx={{
        mt: 2,
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr", md: "1fr 3fr" },
        gap: 2,  // Adds even spacing between items
        width: "100%",
      }}>
        {/* Left Section (Profile Overview) - 30% width on large screens */}
        <Grid item fullWidth>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, textAlign: "center", mx: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Profile Overview
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Avatar alt={user?.name} src={user?.avatar?.url || "https://res.cloudinary.com/drosmiklv/image/upload/v1739068351/default_avatar_pd5xgd.jpg"}
              sx={{ width: 100, height: 100, margin: "auto", mb: 2 }}
            />
            <Typography><strong>Name:</strong> {user.name}</Typography>
            <Typography><strong>Email:</strong> {user.email}</Typography>
            <Typography><strong>Member since:</strong> {formatDate(user)}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>Orders</Typography>
            <Link to="/orders" style={{ textDecoration: "none" }}>
              <Button variant="contained" fullWidth className="mainButton">
                View Orders
              </Button>
            </Link>
          </Card>
        </Grid>

        {/* Right Section (Personal Information) - 70% width on large screens */}
        <Grid item fullWidth>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, mx: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Personal Information
            </Typography>
            <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
              Feel free to update your details to keep your account up to date.
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {/* My Details Section */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>My Details</Typography>
              <Typography><strong>Name:</strong> {user.name}</Typography>
              <Typography><strong>Email:</strong> {user.email}</Typography>
              <Typography><strong>Phone Number:</strong> *******1234</Typography>
              <Typography><strong>Gender:</strong> Male</Typography>
              <Link to="/profile/update" style={{ textDecoration: "none" }}>
                <Button variant="contained" sx={{ mt: 1 }} fullWidth className="mainButton">
                  Edit Details
                </Button>
              </Link>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Login Details Section */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>Login Details</Typography>
              <Typography><strong>Email:</strong> {user.email}</Typography>
              <Typography><strong>Password:</strong> **********</Typography>
              <Link to="/password/update" style={{ textDecoration: "none" }}>
                <Button variant="contained" sx={{ mt: 1 }} fullWidth className="mainButton">
                  Update Password
                </Button>
              </Link>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Logout Section */}
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Log out from all devices
              </Typography>
              <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
                This will log you out from all browsers. You'll need to log in again.
              </Typography>
              <Button
                variant="contained"
                color="error"
                startIcon={<LogoutIcon />}
                onClick={logoutHandler}
                fullWidth
                className="mainButton"
              >
                Logout
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
