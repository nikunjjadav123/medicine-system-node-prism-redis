const rateLimit = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const redis = require("../config/redis");

const apiLimited = rateLimit({
    store: new RedisStore({
        sendCommand: (...args) => redis.sendCommand(args),
    }),
    windowMs: 15*60*1000,
    max:5,
    message: "Too many requests, try again later",
});

module.exports = apiLimited;
