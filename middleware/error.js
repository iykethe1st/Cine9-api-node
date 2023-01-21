const winston = require("winston");
require("winston-mongodb");

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: "logfile.log" }),
    new winston.transports.MongoDB({
      db: "mongodb://localhost/vidcity",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

winston.exceptions.handle(
  new winston.transports.File({ filename: "uncaughtExceptions.log" })
);

process.on("uncaughtException", (ex) => {
  console.log("An uncaught exception occured!");
  logger.error(ex);
});

module.exports = function (err, req, res, next) {
  logger.error(err.message);
  res.status(500).send("Server not responding...");
};
