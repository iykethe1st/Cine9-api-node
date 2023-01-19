const winston = require("winston");

const logger = winston.createLogger({
  transports: [new winston.transports.File({ filename: "logfile.log" })],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = function (err, req, res, next) {
  logger.error(err.message, err);
  res.status(500).send("Server not responding...");
};
