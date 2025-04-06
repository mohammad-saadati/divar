const express = require("express");
const dotenv = require("dotenv");
const SwaggerConfig = require("./src/config/swager.config");
const { MainRouter } = require("./src/app.routes");
const notFoundHandler = require("./src/common/exception/notfound.handler");
const allExceptionHandler = require("./src/common/exception/all-exception.handler");

dotenv.config();

async function main() {
  const app = express();
  const port = process.env.PORT || 3001;

  require("./src/config/mongoose.config");
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  SwaggerConfig(app);

  app.use(MainRouter);
  notFoundHandler(app);
  allExceptionHandler(app);

  app.listen(port, () => {
    console.log(`server: http://localhost:${port}`);
  });
}

main();
