const apiModel = require("../model/apiModel");
const ProductModel = require("../model/ProductModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncWrapper = require("../middleWare/asyncWrapper");
const ApiFeatures = require("../utils/apiFeatures");
const G2AApi = require("./g2aApiController");
const cloudinary = require("cloudinary");
const axios = require('axios');
const productController = require("./productController");

// >>>>>>>>>>>>>>>>>>>>> createApi Admin route  >>>>>>>>>>>>>>>>>>>>>>>>
exports.createApi = asyncWrapper(async (req, res) => {
  
  const data = await apiModel.create(req.body);

  if(req.body.name === "G2A"){
    const g2aApi = new G2AApi();
    const response = await g2aApi.importProducts({page: 2});
    console.log(response);
  }

  if (response && response.products) {
    for (const product of response.products) {
      // Ensure the product data is correctly formatted
      const productData = {
        body: {
          name: product.name,
          price: product.price,
          description: product.description,
          category: product.category,
          Stock: product.Stock,
          info: product.info,
          images: product.images,
        },
        user: req.user, // Pass the user information if needed
      };
      await productController.createProduct(productData);
    }
  }




  res.status(200).json({ success: true, data: data });
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> get all apis >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.getAllApis = asyncWrapper(async (req, res) => {
  const resultPerPage = 6; 
  const apisCount = await apiModel.countDocuments(); 

  // Create an instance of the ApiFeatures class, passing the apiModel.find() query and req.query (queryString)
  const apiFeature = new ApiFeatures(apiModel.find(), req.query)
    .search() // Apply search filter based on the query parameters
    .filter(); // Apply additional filters based on the query parameters

  let apis = await apiFeature.query; // Fetch the apis based on the applied filters and search

  let filteredApiCount = apis.length; // Number of apis after filtering (for pagination)

  apiFeature.Pagination(resultPerPage); // Apply pagination to the apis

  // Mongoose no longer allows executing the same query object twice, so use .clone() to retrieve the products again
  apis = await apiFeature.query.clone(); // Retrieve the paginated apis

  res.status(201).json({
    success: true,
    apis: apis,
    apisCount: apisCount,
    resultPerPage: resultPerPage,
    filteredApiCount: filteredApiCount,
  });
});




// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> get all api admin route>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

exports.getAllApisAdmin = asyncWrapper(async (req, res) => {

  const apis = await apiModel.find();

  res.status(201).json({
    success: true,
    apis,
  });

});




//>>>>>>>>>>>>>>>>>> Update Admin Route >>>>>>>>>>>>>>>>>>>>>>>
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
    api: api,
  });
});


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  delete api --admin  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.deleteApi = asyncWrapper(async (req, res, next) => {
  let api = await apiModel.findById(req.params.id);

  if (!api) {
    return next(new ErrorHandler("Api not found", 404));
  }

  await api.remove();

  res.status(201).json({
    success: true,
    message: "Api delete successfully",
  });
});

//>>>>>>>>>>>>>>>>>>>>>>> Detils of api >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.getApiDetails = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const api = await apiModel.findById(id);
  if (!api) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(201).json({
    succes: true,
    api: api,
  });
});

