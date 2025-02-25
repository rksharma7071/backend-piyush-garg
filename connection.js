const mongoose = require("mongoose");

// Connect to MongoDB
async function conntectMongoDb(url) {
  return mongoose.connect(url)
}


module.exports = {
  conntectMongoDb
}