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

function UpdateProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  const alert = useAlert();

  const { id: apiId } = useParams();
  const { error, product } = useSelector((state) => state.productDetails);

  const { loading, error: updateError, isUpdated } = useSelector(
    (state) => state.deleteUpdateProduct
  );

  const [name, setName] = useState("");
  const [clientId, setPrice] = useState("");
  const [clientSecret, setDescription] = useState("");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("New API Added Successfully");
      navigateRef.current("/admin/api_integration");
      dispatch({ type: UPDATE_API_INTEGRATION });
    }
  }, [
    dispatch,
    alert,
    error,
    isUpdated,
    updateError,
  ]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("id", clientId);
    myForm.set("secret", clientSecret);
    dispatch(updateProduct(apiId, myForm));
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
            <MetaData title="Add new" />
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
                      Connect New API
                    </Typography>
                    {/* SpellcheckIcon */}
                    <TextField
                      variant="outlined"
                      fullWidth
                      className={"nameInput textField"}
                      label="Account Name"
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
                      label="Client ID"
                      value={clientId}
                      required
                      fullWidth
                      className={"nameInput textField"}
                      onChange={(e) => setPrice(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            style={{
                              fontSize: 20,
                              color: "#414141",
                            }}
                          >
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      variant="outlined"
                      label="Client Secret"
                      value={clientSecret}
                      required
                      className={"passwordInput textField"}
                      onChange={(e) => setStock(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            style={{
                              fontSize: 20,
                              color: "#414141",
                            }}
                          >
                            <StorageIcon />
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
                      Add
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
export default UpdateProduct;
