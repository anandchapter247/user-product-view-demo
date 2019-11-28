var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserViewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  viewDate: Date,
  productId: { type: Schema.Types.ObjectId, ref: "products" }
});

module.exports = mongoose.model("userview", UserViewSchema);
