import React, { useState, useEffect } from "react";
import BarChartIcon from "@mui/icons-material/BarChart";
import Highcharts from "highcharts";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PeopleIcon from "@mui/icons-material/People";

import HighchartsReact from "highcharts-react-official";
import Highcharts3D from "highcharts/highcharts-3d";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts, clearErrors } from "../../actions/productAction";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import { useAlert } from "react-alert";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";
import Navbar from "./Navbar";
import Sidebar from "./Siderbar";
import { useNavigate} from "react-router-dom";
import { Typography } from "@mui/material";
import "./Dashboard.css";
Highcharts3D(Highcharts);



function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  // const { products, loading, error } = useSelector((state) => state.products);
  // const { orders, error: ordersError } = useSelector(
  //   (state) => state.allOrders
  // );
  // const { users, error: usersError } = useSelector((state) => state.allUsers);

  // Static example data
  const error = null;
  const ordersError = null;
  const usersError = null;
  const loading = false;
  const products = [
    { name: "Game 1", stock: 50 },
    { name: "Game 2", stock: 0 },
    { name: "Game 3", stock: 10 },
    { name: "Game 4", stock: 25 },
    { name: "Game 5", stock: 0 },
    { name: "Game 6", stock: 40 },
  ];

  const orders = [
    { totalPrice: 200 },
    { totalPrice: 350 },
    { totalPrice: 100 },
    { totalPrice: 600 },
    { totalPrice: 750 },
  ];

  const users = [
    { name: "User 1" },
    { name: "User 2" },
    { name: "User 3" },
    { name: "User 4" },
  ];
  //End example data

  const alert = useAlert();

  let OutOfStock = 0;
  products &&
    products.forEach((element) => {
      // check how much items out of stocks in products array
      if (element.stock === 0) {
        OutOfStock += 1;
      }
    });



  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    if (usersError) {
      alert.error(usersError);
      dispatch(clearErrors);
    }
    if (ordersError) {
      alert.error(ordersError);
      dispatch(clearErrors);
    }
    
    dispatch(getAllOrders());
    dispatch(getAllUsers());
    dispatch(getAdminProducts());
  }, [dispatch, error, alert, ordersError, usersError]);

  // togle handler =>
  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };

  // total Amount Earned
  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  // chart js values for Line component
  const lineOptions = {
    chart: {
      type: "line",
      style: {
        fontFamily: "Roboto",
        fontWeight: "900",
      },
    },
    xAxis: {
      categories: ["Initial Amount", "Amount Earned"],
      labels: {
        style: {
          fontWeight: "900",
        },
      },
    },
    yAxis: {
      title: {
        text: null,
      },
      labels: {
        style: {
          fontWeight: "900",
        },
      },
    },
    series: [
      {
        name: "TOTAL AMOUNT",
        data: [0, totalAmount],
      },
    ],
    plotOptions: {
      line: {
        lineWidth: 4,
        marker: {
          enabled: true,
        },
        color: "black",
      },
    },
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
          ["Out of Stock", products.length - OutOfStock],

          {
            name: "Out of Stock",
            y: OutOfStock,
            sliced: true,
            selected: true,
          },
        ],
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
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Dashboard - Admin Panel" />
          <div className="dashboard">
            <div
              className={
                !toggle ? "firstBox" : "toggleBox"
              }
            >
              <Sidebar />
            </div>

            <div className="secondBox">
              <div className="navBar">
                <Navbar toggleHandler={toggleHandler} />
              </div>

              <div className = "summaryCard">
                <div
                  className="cardContainer"
                  style={{
                    backgroundImage: "url('https://res.cloudinary.com/drosmiklv/image/upload/v1739139290/products_c99r52.png')",
                    backgroundSize: "cover",
                    transition: "transform 0.2s ease-in-out",
                    cursor: "pointer",
                    ":hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                  onClick={() => navigate("/admin/products")}
                >
                  <div className="headerConetnt">
                    <ShoppingCartIcon
                      fontSize="large"
                      style={{
                        fontSize: "3rem",
                        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
                      }}
                    />

                    <Typography variant="h6" className="heading">
                      Total Products
                    </Typography>
                  </div>
                  <div className="textContainer">
                    <Typography variant="body2" className="number">
                      {products && products.length}
                    </Typography>
                  </div>
                </div>

                <div
                  className="cardContainer"
                  style={{
                    backgroundImage: "url('https://res.cloudinary.com/drosmiklv/image/upload/v1739139290/order_jjaikj.png')",
                    backgroundSize: "cover",
                    transition: "transform 0.2s ease-in-out",
                    cursor: "pointer",
                    ":hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                  onClick={() => navigate("/admin/orders")}
                >
                  <div className="headerConetnt">
                    <AssignmentIndIcon
                      fontSize="large"
                      style={{
                        fontSize: "3rem",
                        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                      }}
                    />
                    <Typography variant="h6" className="heading">
                      Total Orders
                    </Typography>
                  </div>
                  <div className="textContainer">
                    <Typography variant="body2" className="number">
                      {orders && orders.length}
                    </Typography>
                  </div>
                </div>

                <div
                  className="cardContainer"
                  style={{
                    backgroundImage: "url('https://res.cloudinary.com/drosmiklv/image/upload/v1739139291/user_hrfdlg.png')",
                    backgroundSize: "cover",
                    transition: "transform 0.2s ease-in-out",
                    cursor: "pointer",
                    ":hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                  onClick={() => navigate("/admin/users")}
                >
                  <div className="headerConetnt">
                    <PeopleIcon
                      fontSize="large"
                      style={{
                        fontSize: "3rem",
                        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                      }}
                    />
                    <Typography variant="h6" className="heading">
                      Total Users
                    </Typography>
                  </div>
                  <div className="textContainer">
                    <Typography variant="body2" className="number">
                      {users && users.length}
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="revenue">
                <div className="doughnutChart">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={doughnutOptions}
                  />
                </div>

                <div
                  className="revnueContainer"
                  style={{
                    backgroundImage: "url('https://res.cloudinary.com/drosmiklv/image/upload/v1739139290/products_c99r52.png')",
                    backgroundSize: "cover",
                    transition: "transform 0.2s ease-in-out",
                    borderRadius: "5px",

                    width: "42%",
                  }}
                >
                  <div className="headerConetnt">
                    <BarChartIcon
                      fontSize="large"
                      style={{
                        fontSize: "3rem",
                        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                      }}
                    />

                    <Typography variant="h6" className="heading">
                      Total Revenue
                    </Typography>
                  </div>
                  <div className = "textContainer">
                    <Typography variant="body2" className="number">
                      ${totalAmount.toFixed(2)}
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="lineChart">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={lineOptions}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;



