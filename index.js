const express = require("express");
const app = express();
const { logger } = require("./startup/logger");

require("./startup/logger");
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

// Unhandled Promise rejection test

// const P = Promise.reject(new Error("Something failed miserably"));
// P.then(() => {
//   console.log("done");
// });

const port = 3900;

app.listen(port, () => {
  logger.info(`Listening on port ${port}...`);
});

// export vidcity_jwtPrivateKey=mySecureKey
