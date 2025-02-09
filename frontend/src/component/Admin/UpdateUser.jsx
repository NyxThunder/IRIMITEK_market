import React, { useEffect, useState, useRef } from "react";
import { useAlert } from "react-alert";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layouts/MataData/MataData";
import Navbar from "./Navbar";
import Sidebar from "./Siderbar";
import { UPDATE_USER_RESET } from "../../constants/userConstanat";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../actions/userAction";
import Loader from "../layouts/loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  InputAdornment,
  MenuItem,
  Select,
} from "@mui/material";
import "./UpdateUser.css";

function UpdateUser() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const { loading: updateLoading, error: updateError, isUpdated } = useSelector(
    (state) => state.profileData
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [toggle, setToggle] = useState(false);
  // togle handler =>
  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };

  useEffect(() => {
    // initial value user Details  getting initially user._id will be undefind then call will occures  g(etUserDetails(id)
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
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
      alert.success("User Updated Successfully");
      navigateRef.current("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update User" />
          <div className="updateUser1">
            <div
              className={
                !toggle ? "firstBox_01" : "toggleBox_01"
              }
            >
              <Sidebar />
            </div>

            <div className="secondBox_01">
              <div className="navBar_01">
                <Navbar toggleHandler={toggleHandler} />
              </div>
              <div className="formSection">
                <form
                  className="form"
                  onSubmit={updateUserSubmitHandler}
                >
                  <Avatar className="avatar">
                    <AccountCircleIcon />
                  </Avatar>
                  <Typography
                    variant="h5"
                    component="h1"
                    className="heading"
                  >
                    Update Role
                  </Typography>

                  <TextField
                    variant="outlined"
                    fullWidth
                    className="nameInput textField"
                    label="Product Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}

                  />

                  <TextField
                    variant="outlined"
                    fullWidth
                    className="nameInput textField"
                    label="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <MailOutlineIcon
                            style={{
                              fontSize: 20,
                              color: "#414141",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <div style={{ position: "relative" }}>
                    <label
                      htmlFor="role_field"
                      style={{
                        marginLeft: "10px",
                        fontSize: "12px",
                        width: "300px",
                        color: "#414141",
                      }}
                    >
                      Role*
                    </label>
                    <Select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="select"
                      MenuProps={{
                        classes: { paper: "selectMenuPaper" }, // Update the class name here
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        getContentAnchorEl: null,
                      }}
                    >
                      <MenuItem value="">
                        <em style={{ background: "inherit", color: "#414141" }}>
                          Choose Role
                        </em>
                      </MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="user">User</MenuItem>
                    </Select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    fullWidth
                    variant="contained"
                    className="loginButton"
                    disabled={
                      updateLoading ? true : false || role === "" ? true : false
                    }
                  >
                    Update
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

export default UpdateUser;


