import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";
import Sidebar from "./Siderbar";
import {
  updateProduct,
  clearErrors,
  getProductDetails,
} from "../../actions/productAction";
import { useNavigate} from "react-router-dom";
import { UPDATE_PRODUCT_RESET } from "../../constants/productsConstatns";
import { useParams } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CollectionsIcon from "@mui/icons-material/Collections";
import Select from "@mui/material/Select";
import InfoIcon from "@mui/icons-material/Info";
import MenuItem from "@mui/material/MenuItem";
import Navbar from "./Navbar";
import "../User/LoginFromStyle.css";

function UpdateAPI() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  const alert = useAlert();


  const { id: apiId } = useParams();
  const { error, api } = useSelector((state) => state.apis);

  const { loading, error: updateError, isUpdated } = useSelector(
    (state) => state.deleteUpdateApi
  );

  const [name, setName] = useState("");
  const [clientId, setClientId] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  
  useEffect(() => {
    if (apiId && api._id !== apiId) {
      dispatch(getProductDetails(apiId));
    } else {
      setName(api.name);
      setClientId(api.clientId);
      setClientSecret(api.clientSecret);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("API Updated Successfully");
      navigateRef.current("/admin/api_integration");
      dispatch({ type: UPDATE_API_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    isUpdated,
    apiId,
    api,
    updateError,
  ]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("clientId", clientId);
    myForm.set("clientSecret", clientSecret);

    dispatch(updateApi(apiId, myForm));
  };

  // togle handler =>
  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <>
            <MetaData title="Update Api" />
            <div className="updateProduct">
              <div
                className={
                  !toggle ? "firstBox1" : "toggleBox1"
                }
              >
                <Sidebar />
              </div>
              <div className="secondBox1">
                <div className="navBar1">
                  <Navbar toggleHandler={toggleHandler} />
                </div>

                <div
                  className={"formContainer formContainer2"}
                >
                  <form
                    className={"form form2"}
                    encType="multipart/form-data"
                  >
                    <Avatar className="avatar">
                      <AddCircleOutlineIcon />
                    </Avatar>
                    <Typography
                      variant="h5"
                      component="h1"
                      className="heading"
                    >
                      Create API
                    </Typography>
                    {/* SpellcheckIcon */}
                    <TextField
                      variant="outlined"
                      fullWidth
                      className={"nameInput textField"}
                      label="API Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <ShoppingCartOutlinedIcon
                              style={{
                                fontSize: 20,
                                color: "#414141",
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      variant="outlined"
                      fullWidth
                      className={"nameInput textField"}
                      label="Client Id"
                      required
                      value={clientId}
                      onChange={(e) => setClientId(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <ShoppingCartOutlinedIcon
                              style={{
                                fontSize: 20,
                                color: "#414141",
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      variant="outlined"
                      label="Client Secret"
                      value={clientSecret}
                      required
                      fullWidth
                      className={"passwordInput textField"}
                      onChange={(e) => setClientSecret(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            style={{
                              fontSize: 20,
                              color: "#414141",
                            }}
                          >
                            <AttachMoneyIcon />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Button
                      variant="contained"
                      className="loginButton"
                      fullWidth
                      onClick={createProductSubmitHandler}
                      disabled={loading ? true : false}
                    >
                      Update
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </>
        </>
      )}
    </>
  );
}
export default UpdateAPI;
