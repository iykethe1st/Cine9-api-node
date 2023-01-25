const winston = require("winston");
const mongoose = require("mongoose");
const { logger } = require("../middleware/logger");

module.exports = function (params) {
  mongoose
    .connect("mongodb://localhost/vidcity")
    .then(() => logger.info("Connected to MongoDB..."));
};
