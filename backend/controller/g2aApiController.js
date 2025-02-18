const axios = require("axios");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config({ path: "./config/config.env" });

const G2A_BASE_URL = process.env.G2A_BASE_URL;

// Store the access token globally (cache it to avoid unnecessary requests)
let accessToken = null;

// Function to get an OAuth2 token
const authenticate = async (authData) => {
    try {
        const response = await axios.post(
            `https://api.g2a.com/oauth/token`,
            authData,
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

// Function to get headers for API requests
const getHeaders = () => {
    return {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${accessToken}`,
    };
};

// Import products from G2A
const importProducts = async (token, params = {}) => {
    try {        
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`.replace(/"/g, ""),
        };
        const response = await axios.get(`https://api.g2a.com/v1/products`, {
            headers,
            params: {
                page: params.page || 1,
                minQty: params.minQty,
                // minPriceFrom: params.minPriceFrom,
                // minPriceTo: params.minPriceTo,
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
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.get(`https://api.g2a.com/v3/sales/bestsellers`, {
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
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.post(`https://api.g2a.com/v1/products`, productData, { headers });
        return response.data;
    } catch (error) {
        console.error("Error Exporting Product:", error.response?.data || error.message);
        throw new Error("Failed to export product to G2A.");
    }
};

module.exports = { authenticate, importProducts, exportProduct, getBestsellers };
