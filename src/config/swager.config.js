const swagerJsDoc = require("swagger-jsdoc");
const swagerUi = require("swagger-ui-express");

const swagerDocument = swagerJsDoc({
  swaggerDefinition: {
    info: {
      title: "Divar API",
      version: "1.0.0",
      description: "Divar API",
    },
  },
  apis: [],
});

function swagerConfig(app) {
  const config = swagerUi.setup(swagerDocument, {
    explorer: true,
  });
  app.use("/api-docs", swagerUi.serve, config);
}

module.exports = swagerConfig;
