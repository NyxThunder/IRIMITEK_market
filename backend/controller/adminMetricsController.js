const ProductModel = require("../model/ProductModel");
const orderModel = require("../model/orderModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncWrapper = require("../middleWare/asyncWrapper");

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> get all metrics >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.getAllMetrics = asyncWrapper(async (req, res, next) => {
    try {
        const products = await ProductModel.find();
        const orders = await orderModel.find();

        let OutOfStock = 0;
        products &&
            products.forEach((element) => {
                // check how much items out of stocks in products array
                if (element._doc.Stock === 0) {
                    OutOfStock += 1;
                }
            });

        const monthlyTarget = 100;
        // total Amount Earned = total Revenue
        let totalAmount = 0;
        orders &&
            orders.forEach((item) => {
                totalAmount += item._doc.totalPrice;
            });

        const metrics = {
            "OutOfStock": OutOfStock,
            "TotalAmount": (Math.floor(totalAmount*100))/100,
            "MonthlyTarget": (Math.floor(monthlyTarget*100))/100,
        };
        res.status(201).json({
            success: true,
            metrics: metrics,
        });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
});
