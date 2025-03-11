import React, { useState, useEffect, useRef } from 'react';
import {
  Avatar,
  Button,
  Checkbox,
  TextField,
  FormControlLabel,
  Grid,
  Typography
} from '@mui/material';
import IrimiLoader from '../layouts/loader/Loader';
import MetaData from '../layouts/MataData/MataData';
import { Link } from 'react-router-dom';
import { signUp, clearErrors } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import NotificationService, { NotificationContainer } from '../NotificationService';
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './LoginFromStyle.css';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidName, setIsValidName] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [loading, setLoading] = useState(false);

  const [areCheckboxesChecked, setAreCheckboxesChecked] = useState({
    checkbox1: false,
    checkbox2: false
  });
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);

  const dispatch = useDispatch();

  const { isAuthenticated, error } = useSelector((state) => state.userData);

  useEffect(() => {
    if (error) {
      NotificationService.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      NotificationService.success('User Registered Successfully');
      navigateRef.current('/account');
    }
  }, [dispatch, isAuthenticated, loading, error, alert]);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(newEmail !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      };
    }
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    setIsValidName(newName.length >= 4 && newName.length <= 20);
  };
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

  const handleShowConfirmPasswordClick = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleCheckboxChange = (checkboxName) => (event) => {
    setAreCheckboxesChecked((prevState) => ({
      ...prevState,
      [checkboxName]: event.target.checked
    }));
  };

  let isSignInDisabled = !(
    email &&
    password &&
    isValidEmail &&
    confirmPassword &&
    name &&
    isValidName &&
    areCheckboxesChecked.checkbox1 &&
    areCheckboxesChecked.checkbox2
  );

  function handleSignUpSubmit(e) {
    setLoading(true);
    e.preventDefault();

    if (password !== confirmPassword) {
      NotificationService.error('Password and Confirm Password do not match');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('password', password);
    formData.set('avatar', avatar);

    dispatch(signUp(formData));
    setLoading(false);
  }

  return (
    <>
      <MetaData title={'Sign Up'} />
      {loading ? (
        <IrimiLoader />
      ) : (
        <div className="formContainer">
          <form className="form">
            <Avatar className="avatar">
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" component="h1" className="heading">
              Sign Up for an Account !
            </Typography>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              className={'nameInput textField'}
              value={name}
              onChange={handleNameChange}
              error={!isValidName && name !== ''}
              helperText={
                !isValidName && name !== '' ? 'Name must be between 4 and 20 characters.' : ''
              }
            />

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
            <TextField
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
              type={showConfirmPassword ? 'text' : 'password'}
              fullWidth
              className={'passwordInput textField'}
              InputProps={{
                endAdornment: (
                  <Button
                    variant="outlined"
                    className="showPasswordButton"
                    onClick={handleShowConfirmPasswordClick}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </Button>
                )
              }}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />

            <div className="root">
              <Avatar alt="Avatar Preview" src={avatarPreview} className="avatar2" />
              <input
                accept="image/*"
                className="input"
                id="avatar-input"
                type="file"
                onChange={handleAvatarChange}
              />
              <label htmlFor="avatar-input">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CloudUploadIcon style={{ color: '#FFFFFF' }} />}
                  component="span"
                  className="uploadAvatarButton"
                >
                  <p className="uploadAvatarText">Upload Avatar</p>
                </Button>
              </label>
            </div>

            <Grid container className="gridcheckbox" justify="flex-start" alignItems="center">
              <Grid item>
                <FormControlLabel
                  control={<Checkbox />}
                  label="I Accept The IRMITEK Terms & Conditions"
                  className="checkbox"
                  checked={areCheckboxesChecked.checkbox1}
                  onChange={handleCheckboxChange('checkbox1')}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={<Checkbox />}
                  label="I Accept The IRMITEK Terms Of Use"
                  className="checkbox"
                  checked={areCheckboxesChecked.checkbox2}
                  onChange={handleCheckboxChange('checkbox2')}
                />
              </Grid>
            </Grid>

            <Typography variant="body2" className="termsAndConditionsText">
              I acknowledge IRMITEK will use my information in accordance with its
              <Link href="#" className="privacyText">
                Privacy Policy.
              </Link>
            </Typography>

            <Button
              variant="contained"
              className="loginButton"
              fullWidth
              onClick={handleSignUpSubmit}
              disabled={isSignInDisabled || loading}
            >
              Create Account
            </Button>

            <Typography variant="body1" align="center" style={{ marginTop: '1rem' }}>
              Already have an account?
              <Link to="/login" className="createAccount">
                Login
              </Link>
            </Typography>
          </form>
        </div>
      )}
    </>
  );
}

export default Signup;
