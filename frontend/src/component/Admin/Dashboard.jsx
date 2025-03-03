import React, { useState, useEffect } from "react";
import BarChartIcon from "@mui/icons-material/BarChart";
import Highcharts from "highcharts";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PeopleIcon from "@mui/icons-material/People";
import MUIDataTable from "mui-datatables";
import HighchartsReact from "highcharts-react-official";
import Highcharts3D from "highcharts/highcharts-3d";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts, clearErrors } from "../../actions/productAction";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import NotificationService, { NotificationContainer } from '../NotificationService';
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";
import Navbar from "./Navbar";
import Sidebar from "./Siderbar";
import { useNavigate } from "react-router-dom";
import { Grid, Card } from "@mui/material";
import TotalAmountCard from "./widgets/TotalAmountCard";
import "./Dashboard.css";
import axios from "axios";
import OrderList from "./OrderList";
Highcharts3D(Highcharts);

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [metrics, setMetrics] = useState({
    "OutOfStock": 0,
    "TotalAmount": 0,
    "MonthlyTarget": 0,
});
  const [toggle, setToggle] = useState(false);

  const { products, loading, error } = useSelector((state) => state.products);
  const { orders, orderLoading, error: ordersError } = useSelector(
    (state) => state.allOrders
  );
  const { users, userLoading, error: usersError } = useSelector((state) => state.allUsers);
  const [metricsLoading, setMetricsLoading] = useState(true);



  

  const getAllMetrics = async () => {
    try {
      const { data } = await axios.get("/api/v1/admin/api/metrics");
      if (data.success === true) {
        setMetrics(data.metrics);
      }
    } catch (error) {
      console.error("Error fetching metrics:", error);
    } finally {
      setMetricsLoading(false);
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(getAllOrders()),
          dispatch(getAllUsers()),
          dispatch(getAdminProducts()),
          getAllMetrics(),
        ]);
      } catch (error) {
        NotificationService.error(error);
        dispatch(clearErrors());
      }
    };
  
    fetchData();
  }, [dispatch, alert]);

  // togle handler =>
  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };

  //Tabel data
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
    selectableRows: true,
    textLabels: {
      body: { noMatch: "No Best Sellers Found" },
    },
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50],
    setTableProps: () => ({
      style: { width: "100%", overflowX: "auto" },
    }),
  };

  // now set the Value of stock of the product for Doughnut component in  chart .

  const doughnutOptions = {
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
      },
      style: {
        fontFamily: "Roboto",
      },
    },
    title: {
      text: "Product Stock Status",
      align: "center",
      style: {
        color: "black",
        fontWeight: "900",
      },
    },

    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        depth: 35,
        dataLabels: {
          enabled: true,
          format: "{point.name}",
          style: {
            fontWeight: "500",
          },
        },
      },
    },
    series: [
      {
        type: "pie",
        name: "Share",
        data: [
          ["In Stock", products ? products.length - metrics.OutOfStock : 0],

          {
            name: "Out of Stock",
            y: metrics.OutOfStock,
            sliced: true,
            selected: true,
          },
        ],
      },
    ],
  };

  const revenueProgressOptions = {
    chart: {
      type: "column",
      style: {
        fontFamily: "Roboto",
      },
    },
    title: {
      text: "Monthly Target",
    },
    xAxis: {
      categories: ["Target", "Current"],
    },
    yAxis: {
      min: 0,
      max: Math.max(metrics.MonthlyTarget, metrics.TotalAmount),
      title: {
        text: "Amount ($)",
      },
    },
    series: [
      {
        name: "Monthly Target",
        data: [metrics.MonthlyTarget],
        color: "blue",
      },
      {
        name: "Current Revenue",
        data: [metrics.TotalAmount],
        color: metrics.TotalAmount >= metrics.MonthlyTarget ? "green" : "red",
      },
    ],
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
      {loading || metricsLoading || userLoading || orderLoading? (
        <Loader />
      ) : (
        <>
          <MetaData title="Dashboard - Admin Panel" />
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

              {/* Cards Section */}
              <Grid
                container
                sx={{
                  mt: 2,
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
                  gap: 2,  // Adds even spacing between items
                  width: "100%",
                }}
              >
                <Grid item >
                  <TotalAmountCard
                    icon={ShoppingCartIcon}
                    title="Total Products"
                    amount={products ? products.length : 0}
                    percentage={1.5}
                    isPositive={true}
                    onExpand={() => navigate("/admin/products")}
                  />
                </Grid>
                <Grid item >
                  <TotalAmountCard
                    icon={BarChartIcon}
                    title="Total Revenue"
                    amount={`$${metrics.TotalAmount}`}
                    percentage={2.6}
                    isPositive={true}
                    onExpand={() => navigate("/admin/orders")}
                  />
                </Grid>
                <Grid item >
                  <TotalAmountCard
                    icon={AssignmentIndIcon}
                    title="Total Orders"
                    amount={orders ? orders.length : 0}
                    percentage={3.6}
                    isPositive={false}
                    onExpand={() => navigate("/admin/orders")}
                  />
                </Grid>
                <Grid item >
                  <TotalAmountCard
                    icon={PeopleIcon}
                    title="Total Users"
                    amount={users ? users.length : 0}
                    percentage={1.5}
                    isPositive={true}
                    onExpand={() => navigate("/admin/users")}
                  />
                </Grid>
              </Grid>

              {/* Revenue & Doughnut Chart Section */}
              <Grid
                container
                spacing={2}
                sx={{
                  mt: 1,
                  overflowX: "hidden",
                }}
              >
                {/* First Chart */}
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ overflowX: "auto" }}>
                  <Card sx={{ boxShadow: 3, borderRadius: 2, }}>
                    <HighchartsReact highcharts={Highcharts} options={doughnutOptions} />
                  </Card>
                </Grid>

                {/* Second Chart */}
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ overflowX: "auto" }}>
                  <Card sx={{ boxShadow: 3, borderRadius: 2, }}>
                    <HighchartsReact highcharts={Highcharts} options={revenueProgressOptions} />
                  </Card>
                </Grid>
              </Grid>


              {/* Line Chart Section */}
              <Grid item xs={12} sx={{ mt: 1 }}>
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                  <HighchartsReact highcharts={Highcharts} options={{ chart: { type: "line" }, title: { text: "Revenue Over Time" }, xAxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] }, series: [{ name: "Revenue", data: [32, 45, 56, 60, 72, metrics.TotalAmount] }] }} />
                </Card>
              </Grid>

              <Grid item xs={12} sx={{ mt: 1 }}>
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                  <MUIDataTable
                    title={"Best Sellers"}
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

export default Dashboard;



