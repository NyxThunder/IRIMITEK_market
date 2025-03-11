import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { composeWithDevTools } from "redux-devtools-extension";
import { composeWithDevTools } from '@redux-devtools/extension';
import {
  productsReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer,
  deleteUpdateReducer,
  getALLReviewReducer,
  deleteReviewReducer
} from './reducers/productReducers';
import {
  profileReducer,
  userReducer,
  forgetPasswordReducer,
  userDetailsReducer,
  allUsersReducer
} from './reducers/userReducer';

import { cartReducer } from './reducers/cartReducer';
import {
  newOrderReducer,
  myOrderReducer,
  orderDetialsReducer,
  allOrdersReducer,
  deletUpdateOrderReducer
} from './reducers/orderReducer';
import {
  newApiReducer,
  apisReducer,
  deleteUpdateApiReducer,
  apiDetailsReducer,
  connectApiReducer,
  importApiReducer,
  exportApiReducer,
  allOffersReducer,
  deleteUpdateOfferReducer,
  updateRetailPriceReducer
} from './reducers/apiReducer';
import customizationReducer from './reducers/customizationReducer';
const rootReducer = combineReducers({
  products: productsReducer,
  apis: apisReducer,
  productDetails: productDetailsReducer,
  apiDetails: apiDetailsReducer,
  userData: userReducer,
  profileData: profileReducer,
  forgetPassword: forgetPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrder: myOrderReducer,
  orderDetails: orderDetialsReducer,
  addNewReview: newReviewReducer,
  addNewProduct: newProductReducer,
  addNewAPI: newApiReducer,
  deleteUpdateApi: deleteUpdateApiReducer,
  deleteUpdateProduct: deleteUpdateReducer,
  allOrders: allOrdersReducer,
  deleteUpdateOrder: deletUpdateOrderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  deleteReview: deleteReviewReducer,
  getAllReview: getALLReviewReducer,
  connectApi: connectApiReducer,
  importApi: importApiReducer,
  exportApi: exportApiReducer,
  allOffers: allOffersReducer,
  deleteUpdateOffer: deleteUpdateOfferReducer,
  updateRetailPrice: updateRetailPriceReducer,
  customization: customizationReducer
});

// get all Cart values from local storage and pass this initial state into store
let initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')) : [],
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : []
  }
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
