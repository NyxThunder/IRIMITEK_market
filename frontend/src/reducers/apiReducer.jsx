import {
  ALL_API_REQUEST,
  ALL_API_SUCCESS,
  ALL_API_FAIL,
  ADMIN_API_REQUEST,
  ADMIN_API_SUCCESS,
  ADMIN_API_FAIL,
  CLEAR_ERRORS,
  API_DETAILS_REQUEST,
  API_DETAILS_SUCCESS,
  API_DETAILS_RESET,
  API_DETAILS_FAIL,
  NEW_API_REQUEST,
  NEW_API_SUCCESS,
  NEW_API_FAIL,
  NEW_API_RESET,
  DELETE_API_REQUEST,
  DELETE_API_SUCCESS,
  DELETE_API_FAIL,
  DELETE_API_RESET,
  UPDATE_API_REQUEST,
  UPDATE_API_SUCCESS,
  UPDATE_API_FAIL,
  UPDATE_API_RESET,
} from "../constants/apiConstatns";

export const apisReducer = (state = { apis: [] }, action) => {
  switch (action.type) {
    case ALL_API_REQUEST:
    case ADMIN_API_REQUEST: {
      return {
        ...state,
        loading: true,
        apis: [],
      };
    }

    case ADMIN_API_SUCCESS:
      return {
        loading: false,
        apis: action.payload,
      };

    case ALL_API_SUCCESS: {
      return {
        loading: false,
        apis: action.payload.apis,
        apisCount: action.payload.apisCount,
        resultPerPage: action.payload.resultPerPage,
        filterdProductCount: action.payload.filterdProductCount,
      };
    }
    case ALL_API_FAIL:
    case ADMIN_API_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    // Clear error
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// product detalis  :
export const apiDetailsReducer = (state = { api: {} }, action) => {
  switch (action.type) {
    case API_DETAILS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case API_DETAILS_SUCCESS:
      return {
        loading: false,
        api: action.payload, // product details from backend
        success: true,
      };
    case API_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,

      };
      case API_DETAILS_RESET:
        return {
         success: false,
        ...state,
        };

    // error msg clear
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//cretae a api reducer

export const newApiReducer = (state = { newApiData: [] }, action) => {
  switch (action.type) {
    case NEW_API_REQUEST: {
      return { loading: true };
    }

    case NEW_API_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        newApiData: action.payload.data,
      };

    case NEW_API_FAIL: {
      console.log(action.type);
      return {
        loading: false,
        error: action.payload,
      };
    }
    case NEW_API_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }

    default:
      return state;
  }
};

// delte and Upadate reducer :

export function deleteUpdateApiReducer(state = { api: {} }, action) {
  switch (action.type) {
    case DELETE_API_REQUEST:
    case UPDATE_API_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_API_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_API_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_API_FAIL:
    case UPDATE_API_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_API_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_API_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

