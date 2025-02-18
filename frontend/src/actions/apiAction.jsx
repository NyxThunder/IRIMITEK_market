import axios from "axios";
import {
  ALL_API_REQUEST,
  ALL_API_SUCCESS,
  ALL_API_FAIL,
  API_DETAILS_REQUEST,
  API_DETAILS_SUCCESS,
  API_DETAILS_FAIL,
  ADMIN_API_FAIL,
  ADMIN_API_REQUEST,
  ADMIN_API_SUCCESS,
  NEW_API_REQUEST,
  NEW_API_SUCCESS,
  NEW_API_FAIL,
  DELETE_API_REQUEST,
  DELETE_API_SUCCESS,
  DELETE_API_FAIL,
  UPDATE_API_REQUEST,
  UPDATE_API_SUCCESS,
  UPDATE_API_FAIL,
  CLEAR_ERRORS,
  CONNECT_API_REQUEST,
  CONNECT_API_FAIL,
  CONNECT_API_SUCCESS,
  IMPORT_API_REQUEST,
  IMPORT_API_SUCCESS,
  IMPORT_API_FAIL,
  EXPORT_API_REQUEST,
  EXPORT_API_SUCCESS,
  EXPORT_API_FAIL,
} from "../constants/apiConstatns";
import { alertTitleClasses } from "@mui/material";

// Get APIS Detail
export const getApiDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: API_DETAILS_REQUEST,
      });

      const { data } = await axios.get(`/api/v1/admin/api/${id}`);

      dispatch({
        type: API_DETAILS_SUCCESS,
        payload: data.api,                   //match with backend
      });
    } catch (error) {
      dispatch({
        type: API_DETAILS_FAIL,
        payload: error.message,
      });
    }
  };
};

// Get all apis:
export const getAdminApis = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_API_REQUEST });

    const { data } = await axios.get("/api/v1/admin/apis");

    dispatch({ type: ADMIN_API_SUCCESS, payload: data.apis });
  } catch (error) {
    dispatch({ type: ADMIN_API_FAIL, payload: error.message });
  }
};

export function createApi(apiData) {
  return async function (dispatch) {
    try {
      dispatch({ type: NEW_API_REQUEST });


      let isMultipart = apiData instanceof FormData;
      const config = {
        headers: { "Content-Type": isMultipart ? "multipart/form-data" : "application/json" },
      };

      console.log("Sending Data:", apiData); // Debugging

      const { data } = await axios.post(`/api/v1/admin/api/new`, apiData, config);

      dispatch({
        type: NEW_API_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.error("API Validation Error:", error.response?.data?.message || error.message);
      dispatch({
        type: NEW_API_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
}

export function connectApi(id) {
  return async function (dispatch) {
    try {
      dispatch({ type: CONNECT_API_REQUEST });
      const { data } = await axios.post(`/api/v1/admin/api/connect/${id}`);

      localStorage.setItem(`${data.data.name}token`, JSON.stringify(data.data.token));
      dispatch({
        type: CONNECT_API_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: CONNECT_API_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
}

export function importApi(id, token, apiData) {
  return async function (dispatch) {
    try {
      dispatch({ type: IMPORT_API_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const requestData = {
        token,
        filter: {
          page: apiData.page || 1,
          minPriceFrom: apiData.minPriceFrom || 0,
          minPriceTo: apiData.minPriceTo || Number.MAX_SAFE_INTEGER,
          minQty: apiData.minQty || 0,
          includeOutOfStock: apiData.includeOutOfStock || false,
          updatedAtFrom: apiData.updatedAtFrom ? new Date(apiData.updatedAtFrom).toISOString().replace('T', ' ').substring(0, 19) : new Date(0).toISOString().replace('T', ' ').substring(0, 19),
          updatedAtTo: apiData.updatedAtTo ? new Date(apiData.updatedAtTo).toISOString().replace('T', ' ').substring(0, 19) : new Date().toISOString().replace('T', ' ').substring(0, 19),
        },
      };

      const { data } = await axios.post(`/api/v1/admin/api/import/${id}`, requestData, config);
      if (data.success) {
        dispatch({
          type: IMPORT_API_SUCCESS,
          payload: data.success,
        });
      }
    } catch (error) {
      dispatch({
        type: IMPORT_API_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
}


export function exportApi(id, token, apiData, alert) {
  return async function (dispatch) {
    try {
      dispatch({ type: EXPORT_API_REQUEST });
      
      //Just for testing
      const data = {
        success: true
      };

      if (data.success) {
        alert.success("API has been exported successfully!");
        dispatch({
          type: EXPORT_API_SUCCESS,
          payload: data.success,
        });
      }
    } catch (error) {
      alert.error("Connection has failed!:", error.response?.data?.message || error.message);

      dispatch({
        type: EXPORT_API_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
}

// Delete Api request

export function deleteApi(id) {
  return async function (dispatch) {
    try {
      dispatch({ type: DELETE_API_REQUEST });

      const { data } = await axios.delete(`/api/v1/admin/api/${id}`);

      dispatch({ type: DELETE_API_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({ type: DELETE_API_FAIL, payload: error.message });
    }
  };
}

export const updateApi = (id, apiData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_API_REQUEST });

    let isMultipart = apiData instanceof FormData;
    const config = {
      headers: { "Content-Type": isMultipart ? "multipart/form-data" : "application/json" },
    };

    console.log("Updating API with data:", apiData); // Debugging

    const { data } = await axios.put(`/api/v1/admin/api/${id}`, apiData, config);

    dispatch({
      type: UPDATE_API_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("Update API Validation Error:", error.response?.data?.message || error.message);
    dispatch({
      type: UPDATE_API_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};


// clear error
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
