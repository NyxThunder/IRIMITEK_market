// import React, { useEffect, useState, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useAlert } from "react-alert";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import MetaData from "../../layouts/MataData/MataData";
// import Loader from "../../layouts/loader/Loader";
// import Sidebar from "../Siderbar";
// import Navbar from "../Navbar";
// import { importApi, clearErrors } from "../../../actions/apiAction";
// import useFormValidation from "../../hook/useFormValidation";

// import {
//   Avatar,
//   TextField,
//   Typography,
//   Button,
//   Grid,
//   Card,
//   InputAdornment,
//   FormControlLabel,
//   Switch,
//   Box
// } from "@mui/material";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css"; // DatePicker styles
// import { IMPORT_API_RESET } from "../../../constants/apiConstatns";

// function ImportAPI() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const alert = useAlert();
//   const { id } = useParams();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const apiName = queryParams.get("name");
//   const [toggle, setToggle] = useState(false);
//   const error = null;

//   const { loading: loading, error: importError, imported } = useSelector(
//     (state) => state.importApi
//   );

//   // Validation rules
//   const validationRules = {
//     page: (value) => (value < 1 ? "Page number must be at least 1." : ""),
//     minPriceFrom: (value) => (value < 0 ? "Price must be non-negative." : ""),
//     minPriceTo: (value) => (value < 0 ? "Price must be non-negative." : ""),
//     minQty: (value) => (value < 0 ? "Quantity must be non-negative." : ""),
//     updatedAtFrom: (value) => (!value ? "Please select a start date." : ""),
//     updatedAtTo: (value) => (!value ? "Please select an end date." : ""),
//   };

//   const { values, setValues, errors, handleChange, validateForm } = useFormValidation(
//     {
//       page: 1,
//       minPriceFrom: 0,
//       minPriceTo: 1000,
//       minQty: 0,
//       includeOutOfStock: false,
//       updatedAtFrom: new Date(0),
//       updatedAtTo: new Date(),
//     },
//     validationRules,
//     { imageValidation: false }
//   );

//   const toggleHandler = () => setToggle(!toggle);

//   const redirectToAPIDashboard = useCallback(() => {
//     navigate("/admin/api_integration");
//   }, [navigate]);

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }
//     if (importError) {
//       alert.error(importError);
//       alert.error("Please connect first. later.");
//       dispatch(clearErrors());
//     }
//     if (imported) {
//       alert.success("API Imported Successfully!");
//       navigate("/admin/api_integration");
//       dispatch({ type: IMPORT_API_RESET });
//     }
//   }, [dispatch, alert, error, importError, imported, navigate]);

//   const createApiSubmitHandler = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const myForm = new FormData();
//     Object.keys(values).forEach((key) => myForm.set(key, values[key]));

//     const token = localStorage.getItem(`${apiName}token`);
//     if (token) {
//       dispatch(importApi(id, token, myForm));
//     }
//   };

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           <MetaData title={"Import API"} />
//           <Grid container spacing={2} justifyContent="center" sx={{ px: 2 }}>
//             {/* Sidebar */}
//             <Grid item md={3} lg={3} xl={3} className={!toggle ? "firstBox" : "toggleBox"}>
//               <Sidebar />
//             </Grid>

//             {/* Main Content */}
//             <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
//               {/* Navbar */}
//               <Grid item xs={12} sm={12}>
//                 <Navbar toggleHandler={toggleHandler} />
//               </Grid>

//               {/* Form Section */}
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12}>
//                   <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
//                     <form onSubmit={createApiSubmitHandler}>
//                       <Avatar sx={{ bgcolor: "black", mx: "auto", mb: 1 }}>
//                         <AddCircleOutlineIcon />
//                       </Avatar>
//                       <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}>
//                         Import API Filters
//                       </Typography>


//                       {/* Page Number */}
//                       <TextField
//                         variant="outlined"
//                         fullWidth
//                         label="Page Number"
//                         type="number"
//                         name="page"
//                         value={values.page}
//                         onChange={handleChange}
//                         error={!!errors.page}
//                         helperText={errors.page}
//                         sx={{ mb: 2, width: "100%" }}
//                       />

//                       {/* Min Price From */}

