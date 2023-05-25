const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalURL}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.status.Code === 200 ? 500 : res.status.Code;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
