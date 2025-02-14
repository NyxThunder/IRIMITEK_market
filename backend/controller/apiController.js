const apiModel = require("../model/apiModel");
const ProductModel = require("../model/ProductModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncWrapper = require("../middleWare/asyncWrapper");
const ApiFeatures = require("../utils/apiFeatures");
const G2AApi = require("./g2aApiController");
const { authenticate, importProducts, exportProduct, getBestsellers } = require("./g2aApiController");
const cloudinary = require("cloudinary");
const axios = require('axios');
const productController = require("./productController");

// >>>>>>>>>>>>>>>>>>>>> createApi Admin route  >>>>>>>>>>>>>>>>>>>>>>>>
exports.createApi = asyncWrapper(async (req, res) => {
  let images = [];

  if (req.body.name == "G2A") {

    const myForm = new FormData();
    myForm.set("grant_type", "client_credentials");
    myForm.set("client_id", req.body.clientId);
    myForm.set("client_secret", req.body.clientSecret);

    const response = await authenticate(myForm);

    if (response) {
      const products = await importProducts({ page: 1 });

      for (const product of products.docs) {
        const productData = {
          body: {
            name: product.name,
            price: product.minPrice,
            description: product.name,
            category: product.categories[0].name,
            Stock: product.qty,
            info: product.platform,
            images: product.thumbnail,
            user: req.user.id,
          }          
        };

        if (productData.body.images) {
          if (typeof productData.body.images === "string") {
            images.push(productData.body.images);
          } else {
            images = productData.body.images;
          }

          const imagesLinks = [];

          // Split images into chunks due to cloudinary upload limits only 3 images can be uploaded at a time so we are splitting into chunks and uploading them separately eg: 9 images will be split into 3 chunks and uploaded separately
          const chunkSize = 3;
          const imageChunks = [];
          while (images.length > 0) {
            imageChunks.push(images.splice(0, chunkSize));
          }


          // Upload images in separate requests. for loop will run 3 times if there are 9 images to upload each time uploading 3 images at a time
          for (let chunk of imageChunks) {
            const uploadPromises = chunk.map((img) =>
              cloudinary.v2.uploader.upload(img, {
                folder: "Products",
                timeout: 120000, // Increase timeout to 2 minutes
              })
            );

            try {
              const results = await Promise.all(uploadPromises); // wait for all the promises to resolve and store the results in results array eg: [{}, {}, {}] 3 images uploaded successfully and their details are stored in results array

              for (let result of results) {
                imagesLinks.push({
                  product_id: result.public_id,
                  url: result.secure_url,
                });
              }
            } catch (error) {
              console.error("Error uploading images to Cloudinary:", error);
              // Retry logic can be added here if needed
            }
          }

          productData.body.images = imagesLinks;
        }

        await ProductModel.create(productData.body);
      }
    }
  }
  // const data = await apiModel.create(req.body);
  res.status(200).json({ success: true, data: req.body });
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

