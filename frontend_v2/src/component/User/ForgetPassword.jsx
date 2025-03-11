import React, { useState, useEffect } from 'react';
import LockClockIcon from '@mui/icons-material/LockClock';
import { TextField, Button, Typography, Avatar } from '@mui/material';
import './LoginFromStyle.css';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword, clearErrors } from '../../actions/userAction';
import NotificationService, { NotificationContainer } from '../NotificationService';
import MetaData from '../layouts/MataData/MataData';
import IrimiLoader from '../layouts/loader/Loader';

import { Link } from 'react-router-dom';

export default function ForgetPassowrd() {
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector((state) => state.forgetPassword);

  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isDone, setIsDone] = useState(false);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(newEmail !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail));
  };

  function handleforgotPasswordSubmit(e) {
    e.preventDefault();
    setIsDone(!isDone);

    const myForm = new FormData();
    myForm.set('email', email);
    dispatch(forgetPassword(myForm));
  }

  useEffect(() => {
    if (error) {
      NotificationService.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      NotificationService.success(message);
      setEmail('');
    }
  }, [dispatch, error, alert, message, loading]);

  const isSignInDisabled = !(email && isValidEmail);

  return (
    <>
      <MetaData title="Forget Password" />
      {loading ? (
        <IrimiLoader />
      ) : (
        <div className="formContainer">
          <form className="form" onSubmit={handleforgotPasswordSubmit}>
            <Avatar className="avatar">
              <LockClockIcon />
            </Avatar>
            <Typography variant="h5" component="h1" className="heading">
              Forgot your password?
            </Typography>

            {isDone && (
              <Typography variant="body1" align="center" style={{ color: '#007500' }}>
                An email regarding your password change has been sent to your email address.
              </Typography>
            )}

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              className={'emailInput textField'}
              value={email}
              onChange={handleEmailChange}
              error={!isValidEmail && email !== ''}
              helperText={
                !isValidEmail && email !== '' ? 'Please enter a valid email address.' : ''
              }
            />

            <Button
              variant="contained"
              className="loginButton"
              fullWidth
              disabled={isSignInDisabled}
              style={{ marginTop: '3rem' }}
              onClick={handleforgotPasswordSubmit}
            >
              Send email
            </Button>
            <Typography variant="body1" align="center" style={{ marginTop: '.3rem' }}>
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
