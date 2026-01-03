const jwt = require('jsonwebtoken');
const redis = require('../config/redis');
const prisma = require('../prisma');
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token required',
      });
    }
    /* Check if User or Admin Logout or not Start */
    const blocked = await redis.get(`bl_token:${token}`);

    if (blocked) {
      return res.status(401).json({ message: 'Logged out' });
    }
    /* Check if User or Admin Logout or not End */

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    /* Check if forced logout from all devices Start */
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (decoded.tokenVersion !== user.tokenVersion) {
      return res.status(401).json({ message: "Session expired so please login again" });
    }

    /* Check if forced logout from all devices End */

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
