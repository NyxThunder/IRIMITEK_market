import React, { useEffect, useRef, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonIcon from "@mui/icons-material/Person";
import { Modal, Avatar } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./ProfileModel.css";
import { useNavigate} from "react-router-dom";
import NotificationService, { NotificationContainer } from '../../NotificationService';
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/userAction";

const ProfileModal = ({ user, isAuthenticated }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const createdAt = (user) => {
    const createdAt = new Date(user.createdAt);
    if (isNaN(createdAt.getTime())) {
      // Handle invalid date
      console.error("Invalid date value:", user.createdAt);
      return "Invalid date";
    }
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    };

    const formatter = new Intl.DateTimeFormat("en-IN", options);
    const formattedDate = formatter.format(createdAt);
    return formattedDate;
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleOpen = (event) => {
    event.stopPropagation();
    setIsOpen((prevState) => !prevState);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  function dashboardHandler() {
     setIsOpen(false);
    navigate("/admin/dashboard");
  }

  function accountHandler() {
     setIsOpen(false);
    navigate("/account");
  }

  function ordersHandler() {
     setIsOpen(false);
    navigate("/orders");
  }

  function logoutUserHandler() {
     setIsOpen(false);
     dispatch(logout());
    NotificationService.success("Logout Successfully");
  }

  function cartHandler() {
      setIsOpen(false);

    navigate("/cart");
  }

  function loginHandler() {
      setIsOpen(false);
      
    navigate("/login");
  }

  return (
    <>
      <div className="profile-icon" onClick={handleOpen}>
        <PersonIcon
          className={`icon smaller ${isOpen ? "active" : ""}`}
          fontSize="large"
        />
        {isOpen ? (
          <ArrowDropUpIcon className="arrow-icon" />
        ) : (
          <ArrowDropDownIcon className="arrow-icon" />
        )}
      </div>
      {isOpen && (
        <Modal open={isOpen} onClose={onClose} className="modal-container">
          <div className="modal-content" ref={modalRef}>
            {!isAuthenticated ? (
              <div className="welcome-message">
                <strong>Welcome!</strong>
                <p>To access your account and manage orders, please log in.</p>
              </div>
            ) : (
              <>
                <div className="profile-info">
                  <Avatar
                    src={user.avatar.url}
                    alt="User Avatar"
                    className="avatar"
                    style={{ width: "68px", height: "68px" }}
                  />
                  <p className="user-id">
                    <strong>ID :</strong> {user._id.substring(0, 8)}
                  </p>

                  <p className="user-name">
                    <strong>Name :</strong> {user.name}
                  </p>

                  <p className="user-email">
                    <strong>Email :</strong> {user.email}
                  </p>

                  <p className="created-at">
                    <strong>Joined at:</strong> {createdAt(user)}
                  </p>
                </div>
              </>
            )}
            <div className="profile-divider" />
            <div className="profile-menu">
              {user && user.role ==="admin" && (
                <div className="profile-menu-item" onClick={dashboardHandler}>
                  <DashboardIcon className="profile-menu-icon" />
                  <span>Dashboard</span>
                </div>
              )}
              <div className="profile-menu-item" onClick={accountHandler}>
                <AccountCircleIcon className="profile-menu-icon" />
                <span>Profile</span>
              </div>
              <div className="profile-menu-item" onClick={ordersHandler}>
                <AssignmentIcon className="profile-menu-icon" />
                <span>Orders</span>
              </div>
              <div className="profile-menu-item" onClick={cartHandler}>
                <ShoppingCartIcon className="profile-menu-icon" />
                <span>Cart</span>
              </div>
              {!isAuthenticated ? (
                <div className="profile-menu-item" onClick={loginHandler}>
                  <LockOpenIcon className="profile-menu-icon" />
                  <span>Login</span>
                </div>
              ) : (
                <div className="profile-menu-item" onClick={logoutUserHandler}>
                  <ExitToAppIcon className="profile-menu-icon" />
                  <span>Logout</span>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ProfileModal;
