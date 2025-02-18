import React, { useState, useEffect, useRef } from "react";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import IrimiLoader from "../layouts/loader/Loader";
import {
  clearErrors,
  updateProfile,
  load_UserProfile,
} from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstanat";
import MetaData from "../layouts/MataData/MataData";
import { useNavigate} from "react-router-dom";
import UpdateIcon from "@mui/icons-material/Update";
import "./LoginFromStyle.css";
import { Link } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function UpdateProfile() {
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, isUpdated, loading } = useSelector(
    (state) => state.profileData
  );
  const { user } = useSelector((state) => state.userData);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidName, setIsValidEName] = useState(true);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [originalData, setOriginalData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar?.url || "https://res.cloudinary.com/drosmiklv/image/upload/v1739068351/default_avatar_pd5xgd.jpg",
  });

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(
      newEmail !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
    );
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
    setName(event.target.value);
    setIsValidEName(event.target.value.length >= 4);
  };


  // Check if any change was made before enabling the submit button
  const isProfileChanged =
    name !== originalData.name ||
    email !== originalData.email ||
    avatar !== originalData.avatar;


  const UpdateProfileSubmitHandler = (e) => {
    e.preventDefault();
    if (!isProfileChanged) {
      alert.info("No changes detected!");
      return;
    }

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);

    dispatch(updateProfile(myForm));
  };

  useEffect(() => {
    // let say if user not update name and change other data then we setting all data from prv user data initaily for name , email, avatar

    if (user) {
      // console.log(user, "user");
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar?.url || "https://res.cloudinary.com/drosmiklv/image/upload/v1739068351/default_avatar_pd5xgd.jpg");
      setOriginalData({
        name: user.name,
        email: user.email,
        avatar: user.avatar?.url || "https://res.cloudinary.com/drosmiklv/image/upload/v1739068351/default_avatar_pd5xgd.jpg",
      });
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    // isUpadted is nothing But success message from response. once user updated then pop the message and show profile data
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      // now get user New data from backend
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });

      // now reset all value . eg : isUpdate : false and all
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });

      navigateRef.current("/account");

      dispatch(load_UserProfile());
    }
  }, [dispatch, error, alert, user, isUpdated]);

  const isSignInDisabled = !(email && isValidEmail && name && isValidName);

  return (
    <>
      <MetaData title="Update Profile" />
      {loading ? (
        <IrimiLoader />
      ) : (
        <div className="formContainer">
          <form className="form">
            <Avatar className="avatar">
              <UpdateIcon />
            </Avatar>
            <Typography variant="h5" component="h1" className="heading">
              Update Profile Deatils
            </Typography>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              className={"nameInput textField"}
              value={name}
              error={!isValidName && name !== ""}
              helperText={
                !isValidName && name !== ""
                  ? "Name must be at least 4 characters long."
                  : ""
              }
              onChange={handleNameChange}
            />

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              className={"emailInput textField"}
              value={email}
              onChange={handleEmailChange}
              error={!isValidEmail && email !== ""}
              helperText={
                !isValidEmail && email !== ""
                  ? "Please enter a valid email address."
                  : ""
              }
            />

            <div className="root">
              <Avatar
                alt="Avatar Preview"
                src={avatarPreview}
                className="avatar2"
              />
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
                  startIcon={<CloudUploadIcon style={{ color: "#FFFFFF" }} />}
                  component="span"
                  className="uploadAvatarButton"
                >
                  <p className="uploadAvatarText">Upload Avatar</p>
                </Button>
              </label>
            </div>

            <Button
              variant="contained"
              className="loginButton"
              fullWidth
              disabled={isSignInDisabled}
              style={{ marginTop: "3rem" }}
              onClick={UpdateProfileSubmitHandler}
            >
              Update Profile
            </Button>
            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: ".5rem" }}
            >
              <Link to="/account" className="createAccount">
                Cancel
              </Link>
            </Typography>
          </form>
        </div>
      )}
    </>
  );
}

export default UpdateProfile;
