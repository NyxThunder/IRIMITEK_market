import React, { useState, useEffect } from "react";
import "./ProductList.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders, clearErrors, deleteOrder } from "../../actions/orderAction";
import { useAlert } from "react-alert";
import MUIDataTable from "mui-datatables";
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
      name: "Order ID",
      label: "Order ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          const color = value === "Delivered" ? "green" : "red";
          return <div style={{ color, fontWeight: 600 }}>{value}</div>;
        },
      },
    },
    {
      name: "Items Qty",
      label: "Items Qty",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Amount",
      label: "Amount",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const orderId = tableMeta.rowData[0];
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link to={`/admin/order/${orderId}`}>
                <EditIcon className="icon-" />
              </Link>
              <div onClick={() => deleteOrderHandler(orderId)}>
                <DeleteIcon className="iconbtn" />
              </div>
            </div>
          );
        },
      },
    },
  ];

  // MUIDataTable Rows
  const data = [];
  orders &&
    orders.forEach((item) => {
      data.push({
        "Order ID": item._id,
        Status: item.orderStatus,
        "Items Qty": item.orderItems.length,
        Amount: item.totalPrice,
        Actions: item._id,
      });
    });


  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    selectableRows: true
  };

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
                <h4 id="productListHeading" style={{fontSize: 24}}>ALL ORDERS</h4>
                <MUIDataTable
                  title={"All Orders"}
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

export default OrderList;
