import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import NotificationService, { NotificationContainer } from '../../NotificationService';

import {
  clearErrors,
  getAdminApis,
  deleteApi,
  connectApi,
} from "../../../actions/apiAction";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MetaData from "../../layouts/MataData/MataData";
import Loader from "../../layouts/loader/Loader";

import Sidebar from "../Siderbar";
import Navbar from "../Navbar";
import { DELETE_API_RESET, CONNECT_API_RESET } from "../../../constants/apiConstatns";
import { Button, Grid, Card } from "@mui/material";

function ApiList() {
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const { error, apis, loading } = useSelector((state) => state.apis) || {};
  const { error: deleteError, isDeleted } = useSelector((state) => state.deleteUpdateApi) || {};
  const { error: connectError, connected } = useSelector((state) => state.connectApi) || {};

  useEffect(() => {
    if (error) {
      NotificationService.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      NotificationService.error(deleteError);
      dispatch(clearErrors());
    }
    if (connectError) {
      NotificationService.error(connectError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      NotificationService.success("API gateway deleted Successfully");
      dispatch({ type: DELETE_API_RESET });
    }
    if (connected) {
      NotificationService.success("API gateway connected Successfully");
      dispatch({ type: CONNECT_API_RESET });
    }
    dispatch(getAdminApis());
  }, [dispatch, error, alert, deleteError, connectError, isDeleted, connected]);

  const deleteApiHandler = (id) => {
    dispatch(deleteApi(id));
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    if (apis) {
      const filteredData = apis.map(api => ({
        id: api._id,
        name: api.name,
        clientId: api.clientId,
        clientSecret: api.clientSecret,
      }));
      setData(filteredData);
    }
  }, [apis]);

  const handleConnectAPI = async (id) => {
    await dispatch(connectApi(id));
  };
  
  const handleImportProductFromAPI = (id, name) => {
    navigate(`/admin/api/import/${id}?name=${name}`);
  };

  const handleExportProductFromAPI = (id, name) => {
    navigate(`/admin/api/export/${id}?name=${name}`); 
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
              onClick={() => handleConnectAPI(tableMeta.rowData[0])}
              variant="contained"
              color="secondary"
            >
              Connect
            </Button>
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
              onClick={() => handleImportProductFromAPI(tableMeta.rowData[0], tableMeta.rowData[1])}
              variant="contained"
              color="primary"
            >
              Import
            </Button>
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
              onClick={() => handleExportProductFromAPI(tableMeta.rowData[0], tableMeta.rowData[1])}
              variant="contained"
              color="primary"
            >
              Export
            </Button>
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
