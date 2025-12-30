const rateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis").default;
const redis = require("../config/redis");

const createLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redis.sendCommand(args),
  }),
  windowMs: 15 * 60 * 1000,
  max: 5,
});

const deleteLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redis.sendCommand(args),
  }),
  windowMs: 5 * 60 * 1000,
  max: 2,
});

const readLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redis.sendCommand(args),
  }),
  windowMs: 15 * 60 * 1000,
  max: 50,
});

const updateLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redis.sendCommand(args),
  }),
  windowMs: 15 * 60 * 1000,
  max: 10,
});

module.exports = {
  createLimiter,
  deleteLimiter,
  readLimiter,
  updateLimiter
};
