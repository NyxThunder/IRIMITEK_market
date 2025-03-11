import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearErrors } from '../../actions/userAction';
import NotificationService, { NotificationContainer } from '../NotificationService';
import MetaData from '../layouts/MataData/MataData';
import { useNavigate, useParams } from 'react-router-dom';
import IrimiLoader from '../layouts/loader/Loader';
import { Avatar, Button, TextField, Typography } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import './LoginFromStyle.css';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  const dispatch = useDispatch();

  const { error, success, loading } = useSelector((state) => state.forgetPassword);

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(true);
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setIsValidPassword(event.target.value.length >= 8);
  };
  const handleConfirmPasswordChange = (event) => {
    setconfirmPassword(event.target.value);
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (error) {
      NotificationService.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      NotificationService.success('Password Updated Successfully');
      navigateRef.current('/login');
    }
  }, [dispatch, error, alert, success]);

  // submit handler
  function resetPasswordSubmitHandler(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      NotificationService.error('Password and Confirm Password do not match');
      return;
    }
    const myForm = new FormData();
    myForm.set('password', password);
    myForm.set('confirmPassword', confirmPassword);

    dispatch(resetPassword(token, myForm));
  }

  const isSignInDisabled = !(password && confirmPassword && isValidPassword);

  return (
    <>
      <MetaData title="Reset Password" />
      {loading ? (
        <IrimiLoader />
      ) : (
        <div className="formContainer">
          <form className="form">
            <Avatar className="avatar">
              <LockResetIcon />
            </Avatar>
            <Typography variant="h5" component="h1" className="heading">
              Reset Password
            </Typography>

            <TextField
              style={{ marginTop: '1rem' }}
              label="Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              className={'passwordInput textField'}
              error={!isValidPassword && password !== ''}
              helperText={
                !isValidPassword && password !== '' ? 'Password must be at least 8 characters.' : ''
              }
              InputProps={{
                endAdornment: (
                  <Button
                    variant="outlined"
                    className="showPasswordButton"
                    onClick={handleShowPasswordClick}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </Button>
                )
              }}
              value={password}
              onChange={handlePasswordChange}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              className={'passwordInput textField'}
              InputProps={{
                endAdornment: (
                  <Button
                    variant="outlined"
                    className="showPasswordButton"
                    onClick={handleShowPasswordClick}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </Button>
                )
              }}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />

            <Button
              variant="contained"
              className="loginButton"
              fullWidth
              disabled={isSignInDisabled}
              style={{ marginTop: '3.5rem' }}
              onClick={resetPasswordSubmitHandler}
            >
              Confirm New Password
            </Button>
            <Typography variant="body1" align="center" style={{ marginTop: '.5rem' }}>
              <Link to="/login" className="createAccount">
                Cancel
              </Link>
            </Typography>
          </form>
        </div>
      )}
    </>
  );
}

export default ResetPassword;
