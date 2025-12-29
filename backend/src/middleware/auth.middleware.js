const jwt = require('jsonwebtoken');
const redis = require('../config/redis');
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token required',
      });
    }
    const blocked = await redis.get(`bl_token:${token}`);

    if (blocked) {
      return res.status(401).json({ message: 'Logged out' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = auth;
