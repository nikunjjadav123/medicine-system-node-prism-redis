// middlewares/restrictTo.js
const restrictTo = (...roles) => {
  return async(req, res, next) => {
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
