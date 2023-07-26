const { verifyToken } = require('../utils/jwtUtils');
const config = process.env;

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = verifyToken(token, config.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  return next();

  // if (token == null) return res.sendStatus(401); // If there's no token, return 401 (Unauthorized)

  // verifyToken(token, process.env.JWT_SECRET, (err, user) => {
  //   console.log("called");
  //   if (err) return res.sendStatus(403); // If the token is not valid, return 403 (Forbidden)
  //   req.user = user;
  //   next(); // Next middleware
  // });
}

module.exports = authenticateToken;
