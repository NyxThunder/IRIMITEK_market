const apiModel = require("../model/apiModel");
const ProductModel = require("../model/ProductModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncWrapper = require("../middleWare/asyncWrapper");
const ApiFeatures = require("../utils/apiFeatures");
const { authenticate, importProducts, exportProduct } = require("./g2aApiController");
const cloudinary = require("cloudinary");
const FormData = require("form-data");

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
          price: product.minPrice,
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
    const { productName, price, stock, description, category, imageUrl } = req.body;

    if (!productName || !price || !stock || !category || !imageUrl) {
      return res.status(400).json({ error: "Missing required product fields" });
    }

    const productPayload = {
      name: productName,
      price: price, // Adjust for dropshipping
      stock: stock,
      category: category,
      description: description,
      imageUrl: imageUrl
    };
    
    const response = exportProduct(productPayload);

    res.status(200).json({ message: "Product exported successfully!", data: response });

  } catch (error) {
    console.error("Error exporting product:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to export product to G2A" });
  }
});
