const apiModel = require("../model/apiModel");
const ProductModel = require("../model/ProductModel");
const OfferModel = require("../model/offerModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncWrapper = require("../middleWare/asyncWrapper");
const ApiFeatures = require("../utils/apiFeatures");
const { authenticate, importProducts, exportProduct, getOffersList } = require("./g2aApiController");
const cloudinary = require("cloudinary");
const FormData = require("form-data");
const { JsonWebTokenError } = require("jsonwebtoken");

// Create API Admin route
exports.createApi = asyncWrapper(async (req, res, next) => {
  const { name, clientId, clientSecret } = req.body;

  if (!name || !clientId || !clientSecret) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }

  const api = await apiModel.create({
    name,
    clientId,
    clientSecret,
    user: req.user.id,
  });

  res.status(201).json({
    success: true,
    api,
  });
});

exports.connectApi = asyncWrapper(async (req, res) => {
  let api = await apiModel.findById(req.params.id);

  if (api._doc.name === "G2A") {
    const myForm = new FormData();
    myForm.append("grant_type", "client_credentials");
    myForm.append("client_id", api.clientId);
    myForm.append("client_secret", api.clientSecret);

    const g2aToken = await authenticate(myForm);

    res.status(200).json({ success: true, data: { name: api.name, token: g2aToken } });
  }
});

exports.importApi = asyncWrapper(async (req, res) => {
  const { token, filter } = req.body;
  let images = [];

  if (token) {
    const filterOptions = {
      page: filter.page || 1,
      minPriceFrom: filter.minPriceFrom || 0,
      minPriceTo: filter.minPriceTo || Number.MAX_SAFE_INTEGER,
      minQty: filter.minQty || 0,
      includeOutOfStock: filter.includeOutOfStock || false,
      updatedAtFrom: filter.updatedAtFrom || new Date(0),
      updatedAtTo: filter.updatedAtTo || new Date(),
    };

    const products = await importProducts(token, filterOptions);

    for (const product of products.docs) {
      const productData = {
        body: {
          name: product.name,
          productId: product.id,
          price: product.minPrice,
          retailMinPrice: product.retail_min_price,
          retailMinBasePrice: product.retailMinBasePrice,
          description: product.name,
          category: product.categories[0].name,
          Stock: product.qty,
          info: product.platform,
          images: product.coverImage,
          user: req.user.id,
        },
      };

      if (productData.body.images) {
        if (typeof productData.body.images === "string") {
          images.push(productData.body.images);
        } else {
          images = productData.body.images;
        }

        const imagesLinks = [];
        const chunkSize = 3;
        const imageChunks = [];

        while (images.length > 0) {
          imageChunks.push(images.splice(0, chunkSize));
        }

        for (let chunk of imageChunks) {
          const uploadPromises = chunk.map((img) =>
            cloudinary.v2.uploader.upload(img, {
              folder: "Products",
              timeout: 120000,
            })
          );

          try {
            const results = await Promise.all(uploadPromises);

            for (let result of results) {
              imagesLinks.push({
                product_id: result.public_id,
                url: result.secure_url,
              });
            }
          } catch (error) {
            console.error("Error uploading images to Cloudinary:", error);
          }
        }
        productData.body.images = imagesLinks;
      }
      await ProductModel.create(productData.body);
    }
  }
  res.status(200).json({ success: true, data: "All products imported successfully!" });
});

// Get all APIs
exports.getAllApis = asyncWrapper(async (req, res) => {
  const resultPerPage = 6;
  const apisCount = await apiModel.countDocuments();

  const apiFeature = new ApiFeatures(apiModel.find(), req.query)
    .search()
    .filter();

  let apis = await apiFeature.query;
  let filteredApiCount = apis.length;

  apiFeature.Pagination(resultPerPage);
  apis = await apiFeature.query.clone();

  res.status(201).json({
    success: true,
    apis,
    apisCount,
    resultPerPage,
    filteredApiCount,
  });
});

// Get all APIs for admin
exports.getAllApisAdmin = asyncWrapper(async (req, res) => {
  const apis = await apiModel.find();

  res.status(201).json({
    success: true,
    apis,
  });
});

// Update API Admin route
exports.updateApi = asyncWrapper(async (req, res, next) => {
  let api = await apiModel.findById(req.params.id);

  if (!api) {
    return next(new ErrorHandler("Api not found", 404));
  }

  api = await apiModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(201).json({
    success: true,
    api,
  });
});

