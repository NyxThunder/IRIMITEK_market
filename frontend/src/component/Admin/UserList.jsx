import React, { useState, useEffect, useRef } from "react";
import "./ProductList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layouts/MataData/MataData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MUIDataTable from "mui-datatables";
import Sidebar from "./Siderbar";
import Navbar from "./Navbar";
import Loader from "../layouts/loader/Loader";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstanat";
import { useNavigate } from "react-router-dom";

function UserList() {
  const dispatch = useDispatch();
  const { error, users, loading } = useSelector((state) => state.allUsers);
  const { error: deleteError, isDeleted, message } = useSelector(
    (state) => state.profileData
  );
  const alert = useAlert();
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      navigateRef.current("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, isDeleted, message]);

  // Datagrid  values  and schema

  const columns = [
    {
      name: "Name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Role",
      label: "Role",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <span className={value === "admin" ? "greenColor" : "redColor"}>
              {value}
            </span>
          );
        },
      },
    },
    {
      name: "Actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link to={`/admin/user/${tableMeta.rowData[4]}`}>
                <EditIcon className="icon-" />
              </Link>
              <Button onClick={() => deleteUserHandler(tableMeta.rowData[4])}>
                <DeleteIcon className="iconbtn" />
              </Button>
            </div>
          );
        },
      },
    },
    {
      name: "ID",
      label: "User ID",
      options: {
        filter: false,
        sort: false,
      },
    },
  ];

  const data = users.map((user) => ({
    Name: user.name,
    Email: user.email,
    Role: user.role,
    Actions: "",
    ID: user._id,
  }));



  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    selectableRows: true
  };


  // togle handler =>
  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };

  // to close the sidebar when the screen size is greater than 1000px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 999 && toggle) {
        setToggle(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [toggle]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`ALL Users - Admin`} />

          <div className="product-list" style={{ marginTop: 0 }}>
            <div className={!toggle ? "listSidebar" : "toggleBox"}>
              <Sidebar />
            </div>

            <div className="list-table">
              <Navbar toggleHandler={toggleHandler} />
              <div className="productListContainer">
                <h4 id="productListHeading">ALL USERS</h4>
                <MUIDataTable
                  title={"All Users"}
                  data={data}
                  columns={columns_dataTable}
                  options={options}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UserList;
