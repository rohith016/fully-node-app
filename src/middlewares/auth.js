const { verifyToken } = require('../utils/jwtUtils');
const { errorResponse } = require('../utils/response');
const HTTP = require('../config/httpCodes');
const config = process.env;

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(HTTP.STATUS_FORBIDDEN).json(errorResponse('A token is required for authentication', null, HTTP.STATUS_FORBIDDEN));
  }

  try {
    const decoded = verifyToken(token, config.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(HTTP.STATUS_UNAUTHORIZED).json(errorResponse('Invalid Token', null, HTTP.STATUS_UNAUTHORIZED));
  }

  return next();

}

module.exports = authenticateToken;
