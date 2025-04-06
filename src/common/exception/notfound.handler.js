function notFoundHandler(app) {
  app.use((req, res, next) => {
    res.status(404).json({
      status: 404,
      message: "Not Found Route",
    });
  });
}

module.exports = notFoundHandler;
