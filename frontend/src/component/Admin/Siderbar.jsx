import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Typography, Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PostAddIcon from "@mui/icons-material/PostAdd";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HomeIcon from "@mui/icons-material/Home";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { useSelector } from "react-redux";
import "./Sidebar.css";

function Sidebar() {
  const { user, loading } = useSelector((state) => state.userData);


  const navigate = useNavigate();

  function accountHandler() {

    navigate("/account");
  }

  return (
    <>
      {!loading && (
        <>
          <div className="admin-sidebar">
            <Avatar
              src={user && user.avatar.url}
              alt="User Avatar"
              className="admin-sidebar-avatar11"
            />
            <Typography variant="subtitle1" className="admin-sidebar-name">
              {user && user.name}
            </Typography>
            <Typography variant="subtitle2" className="admin-sidebar-email">
              {user && user.email}
            </Typography>
            <div className="placeCenterItems">
              <div className="admin-sidebar-divider" />
            </div>
            <ul id="admin-sidebar-sideBarMenu">
              <Link
                to="/admin/dashboard"
                style={{ color: "inherit", textDecoration: "none", display: "flex", flexDirection: "row", justifyContent: "center" }}
              >
                <li className="admin-sidebar-sideBarMenuItem">
                  <DashboardIcon fontSize="large" />
                  <span className="admin-sidebar-sideBarMenuItem_text">
                    {" "}
                    Dashboard
                  </span>
                </li>
              </Link>

              <Link to="/" style={{ color: "inherit", textDecoration: "none", display: "flex", flexDirection: "row", justifyContent: "center" }}>
                <li className="admin-sidebar-sideBarMenuItem">
                  <HomeIcon fontSize="large" />
                  <span className="admin-sidebar-sideBarMenuItem_text">Home</span>
                </li>
              </Link>

              <Link
                to="/admin/products"
                style={{ color: "inherit", textDecoration: "none", display: "flex", flexDirection: "row", justifyContent: "center" }}
              >
                <li className="admin-sidebar-sideBarMenuItem">
                  <PostAddIcon fontSize="large" />

                  <span className="admin-sidebar-sideBarMenuItem_text">
                    {" "}
                    Products
                  </span>
                </li>
              </Link>
              <Link
                to="/admin/api_integration"
                style={{ color: "inherit", textDecoration: "none", display: "flex", flexDirection: "row", justifyContent: "center" }}
              >
                <li className="admin-sidebar-sideBarMenuItem">
                  <IntegrationInstructionsIcon fontSize="large" />

                  <span className="admin-sidebar-sideBarMenuItem_text">
                    {" "}
                    API Integration
                  </span>
                </li>
              </Link>
              <Link
                to="/admin/new/product"
                style={{ color: "inherit", textDecoration: "none", display: "flex", flexDirection: "row", justifyContent: "center" }}
              >
                <li className="admin-sidebar-sideBarMenuItem">
                  <AddIcon fontSize="large" />
                  <span className="admin-sidebar-sideBarMenuItem_text">
                    Add Product
                  </span>
                </li>
              </Link>

              <Link
                to="/admin/orders"
                style={{ color: "inherit", textDecoration: "none", display: "flex", flexDirection: "row", justifyContent: "center" }}
              >
                <li className="admin-sidebar-sideBarMenuItem">
                  <ListAltIcon fontSize="large" />
                  <span className="admin-sidebar-sideBarMenuItem_text">Orders</span>
                </li>
              </Link>
              <Link
                to="/admin/reviews"
                style={{ color: "inherit", textDecoration: "none", display: "flex", flexDirection: "row", justifyContent: "center" }}
              >
                <li className="admin-sidebar-sideBarMenuItem">
                  <RateReviewIcon fontSize="large" />
                  <span className="admin-sidebar-sideBarMenuItem_text">Reviews</span>
                </li>
              </Link>

              <Link
                to="/contact"
                style={{ color: "inherit", textDecoration: "none", display: "flex", flexDirection: "row", justifyContent: "center" }}
              >
                <li className="admin-sidebar-sideBarMenuItem">
                  <ContactPageIcon fontSize="large" />
                  <span className="admin-sidebar-sideBarMenuItem_text">Contact</span>
                </li>
              </Link>
            </ul>
            <div className="placeCenterItems">
              <div className="divider" />
            </div>
            <div className="placeCenterItems">
              <Button
                className="adminSidbarbutton"
                onClick={accountHandler}
                variant="contained"
              >
                <ManageAccountsIcon
                  fontSize="large"
                  style={{ marginRight: "10px" }}
                />
                Account
              </Button>
            </div>
          </div>
        </>
      )
      }
    </>
  );
}

export default Sidebar;
