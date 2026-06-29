require("dotenv/config");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const routeNotFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const { authRouter } = require("./routes/auth.route");
const { productRouter } = require("./routes/products.route");
const morgan = require("morgan");

const app = express();

const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(morgan("dev"));

//security middleware
app.use(cors());
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
);

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);

//error handling
app.use(routeNotFound);
app.use(errorHandler);

//start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}....`);
});
