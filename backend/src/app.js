const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/route.user");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api", userRoutes);

// global error handler
app.use(errorMiddleware);

module.exports = app;
