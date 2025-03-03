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
const getBestsellers = async (token, params = {}) => {
    try {
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`.replace(/"/g, ""),
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

// Export product as a dropshipping offer
const exportProduct = async (productPayload, accessToken) => {
    try {
        const inventorySize = parseInt(productPayload.inventorySize, 10);
        if (isNaN(inventorySize)) {
            throw new Error("Invalid inventory size. It must be an integer.");
        }

        console.log(`Bearer ${accessToken}`.replace(/"/g, ""));

        const response = await axios.post(
            "https://api.g2a.com/v3/sales/offers",
            {
                offerType: "dropshipping",
                variants: [
                    {
                        price: { retail: productPayload.retailPrice },
                        productId: productPayload.productId,
                        active: true,
                        inventory: { size: inventorySize },
                        visibility: "retail",
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`.replace(/"/g, ""),
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data.data.jobId;
    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;

            if (status === 401) {
                console.error("Unauthorized: Invalid or expired access token.");
                throw new Error("Unauthorized: Invalid or expired access token.");
            }

            if (status === 409) {
                console.error("Conflict: The product already exists as a dropshipping offer.", data);
                throw new Error(`Conflict: Offer already exists (Offer ID: ${data?.data?.offerId || 'Unknown'})`);
            }

            console.error("Export failed with status:", status, "and message:", data.message);
            throw new Error(`Export failed: ${data.message}`);
        } else {
            console.error("Export failed:", error.message);
            throw new Error(error.message);
        }
    }
};

// Get the list of offers (dropshipping)
const getOffersList = async (accessToken, page = 1, itemsPerPage = 20) => {
    try {
        const response = await axios.get(
            `https://api.g2a.com/v3/sales/offers`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`.replace(/"/g, ""),
                    "Content-Type": "application/json"
                },
                params: {
                    page: page,
                    itemsPerPage: itemsPerPage,
                    type: 'dropshipping',
                }
            }
        );
        return response.data.data;
    } catch (error) {
        console.error("Failed to fetch offers:", error.response?.data || error.message);
        throw new Error(error.response?.data || error.message);
    }
};

// Get details of a specific offer by offerId
const getOfferDetails = async (offerId, accessToken) => {
    try {
        const response = await axios.get(
            `https://api.g2a.com/v3/sales/offers/${offerId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`.replace(/"/g, ""),
                    "Content-Type": "application/json"
                },
            },

        );
        return response.data.data;
    } catch (error) {
        console.error("Failed to fetch offer details:", error.response?.data || error.message);
        throw new Error(error.response?.data || error.message);
    }
};

// Update an existing offer
const updateOffer = async (offerId, productPayload, accessToken) => {
    try {
        const response = await axios.patch(
            `https://api.g2a.com/v3/sales/offers/${offerId}`,
            {
                offerType: "dropshipping",
                variant: {
                    visibility: productPayload.visibility,
                    active: productPayload.active,
                    inventory: { size: productPayload.inventorySize },
                    price: { retail: productPayload.retailPrice },
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`.replace(/"/g, ""),
                    "Content-Type": "application/json"
                },
            }
        );
        return response.data.data.jobId;
    } catch (error) {
        console.error("Failed to update offer:", error.response?.data || error.message);
        throw new Error(error.response?.data || error.message);
    }
};

// Delete a dropshipping offer
const deleteOffer = async (offerId, accessToken) => {
    try {
        const response = await axios.delete(
            `https://api.g2a.com/v3/sales/offers/${offerId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`.replace(/"/g, ""),
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Failed to delete offer:", error.response?.data || error.message);
        throw new Error(error.response?.data || error.message);
    }
};

// Get the seller orders list
const getSellerOrders = async (accessToken, page = 1, itemsPerPage = 20, orderStatus = 'completed') => {
    try {
        const response = await axios.get(
            `https://api.g2a.com/v4/sales/orders`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`.replace(/"/g, ""),
                    "Content-Type": "application/json"
                },
                params: {
                    page: page,
                    itemsPerPage: itemsPerPage,
                    statuses: [orderStatus],
                }
            }
        );
        return response.data.data;
    } catch (error) {
        console.error("Failed to fetch seller orders:", error.response?.data || error.message);
        throw new Error(error.response?.data || error.message);
    }
};

// Get details of a specific seller order by orderId
const getSellerOrderDetails = async (orderId, accessToken) => {
    try {
        const response = await axios.get(
            `https://api.g2a.com/v4/sales/orders/${orderId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`.replace(/"/g, ""),
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data.data;
    } catch (error) {
        console.error("Failed to fetch order details:", error.response?.data || error.message);
        throw new Error(error.response?.data || error.message);
    }
};

module.exports = {
    exportProduct,
    getOffersList,
    getOfferDetails,
    updateOffer,
    deleteOffer,
    getSellerOrders,
    getSellerOrderDetails
};


module.exports = { authenticate, importProducts, exportProduct, getBestsellers };
