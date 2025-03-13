// import React, { useState, useEffect, useRef } from 'react';
// import {
//   TextField,
//   FormControlLabel,
//   Checkbox,
//   Button,
//   Typography,
//   Grid,
//   Avatar
// } from '@mui/material';
// import './LoginFromStyle.css';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import LockOpenIcon from '@mui/icons-material/LockOpen';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { login, clearErrors } from '../../actions/userAction';
// import IrimiLoader from '../layouts/loader/Loader';
// import NotificationService, { NotificationContainer } from '../NotificationService';
// import { Link } from 'react-router-dom';
// import MetaData from '../layouts/MataData/MataData';

// export default function Login() {
//   const navigate = useNavigate();
//   const navigateRef = useRef(navigate);
//   const loaction = useLocation();

//   const dispatch = useDispatch();

//   const { isAuthenticated, loading, error } = useSelector((state) => state.userData);

//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isValidEmail, setIsValidEmail] = useState(true);

//   const handleEmailChange = (event) => {
//     const newEmail = event.target.value;
//     setEmail(newEmail);
//     setIsValidEmail(newEmail !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail));
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleShowPasswordClick = () => {
//     setShowPassword(!showPassword);
//   };

//   const isSignInDisabled = !(email && password && isValidEmail);

//   const redirect = loaction.search ? loaction.search.split('=')[1] : '/account';
//   useEffect(() => {
//     if (error) {
//       NotificationService.error(error);
//       dispatch(clearErrors());
//     }

//     if (isAuthenticated) {
//       navigateRef.current(redirect);
//     }
//   }, [dispatch, isAuthenticated, loading, error, alert, redirect]);

//   function handleLoginSubmit(e) {
//     e.preventDefault();
//     dispatch(login(email, password));
//   }

//   return (
//     <>
//       <MetaData title={'Login'} />
//       {loading ? (
//         <IrimiLoader />
//       ) : (
//         <div className="formContainer">
//           <form className="form">
//             <Avatar className="avatar">
//               <LockOpenIcon />
//             </Avatar>
//             <Typography variant="h5" component="h1" className="heading">
//               Sign in to Your Account
//             </Typography>
//             <TextField
//               label="Email"
//               variant="outlined"
//               fullWidth
//               className={'emailInput textField'}
//               value={email}
//               onChange={handleEmailChange}
//               error={!isValidEmail && email !== ''}
//               helperText={
//                 !isValidEmail && email !== '' ? 'Please enter a valid email address.' : ''
//               }
//             />
//             <TextField
//               label="Password"
//               variant="outlined"
//               type={showPassword ? 'text' : 'password'}
//               fullWidth
//               className={'passwordInput textField'}
//               InputProps={{
//                 endAdornment: (
//                   <Button
//                     variant="outlined"
//                     className={'showPasswordButton'}
//                     onClick={handleShowPasswordClick}
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </Button>
//                 )
//               }}
//               value={password}
//               onChange={handlePasswordChange}
//             />
//             <Grid container className="rememberMeContainer">
//               <Grid item>
//                 <FormControlLabel control={<Checkbox color="primary" />} label="Remember me" />
//               </Grid>
//               <Grid item>
//                 <Link to="/password/forgot" className="forgotPasswordLink">
//                   Forgot your password?
//                 </Link>
//               </Grid>
//             </Grid>
//             <Typography variant="body2" className="termsAndConditionsText">
//               I accept the IRMITEK Terms of Use and acknowledge IRMITEK will use my information in
//               accordance with its
//               <Link to="/policy/privacy" className="privacyText">
//                 Privacy Policy.
//               </Link>
//             </Typography>
//             <Button
//               variant="contained"
//               className="loginButton"
//               fullWidth
//               disabled={isSignInDisabled}
//               onClick={handleLoginSubmit}
//             >
//               Sign in
//             </Button>
//             <Typography variant="body1" align="center" style={{ marginTop: '1rem' }}>
//               Don't have an account?
//               <Link to="/signup" className="createAccount">
//                 Create Account
//               </Link>
//             </Typography>
//           </form>
//         </div>
//       )}
//     </>
//   );
// }

import React, { useState, useEffect, useRef } from 'react';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Grid,
  Avatar,
  Box,
  InputAdornment,
  IconButton,
  Divider
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { login, clearErrors } from '../../actions/userAction';
import Loader from '../../ui-component/Loader';
import NotificationService, { NotificationContainer } from '../NotificationService';
import MetaData from '../layouts/MataData/MataData';
import AnimateButton from '../../ui-component/extended/AnimateButton';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import GoogleIcon from '@mui/icons-material/Google';
import { useTheme } from '@mui/material/styles';
import Customization from '../../layout/Customization';

export default function Login() {
  const theme = useTheme();
  console.log(theme.palette.primary);
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  const location = useLocation();
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);

  const { isAuthenticated, loading, error } = useSelector((state) => state.userData);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(newEmail !== '' && /^[^\s@]+@[^\s@]+$/.test(newEmail));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const isSignInDisabled = !(email && password && isValidEmail);

  const redirect = location.search ? location.search.split('=')[1] : '/account';

  useEffect(() => {
    if (error) {
      NotificationService.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigateRef.current(redirect);
    }
  }, [dispatch, isAuthenticated, loading, error, redirect]);

  function handleLoginSubmit(e) {
    e.preventDefault();
    dispatch(login(email, password));
  }

  return (
    <>
      <MetaData title={'Signin'} />
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: theme.palette.background.default
          }}
        >
          <Customization />
          <Box
            sx={{
              width: { xs: '90%', sm: '400px' },
              padding: 4,
              boxShadow: 3,
              borderRadius: customization.borderRadius,
              backgroundColor: theme.palette.background.paper,
              textAlign: 'center'
            }}
          >
            {/* Lock Icon Avatar */}
            <Avatar sx={{ bgcolor: theme.palette.secondary.main, color: theme.palette.grey[50], margin: '0 auto' }}>
              <LockOpenIcon />
            </Avatar>
            <Typography variant="h4" fontWeight="bold" mt={2} color={theme.palette.text.secondary}>
              Sign in to Your Account
            </Typography>


            {/* Login Form */}
            <form onSubmit={handleLoginSubmit}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
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
                margin="normal"
                value={password}
                onChange={handlePasswordChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPasswordClick} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              {/* Remember Me & Forgot Password */}
              <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                <Grid item>
                  <FormControlLabel control={<Checkbox color="secondary" />} label="Remember me" />
                </Grid>
                <Grid item>
                  <Link
                    to="/password/forgot"
                    style={{ textDecoration: 'none', color: theme.palette.secondary.main }}
                  >
                    Forgot your password?
                  </Link>
                </Grid>
              </Grid>

              {/* Login Button */}
              <AnimateButton>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{
                    mt: 3,
                    py: 1.5,
                  }}
                  type="submit"
                >
                  Sign in
                </Button>
              </AnimateButton>
              <Divider sx={{ flexGrow: 1, mt: 2, mb: 2 }} orientation="horizontal" />
              {/* Signup Link */}
              <Typography variant="body1" sx={{ mt: 2 }}>
                Don&apos;t have an account?{' '}
                <Link
                  to="/signup"
                  style={{ textDecoration: 'none', color: theme.palette.secondary.main }}
                >
                  Create Account
                </Link>
              </Typography>
            </form>
          </Box>
        </Box>
      )}
    </>
  );
}
