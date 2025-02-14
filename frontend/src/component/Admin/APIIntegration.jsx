import React, { useState, useEffect } from "react";
import "./ProductList.css";
import { DataGrid } from "@mui/x-data-grid";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

import {
  clearErrors,
  getAdminApis,
  deleteApi,
} from "../../actions/apiAction";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";

import Sidebar from "./Siderbar";
import Navbar from "./Navbar";
import { DELETE_API_RESET } from "../../constants/apiConstatns";
import { Button } from "@mui/material";

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
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button
              onClick={() => handleToggleStatus(tableMeta.rowData[0])}
              variant="contained"
              color={tableMeta.rowData[2] === "Active" ? "secondary" : "primary"}
            >
              {tableMeta.rowData[2] === "Active" ? "Deactivate" : "Activate"}
            </Button>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    selectableRows: true
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
          <MetaData title={`ALL APIs - Admin`} />
          <div className="product-list" style={{ marginTop: 0 }}>
            <div className={!toggle ? "listSidebar" : "toggleBox"}>
              <Sidebar />
            </div>
            <div className="list-table">
              <Navbar toggleHandler={toggleHandler} />
              <div className="productListContainer">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h4>New Possible APIs</h4>
                  <Button onClick={() => navigate("/admin/new/api")} className="primary">Add API</Button>
                </div>
                <MUIDataTable
                  title={"API Integrations"}
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

export default ApiList;