//                       <TextField
//                         variant="outlined"
//                         fullWidth
//                         label="Min Price From"
//                         required
//                         type="number"
//                         name="minPriceFrom"
//                         value={values.minPriceFrom}
//                         onChange={handleChange}
//                         error={!!errors.minPriceFrom}
//                         helperText={errors.minPriceFrom}
//                         InputProps={{
//                           startAdornment: <InputAdornment position="start">$</InputAdornment>,
//                         }}
//                         sx={{ mb: 2, width: "100%" }}
//                       />

//                       {/* Min Price To */}
//                       <TextField
//                         variant="outlined"
//                         fullWidth
//                         label="Min Price To"
//                         type="number"
//                         name="minPriceTo"
//                         value={values.minPriceTo}
//                         onChange={handleChange}
//                         // error={!!errors.minPriceTo}
//                         // helperText={errors.minPriceTo}
//                         InputProps={{
//                           startAdornment: <InputAdornment position="start">$</InputAdornment>,
//                         }}
//                         sx={{ mb: 2, width: "100%" }}
//                       />

//                       {/* Min Quantity */}
//                       <TextField
//                         variant="outlined"
//                         fullWidth
//                         label="Min Quantity"
//                         type="number"
//                         name="minQty"
//                         value={values.minQty}
//                         onChange={handleChange}
//                         error={!!errors.minQty}
//                         helperText={errors.minQty}
//                         sx={{ mb: 2, width: "100%" }}
//                       />

//                       {/* Include Out of Stock */}
//                       <FormControlLabel
//                         control={
//                           <Switch
//                             name="includeOutOfStock"
//                             checked={values.includeOutOfStock}
//                             onChange={handleChange}
//                           />
//                         }
//                         label="Include Out of Stock"
//                         sx={{ mb: 2, width: "100%" }}
//                       />

//                       {/* Updated At From */}
//                       <Typography>Updated At (From)</Typography>
//                       <DatePicker
//                         selected={values.updatedAtFrom}
//                         onChange={(date) => handleChange({ target: { name: "updatedAtFrom", value: date } })}
//                         className="datePicker"
//                         sx={{ mb: 2, width: "100%" }}
//                       />

//                       {/* Updated At To */}
//                       <Typography>Updated At (To)</Typography>
//                       <DatePicker
//                         selected={values.updatedAtTo}
//                         onChange={(date) => handleChange({ target: { name: "updatedAtTo", value: date } })}
//                         className="datePicker"
//                         sx={{ mb: 2, width: "100%" }}
//                       />

//                       {/* Submit Button */}
//                       <Button variant="contained" fullWidth type="submit" sx={{ mt: 3 }} className="mainButton">
//                         Import
//                       </Button>
//                     </form>
//                   </Card>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//         </>
//       )}
//     </>
//   );
// }

// export default ImportAPI;



import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import MetaData from "../../layouts/MataData/MataData";
import Loader from "../../layouts/loader/Loader";
import Sidebar from "../Siderbar";
import Navbar from "../Navbar";
import { importApi, clearErrors } from "../../../actions/apiAction";
import useFormValidation from "../../hook/useFormValidation";
import {
  Avatar,
  TextField,
  Typography,
  Button,
  Grid,
  Card,
  InputAdornment,
  FormControlLabel,
  Switch,
  Box,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IMPORT_API_RESET } from "../../../constants/apiConstatns";

