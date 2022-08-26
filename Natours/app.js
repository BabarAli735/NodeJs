const express = require("express");
const morgan = require("morgan");
const app = express();
//1 MIDDELE_WARE
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.static(`${__dirname}/public`));

//2 METHOOD

//3 Routers
const tourRouter = require("./routes/tourRouters");
const userRouter = require("./routes/userRouters");

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/user", userRouter);
