const mongoose  = require("mongoose");
const apiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter api name"],
    trim: true,
  },
  clientId: {
    type: String,
    required: [true, "Please Enter client ID"],
  },
  clientSecret: {
    type: String,
    required: [true, "Please Enter client Secret"],
  },
  status: {
    type: String,
    default: "Inactive",
    required: [true, "Please Enter client Secret"],
  },
  
  // when two admins are there. tab ye pta chalgea kiss admin ne product add kiya hai
  user: {
    type: mongoose.Schema.ObjectId, //  this is for admin who will add the prduct to the db
    ref: "userModel",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const apiModel = mongoose.models.apiModel || mongoose.model("apiModel", apiSchema);

module.exports =apiModel