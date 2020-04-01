function errorHandler(err, req, res, next) {
  if (!err) {
    return next();
  }
  res.status(500).send({ error: 'Internal server error' });
}

module.exports = {
  errorHandler
};
