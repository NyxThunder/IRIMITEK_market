import React, { useState, useEffect, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { load_UserProfile } from "./actions/userAction";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import IrimiLoader from "./component/layouts/loader/Loader";
import PrivateRoute from "./component/Route/PrivateRoute";

import "./App.css";

import Header from "./component/layouts/Header/Header";
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
const LazyAPIIntegration = React.lazy(() =>
  import("./component/Admin/API/APIIntegration")
);
const LazyUpdateAPI = React.lazy(() =>
  import("./component/Admin/API/UpdateAPI")
);
const LazyImportAPI = React.lazy(() =>
  import("./component/Admin/API/ImportAPI")
);
const LazyExportAPI = React.lazy(() =>
  import("./component/Admin/API/ExportAPI")
);
const LazyNewAPI = React.lazy(() =>
  import("./component/Admin/API/NewAPI")
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
      <Routes>
        <Route path="/" element={<><Header /><Home /><Services /><Footer /></>} />
        <Route path="/product/:id" element={<><Header /><ProductDetails /><Services /><Footer /></>} />
        <Route path="/products" element={<><Header /><Products /><Services /><Footer /></>} />
        <Route path="/products/:keyword" element={<><Header /><Products /><Services /><Footer /></>} />
        <Route path="/signup" element={<><Header /><Signup /><Services /><Footer /></>} />
        <Route path="/login" element={<>< Header /><Login /><Services /><Footer /></>} />
        <Route path="/password/forgot" element={<><Header /><ForgetPassword /><Services /><Footer /></>} />
        <Route path="/password/reset/:token" element={<><Header /><ResetPassword /><Services /><Footer /></>} />
        <Route path="/cart" element={<><Header /><Cart /><Services /><Footer /></>} />
        <Route path="/policy/return" element={<><Header /><ReturnPolicyPage /><Services /><Footer /></>} />
        <Route path="/policy/Terms" element={<><Header /><TermsUse /><Services /><Footer /></>} />
        <Route path="/policy/privacy" element={<><Header /><PrivacyPolicy /><Services /><Footer /></>} />
        <Route path="/terms/conditions" element={<><Header /><TermsAndConditions /><Services /><Footer /></>} />
        <Route path="/contact" element={<><Header /><ContactForm /><Services /><Footer /></>} />
        <Route path="/about_us" element={<><Header /><AboutUsPage /><Services /><Footer /></>} />

        {/* User routes with protected, currently not implemented. But has to be protected*/}
        <Route path="/account" element={<><Header /><Profile /><Services /><Footer /></>} />
        <Route path="/profile/update" element={<><Header /><UpdateProfile /><Services /><Footer /></>} />
        <Route path="/password/update" element={<><Header /><UpdatePassword /><Services /><Footer /></>} />
        <Route path="/orders" element={<><Header /><MyOrder /><Services /><Footer /></>} />
        <Route path="/shipping" element={<><Header /><Shipping /><Services /><Footer /></>} />
        <Route path="/order/confirm" element={<><Header /><ConfirmOrder /><Services /><Footer /></>} />
        <Route path="/success" element={<><Header /><OrderSuccess /><Services /><Footer /></>} />
      </Routes>
      {/* Admin routes */}
      <Routes>
        <Route path="/admin/dashboard" element={<PrivateRoute isAdmin={true} component={() => (
          <Suspense fallback={<IrimiLoader />}>
            <LazyDashboard />
          </Suspense>
        )} />} />
        <Route path="/admin/products" element={<PrivateRoute isAdmin={true} component={() => (
          <Suspense fallback={<IrimiLoader />}>
            <LazyProductList />
          </Suspense>
        )} />} />
        <Route path="/admin/api_integration" element={<PrivateRoute isAdmin={true} component={() => (
          <Suspense fallback={<IrimiLoader />}>
            <LazyAPIIntegration />
          </Suspense>
        )} />} />
        <Route path="/admin/api/:id" element={<PrivateRoute isAdmin={true} component={() => (
          <Suspense fallback={<IrimiLoader />}>
            <LazyUpdateAPI />
          </Suspense>
        )} />} />
        <Route path="/admin/api/import/:id" element={<PrivateRoute isAdmin={true} component={() => (
          <Suspense fallback={<IrimiLoader />}>
            <LazyImportAPI />
          </Suspense>
        )} />} />
        <Route path="/admin/api/export/:id" element={<PrivateRoute isAdmin={true} component={() => (
          <Suspense fallback={<IrimiLoader />}>
            <LazyExportAPI />
          </Suspense>
        )} />} />
        <Route path="/admin/new/api" element={<PrivateRoute isAdmin={true} component={() => (
          <Suspense fallback={<IrimiLoader />}>
            <LazyNewAPI />
          </Suspense>
        )} />} />
        <Route path="/admin/product/:id" element={<PrivateRoute isAdmin={true} component={() => (
          <Suspense fallback={<IrimiLoader />}>
            <LazyUpdateProduct />
          </Suspense>
        )} />} />
        <Route path="/admin/reviews" element={<PrivateRoute isAdmin={true} component={() => (
          <Suspense fallback={<IrimiLoader />}>
            <LazyProductReviews />
          </Suspense>
        )} />} />
        <Route path="/admin/orders" element={<PrivateRoute isAdmin={true} component={() => (
          <Suspense fallback={<IrimiLoader />}>
            <LazyOrderList />
          </Suspense>
        )} />} />
        <Route path="/admin/order/:id" element={<PrivateRoute isAdmin={true} component={() => (
          <Suspense fallback={<IrimiLoader />}>
            <LazyProcessOrder />
          </Suspense>
        )} />} />
        <Route path="/admin/new/product" element={<PrivateRoute isAdmin={true} component={() => (
          <Suspense fallback={<IrimiLoader />}>
            <LazyNewProduct />
          </Suspense>
        )} />} />
        <Route path="/admin/users" element={<PrivateRoute isAdmin={true} component={() => (
          <Suspense fallback={<IrimiLoader />}>
            <LazyUserList />
          </Suspense>
        )} />} />
        <Route path="/admin/user/:id" element={<PrivateRoute isAdmin={true} component={() => (
          <Suspense fallback={<IrimiLoader />}>
            <LazyUpdateUser />
          </Suspense>
        )} />} />
      </Routes>
      <Routes>
        <Route path="/process/payment" element={<Elements stripe={loadStripe(stripeApiKey)}>{<><Header /><Payment /></>}</Elements>} />
      </Routes>

    </>
  );
}

export default App;