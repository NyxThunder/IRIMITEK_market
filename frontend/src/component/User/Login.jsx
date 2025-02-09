import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";
import "./LoginFromStyle.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { login, clearErrors } from "../../actions/userAction";
import IrimiLoader from "../layouts/loader/Loader";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import MetaData from "../layouts/MataData/MataData"

export default function Login() {

  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  const loaction = useLocation();

  const dispatch = useDispatch();
  const alert = useAlert();

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.userData
  );

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(
      newEmail !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
    );
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };


  const isSignInDisabled = !(email && password && isValidEmail);


  const redirect = loaction.search
    ? loaction.search.split("=")[1]
    : "/account";
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigateRef.current(redirect);
    }
  }, [dispatch, isAuthenticated, loading, error, alert, redirect]);

  function handleLoginSubmit(e) {
    e.preventDefault();
    dispatch(login(email, password));
  }


  return (
    <>
      <MetaData title={"Login"} />
      {loading ? (
        <IrimiLoader />
      ) : (
        <div className="formContainer">
          <form className="form">
            <Avatar className="avatar">
              <LockOpenIcon />
            </Avatar>
            <Typography variant="h5" component="h1" className="heading">
              Sign in to Your Account
            </Typography>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              className={"emailInput textField"}
              value={email}
              onChange={handleEmailChange}
              error={!isValidEmail && email !== ""}
              helperText={
                !isValidEmail && email !== ""
                  ? "Please enter a valid email address."
                  : ""
              }
            />
            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              className={"passwordInput textField"}
              InputProps={{
                endAdornment: (
                  <Button
                    variant="outlined"
                    className={"showPasswordButton"}
                    onClick={handleShowPasswordClick}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </Button>
                ),
              }}
              value={password}
              onChange={handlePasswordChange}
            />
            <Grid container className="rememberMeContainer">
              <Grid item>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Remember me"
                />
              </Grid>
              <Grid item>
                <Link
                  to="/password/forgot"
                  className="forgotPasswordLink"
                >
                  Forgot your password?
                </Link>
              </Grid>
            </Grid>
            <Typography
              variant="body2"
              className="termsAndConditionsText"
            >
              I accept the IRMITEK Terms of Use and acknowledge IRMITEK
              will use my information in accordance with its
              <Link to="/policy/privacy" className="privacyText">
                Privacy Policy.
              </Link>
            </Typography>
            <Button
              variant="contained"
              className="loginButton"
              fullWidth
              disabled={isSignInDisabled}
              onClick={handleLoginSubmit}
            >
              Sign in
            </Button>
            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: "1rem" }}
            >
              Don't have an account?
              <Link to="/signup" className="createAccount">
                Create Account
              </Link>
            </Typography>
          </form>
        </div>
      )}
    </>
  );
}
