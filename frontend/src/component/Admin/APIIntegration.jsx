import React, { useState, useEffect } from "react";
import "./ProductList.css";
import { DataGrid } from "@mui/x-data-grid";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

import {
  clearErrors,
  getAdminProducts,
  deleteProduct,
} from "../../actions/productAction";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";

import Sidebar from "./Siderbar";
import Navbar from "./Navbar";
import { DELETE_PRODUCT_RESET } from "../../constants/productsConstatns";
import { Button } from "@mui/material";

function ProductList() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const { error, products, loading } = useSelector((state) => state.products) || {};
  const { error: deleteError, isDeleted } = useSelector((state) => state.deleteUpdateProduct) || {};

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
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProducts());
  }, [dispatch, error, alert, deleteError, isDeleted]);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const columns = [
    {
      field: "id",
      headerName: "API ID",
      minWidth: 230,
      flex: 0.5,
      headerClassName: "column-header",
    },
    {
      field: "name",
      headerName: "API Name",
      minWidth: 150,
      flex: 0.5,
      headerClassName: "column-header hide-on-mobile",
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.5,
      headerClassName: "column-header hide-on-mobile",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      minWidth: 230,
      headerClassName: "column-header1",
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/api_integration/${params.row.id}`} style={{ marginLeft: "1rem" }}>
              <EditIcon className="icon-" />
            </Link>
            <div onClick={() => deleteProductHandler(params.row.id)}>
              <DeleteIcon className="iconbtn" />
            </div>
          </>
        );
      },
    },
  ];

  const rows = [];
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

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
                <Button onClick={() => navigate("/admin/new/product")} className="addProductBtn">Add API</Button>
                <h4 id="productListHeading">ALL PRODUCTS</h4>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className="dataTable"
                  autoHeight
                />
                <h4>New Datatable test!</h4>
                <MUIDataTable
                  title={"API Integrations"}
                  data={products}
                  columns={columns}
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

export default ProductList;
