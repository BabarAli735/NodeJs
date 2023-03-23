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
const globalErrorHandler = require("./controller/errorController");

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/user", userRouter);

app.all('*',(req,res,next)=>{
  res.status(404).json({
    status:'fail',
    message:`can't finde ${req.originalUrl} on this server !`
  })
  const err=new Error(`can't finde ${req.originalUrl} on this server !`)
  err.status='fail'
  err.statusCode=404
  next(err)
})
app.use(globalErrorHandler)

module.exports=app