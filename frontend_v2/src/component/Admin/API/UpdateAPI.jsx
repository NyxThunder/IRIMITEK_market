import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotificationService, { NotificationContainer } from '../../NotificationService';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '../../layouts/MataData/MataData';
import Loader from '../../layouts/loader/Loader';
import Sidebar from '../Siderbar';
import Navbar from '../Navbar';
import { updateApi, getApiDetails, clearErrors } from '../../../actions/apiAction';
import { UPDATE_API_RESET } from '../../../constants/apiConstatns';
import useFormValidation from '../../hook/useFormValidation';

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
  FormHelperText
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import StorageIcon from '@mui/icons-material/Storage';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

function UpdateAPI() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const { loading, error, api } = useSelector((state) => state.apiDetails);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated
  } = useSelector((state) => state.deleteUpdateApi);
  const [toggle, setToggle] = useState(false);

  const categories = [
    'G2A',
    'KeySender',
    'Amazon',
    'Flipkart',
    'Ebay',
    'Walmart',
    'Shopify',
    'AliExpress',
    'BestBuy',
    'Others'
  ];

  // Validation rules
  const validationRules = {
    name: (value) => (!value ? 'Please select an API category.' : ''),
    clientId: (value) =>
      !value.trim() || value.length < 5 ? 'Client ID must be at least 5 characters.' : '',
    clientSecret: (value) =>
      !value.trim() || value.length < 8 ? 'Client Secret must be at least 8 characters.' : ''
  };

  const { values, setValues, errors, handleChange, validateForm } = useFormValidation(
    { name: '', clientId: '', clientSecret: '' },
    validationRules,
    { imageValidation: false }
  );

  const toggleHandler = () => setToggle(!toggle);

  useEffect(() => {
    if (!api || api._id !== id) {
      dispatch(getApiDetails(id));
    }
  }, [dispatch, id, api]); // ✅ Include `api` to ensure re-fetching when needed

  useEffect(() => {
    if (api && api._id === id) {
      setValues((prevValues) => ({
        ...prevValues,
        name: api?.name || '',
        clientId: api.clientId || '',
        clientSecret: api.clientSecret || ''
      }));
    }
  }, [api, id]); // ✅ Ensures it only runs when `api` data is ready

  useEffect(() => {
    if (error) {
      NotificationService.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      NotificationService.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      NotificationService.success('API Updated Successfully');
      navigate('/admin/api_integration');
      dispatch({ type: UPDATE_API_RESET });
    }
  }, [dispatch, alert, error, updateError, isUpdated, navigate]);

  const updateApiSubmitHandler = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const myForm = new FormData();
    Object.keys(values).forEach((key) => myForm.set(key, values[key]));

    dispatch(updateApi(id, myForm));
  };

  return (
    <>
      {loading || updateLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={'Update API'} />
          <Grid container spacing={2} justifyContent="center" sx={{ px: 2 }}>
            {/* Sidebar - 25% on `md+`, hidden on `sm` */}
            <Grid item md={3} lg={3} xl={3} className={!toggle ? 'firstBox' : 'toggleBox'}>
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
                    <form onSubmit={updateApiSubmitHandler}>
                      <Avatar sx={{ bgcolor: 'black', mx: 'auto', mb: 1 }}>
                        <EditIcon />
                      </Avatar>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 'bold', color: '#414141', mb: 2, textAlign: 'center' }}
                      >
                        Update API
                      </Typography>

                      {/* API Name */}
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <Select
                          name="category"
                          value={values.name}
                          onChange={handleChange}
                          error={!!errors.name}
                        >
                          <MenuItem value="">
                            <em>Choose API Category</em>
                          </MenuItem>
                          {categories.map((cate) => (
                            <MenuItem key={cate} value={cate}>
                              {cate}
                            </MenuItem>
                          ))}
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
                              <StorageIcon sx={{ fontSize: 20, color: '#414141' }} />
                            </InputAdornment>
                          )
                        }}
                      />

                      {/* Submit Button */}
                      <Button
                        className="mainButton"
                        variant="contained"
                        fullWidth
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

export default UpdateAPI;
