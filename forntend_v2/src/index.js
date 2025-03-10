import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import store from "./store";
import App from "./App";
import theme from "./theme";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";


axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000";
axios.defaults.withCredentials = true;

ReactDOM.render(
  <>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </>,
  document.getElementById("root")
);
