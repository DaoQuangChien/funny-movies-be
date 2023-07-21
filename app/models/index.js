const mongoose = require("mongoose");
const db = {};

mongoose.Promise = global.Promise;
db.mongoose = mongoose;
module.exports = db;
