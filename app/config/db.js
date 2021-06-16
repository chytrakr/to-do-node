const mongoose = require('mongoose');
const uri = require('./settings');
mongoose.connect(uri, { useNewUrlParser: true });
module.exports = mongoose.connection;