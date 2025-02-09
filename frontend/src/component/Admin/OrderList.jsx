import React, { useState, useEffect } from "react";
import "./ProductList.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders, clearErrors, deleteOrder } from "../../actions/orderAction";
import { useAlert } from "react-alert";

import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Siderbar";
import Navbar from "./Navbar";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";

function OrderList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const [toggle, setToggle] = useState(false);

  const { error, loading, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.deleteUpdateOrder);

  // Toggle Sidebar
  const toggleHandler = () => {
    setToggle(!toggle);
  };

  // Close sidebar on large screens
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

  // Fetch Orders and Handle Errors
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
      alert.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
    dispatch(getAllOrders());
  }, [dispatch, error, alert, isDeleted, deleteError, navigate]);

  // Delete Order Handler
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  // DataGrid Columns
  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 120,
      flex: 0.7,
      headerClassName: "column-header",
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.8,
      headerClassName: "column-header hide-on-mobile",
      renderCell: (params) => {
        const color = params.value === "Delivered" ? "green" : "red";
        return <div style={{ color, fontWeight: 600 }}>{params.value}</div>;
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 120,
      flex: 0.8,
      headerClassName: "column-header hide-on-mobile",
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 120,
      flex: 0.8,
      headerClassName: "column-header hide-on-mobile",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.5,
      sortable: false,
      minWidth: 150,
      headerClassName: "column-header1",
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/order/${params.row.id}`}>
              <EditIcon className="icon-" />
            </Link>
            <div onClick={() => deleteOrderHandler(params.row.id)}>
              <DeleteIcon className="iconbtn" />
            </div>
          </>
        );
      },
    },
  ];

  // DataGrid Rows
  const rows = [];
  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`ALL Orders - Admin`} />
          <div className="product-list" style={{ marginTop: 0 }}>
            <div className={!toggle ? "listSidebar" : "toggleBox"}>
              <Sidebar />
            </div>
            <div className="list-table">
              <Navbar toggleHandler={toggleHandler} />
              <div className="productListContainer">
                <h4 id="productListHeading">ALL ORDERS</h4>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className="dataTable"
                  autoHeight
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default OrderList;
