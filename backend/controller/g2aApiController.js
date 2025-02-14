const axios = require("axios");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config({ path: "./config/config.env" });

const G2A_BASE_URL = process.env.G2A_BASE_URL;
const G2A_CLIENT_ID = process.env.G2A_CLIENT_ID;
const G2A_CLIENT_SECRET = process.env.G2A_CLIENT_SECRET;

// Store the access token globally (cache it to avoid unnecessary requests)
let accessToken = null;

// Function to get an OAuth2 token
const authenticate = async () => {
    try {
        const response = await axios.post(
            `${G2A_BASE_URL}/oauth/token`,
            new URLSearchParams({
                client_id: G2A_CLIENT_ID,
                client_secret: G2A_CLIENT_SECRET,
                grant_type: "client_credentials",
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        accessToken = response.data.access_token; // Save the access token
        return accessToken;
    } catch (error) {
        console.error("G2A Authentication Error:", error.response?.data || error.message);
        throw new Error("Failed to authenticate with G2A API.");
    }
};

// Function to get authorization headers
const getHeaders = async () => {
  if (!accessToken) await authenticate(); // Refresh token if not set
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
};

// Import products from G2A
const importProducts = async (params = {}) => {
    try {
        const headers = await getHeaders();
        const response = await axios.get(`${G2A_BASE_URL}/v1/products`, {
            headers,
            params: {
                page: params.page || 1,
                id: params.id,
                minQty: params.minQty,
                minPriceFrom: params.minPriceFrom,
                minPriceTo: params.minPriceTo,
                includeOutOfStock: params.includeOutOfStock || 'false',
                updatedAtFrom: params.updatedAtFrom,
                updatedAtTo: params.updatedAtTo,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error Importing Products:", error.response?.data || error.message);
        throw new Error("Failed to import products from G2A.");
    }
};

// Get bestsellers from G2A
const getBestsellers = async (params = {}) => {
    try {
        const headers = await getHeaders();
        const response = await axios.get(`${G2A_BASE_URL}/v3/sales/bestsellers`, {
            headers,
            params: {
                daysNumber: params.daysNumber || 2,
                page: params.page || 1,
                itemsPerPage: params.itemsPerPage || 100,
                productIds: params.productIds,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error Fetching Bestsellers:", error.response?.data || error.message);
        throw new Error("Failed to fetch bestsellers from G2A.");
    }
};


// Export a product to G2A
const exportProduct = async (productData) => {
  try {
    const headers = await getHeaders();
    const response = await axios.post(`${G2A_BASE_URL}/v1/products`, productData, { headers });
    return response.data;
  } catch (error) {
    console.error("Error Exporting Product:", error.response?.data || error.message);
    throw new Error("Failed to export product to G2A.");
  }
};

module.exports = { authenticate, importProducts, exportProduct, getBestsellers };