function ImportAPI() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const apiName = queryParams.get("name");
  const [toggle, setToggle] = useState(false);

  // Get loading & errors from Redux
  const { loading, error: importError, imported } = useSelector((state) => state.importApi);

  // Validation rules
  const validationRules = {
    page: (value) => (value < 1 ? "Page number must be at least 1." : ""),
    minPriceFrom: (value) => (value < 0 ? "Price must be non-negative." : ""),
    minPriceTo: (value) => (value < 0 ? "Price must be non-negative." : ""),
    minQty: (value) => (value < 0 ? "Quantity must be non-negative." : ""),
    updatedAtFrom: (value) => (!value ? "Please select a start date." : ""),
    updatedAtTo: (value) => (!value ? "Please select an end date." : ""),
  };

  const { values, setValues, errors, handleChange, validateForm } = useFormValidation(
    {
      page: 1,
      minPriceFrom: 0,
      minPriceTo: 1000,
      minQty: 0,
      includeOutOfStock: false,
      updatedAtFrom: new Date(0),
      updatedAtTo: new Date(),
    },
    validationRules,
    { imageValidation: false }
  );

  const toggleHandler = () => setToggle(!toggle);

  const redirectToAPIDashboard = useCallback(() => {
    navigate("/admin/api_integration");
  }, [navigate]);

  useEffect(() => {
    if (importError) {
      alert.error(importError);
      alert.error("Please connect first. later.");
      dispatch(clearErrors());
    }
    if (imported) {
      alert.success("API Imported Successfully!");
      navigate("/admin/api_integration");
      dispatch({ type: IMPORT_API_RESET });
    }
  }, [dispatch, alert, importError, imported, navigate]);

  const createApiSubmitHandler = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const myForm = new FormData();
    Object.keys(values).forEach((key) => myForm.set(key, values[key]));

    const token = localStorage.getItem(`${apiName}token`);
    if (token) {
      dispatch(importApi(id, token, myForm));
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Import API"} />
          <Grid container spacing={2} justifyContent="center" sx={{ px: 2 }}>
            {/* Sidebar */}
            <Grid item md={3} lg={3} xl={3} className={!toggle ? "firstBox" : "toggleBox"}>
              <Sidebar />
            </Grid>

            {/* Main Content */}
            <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
              {/* Navbar */}
              <Grid item xs={12} sm={12}>
                <Navbar toggleHandler={toggleHandler} />
              </Grid>

              {/* Form Section */}
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                    <form onSubmit={createApiSubmitHandler}>
                      <Avatar sx={{ bgcolor: "black", mx: "auto", mb: 1 }}>
                        <AddCircleOutlineIcon />
                      </Avatar>
                      <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}>
                        Import API Filters
                      </Typography>

                      {/* Page Number */}
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Page Number"
                        type="number"
                        name="page"
                        value={values.page}
                        onChange={handleChange}
                        error={!!errors.page}
                        helperText={errors.page}
                        sx={{ mb: 2 }}
                      />

                      {/* Min Price From */}
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Min Price From"
                        required
                        type="number"
                        name="minPriceFrom"
                        value={values.minPriceFrom}
                        onChange={handleChange}
                        error={!!errors.minPriceFrom}
                        helperText={errors.minPriceFrom}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        sx={{ mb: 2 }}
                      />

                      {/* Min Price To */}
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Min Price To"
                        type="number"
                        name="minPriceTo"
                        value={values.minPriceTo}
                        onChange={handleChange}
                        error={!!errors.minPriceTo}
                        helperText={errors.minPriceTo}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        sx={{ mb: 2 }}
                      />

                      {/* Min Quantity */}
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Min Quantity"
                        type="number"
                        name="minQty"
                        value={values.minQty}
                        onChange={handleChange}
                        error={!!errors.minQty}
                        helperText={errors.minQty}
                        sx={{ mb: 2 }}
                      />

                      {/* Include Out of Stock */}
                      <FormControlLabel
                        control={
                          <Switch
                            name="includeOutOfStock"
                            checked={values.includeOutOfStock}
                            onChange={(e) =>
                              setValues((prev) => ({ ...prev, includeOutOfStock: e.target.checked }))
                            }
                          />
                        }
                        label="Include Out of Stock"
                        sx={{ mb: 2 }}
                      />

                      {/* Updated At From */}
                      <Typography>Updated At (From)</Typography>
                      <DatePicker
                        selected={values.updatedAtFrom}
                        onChange={(date) => setValues((prev) => ({ ...prev, updatedAtFrom: date }))}
                        className="datePicker"
                        sx={{ mb: 2 }}
                      />

                      {/* Updated At To */}
                      <Typography>Updated At (To)</Typography>
                      <DatePicker
                        selected={values.updatedAtTo}
                        onChange={(date) => setValues((prev) => ({ ...prev, updatedAtTo: date }))}
                        className="datePicker"
                        sx={{ mb: 2 }}
                      />

                      {/* Submit Button */}
                      <Button variant="contained" fullWidth type="submit" sx={{ mt: 3 }} className="mainButton">
                        Import
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

export default ImportAPI;
