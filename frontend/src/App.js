import React, { useState, useEffect, Suspense } from "react";
import { Route, Routes, Navigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { load_UserProfile } from "./actions/userAction";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CricketBallLoader from "./component/layouts/loader/Loader";
import PrivateRoute from "./component/Route/PrivateRoute";

import "./App.css";

import Header from "./component/layouts/Header1.jsx/Header";
import Payment from "./component/Cart/Payment";
import Home from "./component/Home/Home";
import Services from "./Terms&Condtions/Service";
import Footer from "./component/layouts/Footer/Footer";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Signup from "./component/User/SignUp";
import Login from "./component/User/Login";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgetPassword from "./component/User/ForgetPassword";
import ResetPassword from "./component/User/ResetPassword";
import Shipping from "./component/Cart/Shipping";
import Cart from "./component/Cart/Cart";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrder from "./component/order/MyOrder";
import ContactForm from "./Terms&Condtions/Contact";
import AboutUsPage from "./Terms&Condtions/Aboutus";
import ReturnPolicyPage from "./Terms&Condtions/Return";
import TermsUse from "./Terms&Condtions/TermsAndUse";
import TermsAndConditions from "./Terms&Condtions/TermsCondtion";
import PrivacyPolicy from "./Terms&Condtions/Privacy";
// const LazyPayment = React.lazy(() => import("./component/Cart/Payment"));
const LazyDashboard = React.lazy(() => import("./component/Admin/Dashboard"));
const LazyProductList = React.lazy(() =>
  import("./component/Admin/ProductList")
);
const LazyOrderList = React.lazy(() => import("./component/Admin/OrderList"));
const LazyUserList = React.lazy(() => import("./component/Admin/UserList"));
const LazyUpdateProduct = React.lazy(() =>
  import("./component/Admin/UpdateProduct")
);
const LazyProcessOrder = React.lazy(() =>
  import("./component/Admin/ProcessOrder")
);
const LazyUpdateUser = React.lazy(() => import("./component/Admin/UpdateUser"));
const LazyNewProduct = React.lazy(() => import("./component/Admin/NewProduct"));
const LazyProductReviews = React.lazy(() =>
  import("./component/Admin/ProductReviews")
);

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  const dispatch = useDispatch();

  // get STRIPE_API_KEY for payment from backend for connection to stripe payment gateway
  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      if (
        data.stripeApiKey !== undefined &&
        data.stripeApiKey !== null &&
        data.stripeApiKey !== ""
      ) {
        sessionStorage.setItem(
          "stripeApiKey",
          JSON.stringify(data.stripeApiKey)
        );
      }
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      // Handle error if the API call fails
      console.error("Error fetching Stripe API key:", error);
    }
  }

  useEffect(() => {
    const stripeApiKey = sessionStorage.getItem("stripeApiKey");
    if (stripeApiKey) {
      setStripeApiKey(stripeApiKey);
    } else {
      getStripeApiKey();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(load_UserProfile());

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/account" element={<Profile />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<PrivateRoute isAdmin={true} />}>
          <Route path="/admin/dashboard" element={<Suspense fallback={<CricketBallLoader />}><LazyDashboard /></Suspense>} />
          <Route path="/admin/products" element={<Suspense fallback={<CricketBallLoader />}><LazyProductList /></Suspense>} />
          <Route path="/admin/product/:id" element={<Suspense fallback={<CricketBallLoader />}><LazyUpdateProduct /></Suspense>} />
          <Route path="/admin/orders" element={<Suspense fallback={<CricketBallLoader />}><LazyOrderList /></Suspense>} />
          <Route path="/admin/users" element={<Suspense fallback={<CricketBallLoader />}><LazyUserList /></Suspense>} />
          <Route path="/admin/new/product" element={<Suspense fallback={<CricketBallLoader />}><LazyNewProduct /></Suspense>} />
        </Route>

        {/* Payment Route */}
        {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            }
          />
        )}

        {/* Redirect Unknown Routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
