const mongoose = require("mongoose");

const offerSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  expireAt: {
    type: Date,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  businessPrice: {
    type: String,
    required: true,
  },
  visibility: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  inventory: {
    size: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      required: true,
    },
    declaredSize: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  product: {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
    },
  },
  promo: {
    status: {
      type: String,
      required: true,
    },
  },
});

const OfferModel = mongoose.model("OfferModel", offerSchema);
module.exports = OfferModel;
