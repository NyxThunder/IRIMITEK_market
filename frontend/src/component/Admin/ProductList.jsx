import React, { useState, useEffect } from "react";
import "./ProductList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

import {
  clearErrors,
  getAdminProducts,
  deleteProduct,
} from "../../actions/productAction";
import MUIDataTable from "mui-datatables";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import Sidebar from "./Siderbar";
import Navbar from "./Navbar";
import { DELETE_PRODUCT_RESET } from "../../constants/productsConstatns";

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
      alert.success("Product Deleted Successfully");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProducts());
  }, [dispatch, error, alert, deleteError, isDeleted]);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const columns_dataTable = [
    {
      name: "product_id",
      label: "Product ID",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "stock",
      label: "Stock",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "price",
      label: "Price",
      options: {
        filter: true,
        sort: true,
      }
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
              <Link to={`/admin/product/${id}`} style={{ marginRight: "1rem" }}>
                <EditIcon className="icon-" />
              </Link>
              <div onClick={() => deleteProductHandler(id)}>
                <DeleteIcon className="iconbtn" />
              </div>
            </div>
          );
        },
      },
    },
  ];

  const data = products
    ? products.map((item) => [
      item._id,
      item.name,
      item.Stock,
      item.price,
    ])
    : [];

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
          <MetaData title={`ALL PRODUCTS - Admin`} />
          <div className="product-list" style={{ marginTop: 0 }}>
            <div className={!toggle ? "listSidebar" : "toggleBox"} style={{ flex: 1 }}>
              <Sidebar />
            </div>
            <div className="list-table" style={{ flex: 4 }}>
              <Navbar toggleHandler={toggleHandler} />
              <div className="productListContainer" style={{ padding: "20px" }}>
                <h4 id="productListHeading" style={{ fontSize: "24px" }}>ALL PRODUCTS</h4>
                <MUIDataTable
                  title={"All Products"}
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

export default ProductList;
