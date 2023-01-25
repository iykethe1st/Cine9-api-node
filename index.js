const config = require("config");
const express = require("express");
const app = express();
const { log } = require("./middleware/logger");

const Joi = require("Joi");
Joi.objectId = require("joi-objectid")(Joi);
log();
require("./startup/routes")(app);
require("./startup/db")();

// Unhandled Promise rejection test

// const P = Promise.reject(new Error("Something failed miserably"));
// P.then(() => {
//   console.log("done");
// });

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

const port = 3900;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

// export vidcity_jwtPrivateKey=mySecureKey
