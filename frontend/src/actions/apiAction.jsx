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
} from "../constants/apiConstatns";

// get ALL APIS
export const getAPI = () => {
  return async (dispatch) => {
    try {
      // initial state :
      dispatch({
        type: ALL_API_REQUEST,
      });

      let link = `/api/v1/api`;
      
      const { data } = await axios.get(link);

      dispatch({
        type: ALL_API_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_API_FAIL,
        payload: error.message,
      });
    }
  };
};

// Get APIS Detail
export const getApiDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: API_DETAILS_REQUEST,
      });

      const { data } = await axios.get(`/api/v1/api/${id}`);

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

// admin api request :
export const getAdminApis = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_API_REQUEST });

    const { data } = await axios.get("/api/v1/admin/apis");

    dispatch({ type: ADMIN_API_SUCCESS, payload: data.apis });
  } catch (error) {
    dispatch({ type: ADMIN_API_FAIL, payload: error.message });
  }
};

// Create Api
export function createApi(apiData) {
  return async function(dispatch) {
    try {
      dispatch({
        type: NEW_API_REQUEST,
      });
         
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      const { data } = await axios.post(
        `/api/v1/admin/api/new`,
        apiData,
        config
      );

      dispatch({
        type: NEW_API_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_API_FAIL,
        payload: error.message,
      });
    }
  };
}

// Delete Api request

export function deleteApi(id) {
  return async function(dispatch) {
    try {
      dispatch({ type: DELETE_API_REQUEST });

      const { data } = await axios.delete(`/api/v1/admin/api/${id}`);
    
      dispatch({ type: DELETE_API_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({ type: DELETE_API_FAIL, payload: error.message });
    }
  };
}

// updateApi;
export const updateApi = (id, apiData) => async (dispatch) => {
         try {
           dispatch({ type: UPDATE_API_REQUEST });

           const config = {
              headers: { "Content-Type": "multipart/form-data" },
           };

           const { data } = await axios.put(
             `/api/v1/admin/api/${id}`,
             apiData,
             config
           );

           dispatch({
             type: UPDATE_API_SUCCESS,
             payload: data.success,
           });
         } catch (error) {
           dispatch({
             type: UPDATE_API_FAIL,
             payload: error.message,
           });
         }
       };


// clear error
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