// Delete API Admin route
exports.deleteApi = asyncWrapper(async (req, res, next) => {
  let api = await apiModel.findById(req.params.id);

  if (!api) {
    return next(new ErrorHandler("Api not found", 404));
  }

  await api.remove();

  res.status(201).json({
    success: true,
    message: "Api deleted successfully",
  });
});

// Get API details
exports.getApiDetails = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const api = await apiModel.findById(id);

  if (!api) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(201).json({
    success: true,
    api,
  });
});


// Export API Admin route
exports.exportApi = asyncWrapper(async (req, res) => {
  try {
    const { token } = req.body;
    const { productId, retailPrice, inventorySize, productName } = req.body.data;

    if (!productId || !retailPrice || !inventorySize) {
      return res.status(400).json({ error: "Missing required product fields" });
    }

    const productPayload = {
      productId,
      retailPrice,
      inventorySize,
      visibility: "retail",
    };

    try {
      const response = await exportProduct(productPayload, token);


      const newOffer = new OfferModel({
        id: response,
        type: "dropshipping",
        createdAt: new Date(),
        updatedAt: new Date(),
        expireAt: new Date() + 30 * 24 * 60 * 60 * 1000,
        price: retailPrice,
        businessPrice: retailPrice,
        visibility: "all",
        status: "active",
        inventory: {
          size: inventorySize,
          sold: 0,
          declaredSize: inventorySize,
          type: "fixed",
        },
        product: {
          id: productId,
          name: productName,
          sku: "",
        },
        promo: {
          status: "inactive",
        },
      });

      await newOffer.save();

      res.json({
        success: true,
        message: "Product exported successfully!",
        jobId: response,
      });
    } catch (error) {
      if (error.message.includes("Unauthorized")) {
        return res.status(401).json({ error: "Unauthorized: Invalid or expired access token." });
      }
      if (error.message.includes("Conflict")) {
        return res.status(409).json({ error: "Conflict: The product already exists as a dropshipping offer." });
      }
      res.status(500).json({ error: "Failed to export product to G2A" });
    }
  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Get All Offers route here
exports.getAllOffers = asyncWrapper(async (req, res) => {
  try {
    const { token } = req.body;

    if (!JsonWebTokenError) {
      return res.status(400).json({ error: "Token is missed" });
    }

    const requestData = {
      accessToken: token,
      page: 2,
      itemsPerPage: 20,
    };

    const response = getOffersList(requestData);

    res.json({
      success: true,
      message: "All offers imported successfully!",
      offers: response,
    });

  } catch (error) {
    console.error("Error getting offers:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get offers from G2A" });
  }
});


// Get details of a specific offer by offerId
exports.getOfferDetails = asyncWrapper(async (req, res) => {
  const offerId = req.param.offerId;
  const { token } = req.body;

  if (!offerId || !token) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const offerDetails = await getOfferDetails(offerId, token);
    res.status(200).json({ success: true, data: offerDetails });
  } catch (error) {
    console.error("Failed to fetch offer details:", error.message);
    res.status(500).json({ error: "Failed to fetch offer details" });
  }
});

// Update an existing offer
exports.updateOffer = asyncWrapper(async (req, res) => {
  const offerId = req.param.offerId;
  const { data, token } = req.body;

  if (!offerId || !payload || !token) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const jobId = await updateOffer(offerId, data, token);
    res.status(200).json({ success: true, message: "Offer updated successfully!", jobId });
  } catch (error) {
    console.error("Failed to update offer:", error.message);
    res.status(500).json({ error: "Failed to update offer" });
  }
});

// Delete a dropshipping offer
exports.deleteOffer = asyncWrapper(async (req, res) => {
  const offerId = req.param.offerId;
  const { token } = req.body;

  if (!offerId || !token) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await deleteOffer(offerId, token);
    res.status(200).json({ success: true, message: "Offer deleted successfully!" });
  } catch (error) {
    console.error("Failed to delete offer:", error.message);
    res.status(500).json({ error: "Failed to delete offer" });
  }
});

// Get the seller orders list
exports.getSellerOrders = asyncWrapper(async (req, res) => {
  const { token, page, itemsPerPage, orderStatus } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const orders = await getSellerOrders(token, page, itemsPerPage, orderStatus);
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Failed to fetch seller orders:", error.message);
    res.status(500).json({ error: "Failed to fetch seller orders" });
  }
});
