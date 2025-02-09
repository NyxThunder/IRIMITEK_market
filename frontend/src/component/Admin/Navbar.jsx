import React from "react";
import { Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ toggleHandler }) => {
  return (
    <nav className="navbar">
      <IconButton className="menuIcon" onClick={toggleHandler}>
        <MenuIcon fontSize="2rem" />
      </IconButton>
      <div className="dashboardHead">
        <Link
          to="/admin/dashboard"
          style={{ textDecoration: "none", color: "none" , width: "100%" , height: "100%"}}
        >
          <img
            src="https://res.cloudinary.com/drosmiklv/image/upload/v1739072360/logo_e8esxt.webp"
            alt="logo"
            className="headerBottom__logo_main"
          />
        </Link>
      </div>
      <Link
        to="/contact"
        style={{ textDecoration: "none", color: "none" }}
      >
        <Button className="contactButton">Contact Us</Button>
      </Link>
    </nav>
  );
};

export default Navbar;