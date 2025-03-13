import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import theme from './themes/index';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

const container = document.getElementById('root');
const root = createRoot(container);


root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
