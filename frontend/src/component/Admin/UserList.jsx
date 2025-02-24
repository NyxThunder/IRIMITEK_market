import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NotificationService, { NotificationContainer } from '../NotificationService';
import { Button } from "@mui/material";
import MetaData from "../layouts/MataData/MataData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MUIDataTable from "mui-datatables";
import Sidebar from "./Siderbar";
import Navbar from "./Navbar";
import Loader from "../layouts/loader/Loader";
import { Grid, Card } from "@mui/material";
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
      NotificationService.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      NotificationService.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      NotificationService.success(message);
      navigateRef.current("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, isDeleted, message]);

  // Datagrid  values  and schema

  const columns_dataTable = [
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
    responsive: "standard",
    selectableRows: true,
    textLabels: {
      body: { noMatch: "No Users Found" },
    },
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50],
    setTableProps: () => ({
      style: { width: "100%", overflowX: "auto" },
    }),
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
          <MetaData title={"All Users - Admin"} />
          <Grid container spacing={2} justifyContent="center" sx={{ px: 2, overflowX: "hidden" }}>
            {/* Sidebar - 25% on `md+`, hidden on `sm` */}

            <Grid item md={3} lg={3} xl={3} className={!toggle ? "firstBox" : "toggleBox"}>
              <Sidebar />
            </Grid>

            {/* Main Content - 75% on `md+`, 100% on `sm` */}
            <Grid item xs={12} sm={12} md={9} lg={9} xl={9} sx={{ overflowX: "auto" }}>
              {/* Navbar (Full Width) */}
              <Grid item xs={12} sm={12}>
                <Navbar toggleHandler={toggleHandler} />
              </Grid>

              {/* Table Section */}
              <Grid item xs={12} sx={{ mt: 3 }}>
                <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                  <MUIDataTable
                    title={"All Users"}
                    data={data}
                    columns={columns_dataTable}
                    options={options}
                  />
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

export default UserList;
