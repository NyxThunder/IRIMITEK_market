import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

import {
  clearErrors,
  getAdminApis,
  deleteApi,
} from "../../../actions/apiAction";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MetaData from "../../layouts/MataData/MataData";
import Loader from "../../layouts/loader/Loader";

import Sidebar from "../Siderbar";
import Navbar from "../Navbar";
import { DELETE_API_RESET } from "../../../constants/apiConstatns";
import { Button, Grid, Card } from "@mui/material";

function ApiList() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const { error, apis, loading } = useSelector((state) => state.apis) || {};
  const { error: deleteError, isDeleted } = useSelector((state) => state.deleteUpdateApi) || {};

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
      alert.success("API gateway deleted Successfully");
      dispatch({ type: DELETE_API_RESET });
    }
    dispatch(getAdminApis());
  }, [dispatch, error, alert, deleteError, isDeleted]);

  const deleteApiHandler = (id) => {
    dispatch(deleteApi(id));
  };



  const [data, setData] = useState([
    { id: "1", name: "G2A", status: "Active" },
    { id: "2", name: "Kinguin", status: "Inactive" },
    { id: "3", name: "Kyesender", status: "Active" },
  ]);

  const handleToggleStatus = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: item.status === "Active" ? "Inactive" : "Active" } : item
      )
    );
    const updatedItem = data.find((item) => item.id === id);
    if (updatedItem && updatedItem.status === "Inactive") {
      // fetchDataFromAPI(id);
    }
  };

  const handleImportProduct = (name) => {
    navigate(`/admin/new/api/import?name=${name}`);
  };

  const handleExportProduct = (name) => {
    navigate(`/admin/new/api/export?name=${name}`);
  };

  const columns_dataTable = [
    {
      name: "id",
      label: "API ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "name",
      label: "API Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "clientId",
      label: "Client Id",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "clientSecret",
      label: "Client Secret",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Connect",
      label: "Connect",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button
              onClick={() => handleImportProduct(tableMeta.rowData[1])}
              variant="contained"
              color="secondary"
              text="Connect"
            />
          );
        },
      },
    },
    {
      name: "importActions",
      label: "Import",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button
              onClick={() => handleImportProduct(tableMeta.rowData[1])}
              variant="contained"
              color="primary"
              text="Import"
            />
          );
        },
      },
    },
    {
      name: "exportActions",
      label: "Export",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button
              onClick={() => handleExportProduct(tableMeta.rowData[1])}
              variant="contained"
              color="primary"
              text="Export"
            />
          );
        },
      },
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const id = tableMeta.rowData[0];
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link to={`/admin/api/${id}`} style={{ marginRight: "1rem" }}>
                <EditIcon className="icon-" />
              </Link>
              <div onClick={() => deleteApiHandler(id)}>
                <DeleteIcon className="iconbtn" />
              </div>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    selectableRows: true,
    textLabels: {
      body: { noMatch: "No APIs Found" },
    },
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50],
    setTableProps: () => ({
      style: { width: "100%", overflowX: "auto" },
    }),
  };

  const toggleHandler = () => {
    setToggle(!toggle);
  };

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
            <Grid item xs={12} sm={12} md={9} lg={9} xl={9} sx={{ overflowX: "hidden" }}>
              {/* Navbar (Full Width) */}
              <Grid item xs={12} sm={12}>
                <Navbar toggleHandler={toggleHandler} />
              </Grid>

              {/* Input Section */}
              <Grid item xs={12} sx={{ mt: 3 }}>

                <Card sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                    <Button onClick={() => navigate("/admin/new/api")} className="mainButton">Add API</Button>
                  </div>
                  <MUIDataTable
                    title={"API Integrations"}
                    data={data}
                    columns={columns_dataTable}
                    options={options}
                  />
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </>
      )
      }
    </>
  );
}

export default ApiList;
