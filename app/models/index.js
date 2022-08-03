const dbConfig = require("../../config/db.config");
const mongoose = require("mongoose");

// use this for mongoose ver 4
// because mongoose 4 use its own promise, mpromise
// but it is deprecated in ver 4 so
// there will be warning to plug in your own promise library instead
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.posts = require("./post.model")(mongoose);

module.exports = db;
