function errorHandler(err, req, res, next) {
 
  const errorMessage = err.message || 'Internal Server Error';
  const statusCode = err.status || 500;

  res.status(statusCode).json({ status: 'failure', error: errorMessage });
}

module.exports = errorHandler;
 