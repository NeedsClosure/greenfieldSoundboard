var mongoose = require('mongoose');
mongoose.connect('mongodb://needsclosure:needsclosure1@ds027175.mlab.com:27175/soundboard');
var conn = mongoose.connection;

module.exports = {
  "conn": conn
};
