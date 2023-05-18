
const mongoose = require('mongoose');
var tokenSchema = mongoose.Schema({
  tokens: String
});
var tokenModel = mongoose.model("tokens", tokenSchema);

module.exports = tokenModel;