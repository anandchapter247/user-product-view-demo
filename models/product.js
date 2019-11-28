var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  productName: String
});

module.exports = mongoose.model("product", ProductSchema);
