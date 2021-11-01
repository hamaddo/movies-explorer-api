const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/appConfig');
const Unauthorized = require('../errors/Unauthorized');
const { unauthorizedUser } = require('../errors/errorsMessages');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    return next(new Unauthorized(unauthorizedUser));
  }

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new Unauthorized(unauthorizedUser));
  }

  req.user = payload;

  return next();
};
