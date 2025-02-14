import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import Sidebar from "./Siderbar";
import { createApi, clearErrors } from "../../actions/apiAction";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import StorageIcon from "@mui/icons-material/Storage";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { NEW_API_RESET } from "../../constants/apiConstatns";

import Navbar from "./Navbar";
import "../User/LoginFromStyle.css";
import {
  Avatar,
  TextField,
  Typography,
  Button,
} from "@mui/material";

function NewAPI() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { loading, error, success } = useSelector(
    (state) => state.addNewAPI
  );
  const [name, setName] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [toggle, setToggle] = useState(false);

  // togle handler =>
  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };

  const redirectToAdminDashboard = useCallback(() => {
    navigate("/admin/dashboard");
  }, [navigate]);


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("API Created Successfully");
      redirectToAdminDashboard();
      dispatch({ type: NEW_API_RESET });
    }
  }, [dispatch, alert, error, redirectToAdminDashboard, success]);

  const createApiSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("clientId", clientId);
    myForm.set("clientSecret", clientSecret);

    dispatch(createApi(myForm));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"New API"} />
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
                  onSubmit={createApiSubmitHandler}
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
                          <StorageIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    variant="contained"
                    className="loginButton"
                    fullWidth
                    type="submit"
                    disabled={loading ? true : false}
                  >
                    Create
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default NewAPI;
