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
  CONNECT_API_REQUEST,
  CONNECT_API_FAIL,
  CONNECT_API_SUCCESS,
  CONNECT_API_RESET,
  IMPORT_API_REQUEST,
  IMPORT_API_SUCCESS,
  IMPORT_API_FAIL,
  IMPORT_API_RESET,
  EXPORT_API_REQUEST,
  EXPORT_API_FAIL,
  EXPORT_API_SUCCESS,
  EXPORT_API_RESET,
  GET_OFFERS_REQUEST,
  GET_OFFERS_SUCCESS,
  GET_OFFERS_FAIL,
  GET_OFFERS_RESET,
  DELETE_OFFER_REQUEST,
  DELETE_OFFER_SUCCESS,
  DELETE_OFFER_FAIL,
  DELETE_OFFER_RESET,
  UPDATE_RETAIL_PRICE_REQUEST,
  UPDATE_RETAIL_PRICE_SUCCESS,
  UPDATE_RETAIL_PRICE_FAIL,
  UPDATE_RETAIL_PRICE_RESET
} from '../constants/apiConstatns';

export const apisReducer = (state = { apis: [] }, action) => {
  switch (action.type) {
    case ALL_API_REQUEST:
    case ADMIN_API_REQUEST: {
      return {
        ...state,
        loading: true,
        apis: []
      };
    }

    case ADMIN_API_SUCCESS:
      return {
        loading: false,
        apis: action.payload
      };

    case ALL_API_SUCCESS: {
      return {
        loading: false,
        apis: action.payload.apis,
        apisCount: action.payload.apisCount,
        resultPerPage: action.payload.resultPerPage,
        filterdProductCount: action.payload.filterdProductCount
      };
    }
    case ALL_API_FAIL:
    case ADMIN_API_FAIL: {
      return {
        loading: false,
        error: action.payload
      };
    }
    // Clear error
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// api detalis  :
export const apiDetailsReducer = (state = { api: {} }, action) => {
  switch (action.type) {
    case API_DETAILS_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case API_DETAILS_SUCCESS:
      return {
        loading: false,
        api: action.payload, // product details from backend
        success: true
      };
    case API_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case API_DETAILS_RESET:
      return {
        success: false,
        ...state
      };

    // error msg clear
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
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
        newApiData: action.payload.data
      };

    case NEW_API_FAIL: {
      console.log(action.type);
      return {
        loading: false,
        error: action.payload
      };
    }
    case NEW_API_RESET:
      return {
        ...state,
        success: false
      };
    case CLEAR_ERRORS: {
      return {
        ...state,
        error: null
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
        loading: true
      };

    case UPDATE_API_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload
      };
    case DELETE_API_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload
      };
    case DELETE_API_FAIL:
    case UPDATE_API_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case UPDATE_API_RESET:
      return {
        ...state,
        isUpdated: false
      };

    case DELETE_API_RESET:
      return {
        ...state,
        isDeleted: false
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}

// Connect API reducer
export const connectApiReducer = (state = { connected: false }, action) => {
  switch (action.type) {
    case CONNECT_API_REQUEST:
      return {
        ...state,
        loading: true
      };
    case CONNECT_API_SUCCESS:
      return {
        ...state,
        loading: false,
        connected: action.payload
      };
    case CONNECT_API_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    case CONNECT_API_RESET:
      return {
        ...state,
        connected: false
      };
    default:
      return state;
  }
};

// Import API reducer
export const importApiReducer = (state = { imported: false }, action) => {
  switch (action.type) {
    case IMPORT_API_REQUEST:
      return {
        ...state,
        loading: true
      };
    case IMPORT_API_SUCCESS:
      return {
        ...state,
        loading: false,
        imported: action.payload
      };
    case IMPORT_API_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    case IMPORT_API_RESET:
      return {
        ...state,
        imported: false
      };
    default:
      return state;
  }
};

// Export API reducer
export const exportApiReducer = (state = { exported: false }, action) => {
  switch (action.type) {
    case EXPORT_API_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case EXPORT_API_SUCCESS:
      return {
        ...state,
        loading: false,
        exported: action.payload.success,
        message: action.payload.message,
        jobId: action.payload.jobId
      };
    case EXPORT_API_FAIL:
      return {
        ...state,
        loading: false,
        exported: false,
        error: action.payload.message,
        status: action.payload.status
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        status: null
      };
    case EXPORT_API_RESET:
      return {
        ...state,
        exported: false,
        message: null,
        jobId: null
      };
    default:
      return state;
  }
};

// Get Offers reducer
export const allOffersReducer = (state = { offers: [] }, action) => {
  switch (action.type) {
    case GET_OFFERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_OFFERS_SUCCESS:
      return {
        ...state,
        loading: false,
        offers: action.payload
      };
    case GET_OFFERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GET_OFFERS_RESET:
      return {
        ...state,
        offers: []
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Delete Offer reducer
export const deleteUpdateOfferReducer = (state = { offer: {} }, action) => {
  switch (action.type) {
    case DELETE_OFFER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case DELETE_OFFER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload
      };
    case DELETE_OFFER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case DELETE_OFFER_RESET:
      return {
        ...state,
        isDeleted: false
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Update Retail Price reducer
export const updateRetailPriceReducer = (state = { updated: false }, action) => {
  switch (action.type) {
    case UPDATE_RETAIL_PRICE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case UPDATE_RETAIL_PRICE_SUCCESS:
      return {
        ...state,
        loading: false,
        updated: action.payload
      };
    case UPDATE_RETAIL_PRICE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case UPDATE_RETAIL_PRICE_RESET:
      return {
        ...state,
        updated: false
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
