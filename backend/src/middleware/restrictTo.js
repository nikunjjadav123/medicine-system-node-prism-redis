// middlewares/restrictTo.js
const prisma = require("../prisma");

const restrictTo = (...roles) => {
  return async(req, res, next) => {
    const user = await prisma.user.findUnique({ where: { id: req.user.id }});
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "Access denied"
      });
    }
    next();
  };
};

module.exports = restrictTo;
