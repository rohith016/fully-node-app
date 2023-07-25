const { verifyToken } = require('../utils/jwtUtils');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // If there's no token, return 401 (Unauthorized)

  verifyToken(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // If the token is not valid, return 403 (Forbidden)
    req.user = user;
    next(); // Next middleware
  });
}

module.exports = authenticateToken;
