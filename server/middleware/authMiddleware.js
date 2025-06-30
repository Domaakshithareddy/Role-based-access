const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  let token = null;

  if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token && req.headers.authorization) {
    const [scheme, value] = req.headers.authorization.split(' ');
    if (scheme === 'Bearer' && value) token = value;
  }

  console.log('─ verifyToken ─');
  console.log('> Cookie token      :', req.cookies?.token || 'none');
  console.log('> Auth-header raw   :', req.headers.authorization || 'none');
  console.log('> Extracted token   :', token || '*** NONE ***');

  if (!token) return res.status(401).json({ message: 'No token, auth denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    console.log('> Decoded payload   :', decoded);      
    req.user = decoded;
    next();
  } catch (err) {
    console.log('> JWT error         :', err.message);
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
};
