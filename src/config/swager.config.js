const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

function swaggerConfig(app) {
  const swaggerDocument = swaggerJsDoc({
    swaggerDefinition: {
      openapi: "3.0.1",
      info: {
        title: "Divar API",
        version: "1.0.0",
        description: "Divar API",
      },
    },
    apis: [process.cwd() + "/src/modules/**/*.swagger.js"],
  });
  const config = swaggerUi.setup(swaggerDocument, {
    explorer: true,
  });
  app.use("/api-docs", swaggerUi.serve, config);
}

module.exports = swaggerConfig;
