import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders, clearErrors, deleteOrder } from "../../actions/orderAction";
import NotificationService, { NotificationContainer } from '../NotificationService';
import MUIDataTable from "mui-datatables";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Siderbar";
import Navbar from "./Navbar";
import { Grid, Card } from "@mui/material";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";

function OrderList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
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
      NotificationService.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      NotificationService.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      NotificationService.success("Order Deleted Successfully");
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
  const columns_dataTable = [
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
    responsive: "standard",
    selectableRows: true,
    textLabels: {
      body: { noMatch: "No Orders Found" },
    },
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50],
    setTableProps: () => ({
      style: { width: "100%", overflowX: "auto" },
    }),
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"All Order's List"} />
          <Grid container spacing={2} justifyContent="center" sx={{ px: 2, overflowX: "hidden" }}>
            {/* Sidebar - 25% on `md+`, hidden on `sm` */}

            <Grid item md={3} lg={3} xl={3} className={!toggle ? "firstBox" : "toggleBox"}>
              <Sidebar />
            </Grid>

            {/* Main Content - 75% on `md+`, 100% on `sm` */}
            <Grid item xs={12} sm={12} md={9} lg={9} xl={9} sx={{ overflowX: "auto" }}>
              {/* Navbar (Full Width) */}
              <Grid item xs={12}>
                <Navbar toggleHandler={toggleHandler} />
              </Grid>

              {/* Order Table Section */}
              <Grid item xs={12} sx={{ mt: 3}}>
                <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                  <MUIDataTable
                    title={"All Orders"}
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

export default OrderList;
